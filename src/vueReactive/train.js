let activeEffect = null;
const targetMap = new WeakMap();

function effect(fn, options = {}) {
    const effectFn = () => {
        activeEffect = effectFn;
        const res = fn();
        activeEffect = null;
        return res;
    };
    effectFn.scheduler = options.scheduler;
    effectFn.options = options;
    if (!options.lazy) {
        effectFn();
    }
    return effectFn;
}

function reactive(target) {
    return new Proxy(target, {
        get(obj, key) {
            track(obj, key);
            const res = Reflect.get(obj, key);
            return isRef(res) ? res.value : res;
        },
        set(obj, key, value) {
            const result = Reflect.set(obj, key, value);
            trigger(obj, key);
            return result;
        }
    });
}

function track(target, key) {
    if (!activeEffect) return;

    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }

    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Set();
        depsMap.set(key, dep);
    }
    dep.add(activeEffect);
}

function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;

    const dep = depsMap.get(key);
    if (dep) {
        console.log(`[trigger] ${key} triggered`);
        dep.forEach(effectFn => {
            if (effectFn.scheduler) {
                effectFn.scheduler();
            } else {
                effectFn();
            }
        });
    }
}

function ref(initialValue) {
    const wrapper = {
        __isRef: true,
        get value() {
            track(wrapper, 'value');
            return initialValue;
        },
        set value(newVal) {
            if (newVal !== initialValue) {
                initialValue = newVal;
                trigger(wrapper, 'value');
            }
        }
    };
    return wrapper;
}

function isRef(value) {
    return value && value.__isRef === true;
}

function toRef(obj, key) {
    return {
        __isRef: true,
        get value() {
            return obj[key];
        },
        set value(newVal) {
            obj[key] = newVal
        }
    }
}

function toRefs(obj) {
    const result = {};
    for (const key in obj) {
        result[key] = toRef(obj, key);
    }
    return result;
}

function computed(getter) {
    let value;
    let dirty = true;
    const dep = new Set();

    const runner = effect(getter, {
        lazy: true,
        scheduler: () => {
            if (!dirty) {
                dirty = true;
                dep.forEach(effectFn => {
                    if (effectFn.scheduler) {
                        effectFn.scheduler();
                    } else {
                        effectFn();
                    }
                });
            }
        }
    });

    return {
        __isRef: true,
        get value() {
            if (activeEffect) {
                dep.add(activeEffect);
            }
            if (dirty) {
                value = runner();
                dirty = false;
            }
            return value;
        }
    };
}

function watch(source, cb, options = {}) {
    let getter;
    if (isRef(source)) {
        getter = () => source.value;
    } else if (typeof source === 'function') {
        getter = source;
    } else {
        getter = () => traverse(source)
    }

    let oldValue, newValue;

    const job = () => {
        newValue = effectFn();//得到新值
        cb(newValue, oldValue);//执行回调
        oldValue = newValue;//更新旧值
    };

    //effecFn用于追踪getter依赖
    const effectFn = effect(getter, {
        lazy: true,
        scheduler: () => {
            job();
        }
    });

    if (options.immediate) {
        job();
    } else {
        oldValue = effectFn();//初始化旧值
    }
}

function traverse(value, seen = new Set()) {
    if (typeof value !== 'object' || value === null || seen.has(value)) return;
    seen.add(value);
    for (const key in value) {
        traverse(value[key], seen);
    }
    return value;
}

function watchEffect(fn) {
    effect(fn); // 不加 lazy，立即执行，自动依赖收集
}

function readonly(target) {
    return new Proxy(target, {
        get(obj, key) {
            track(obj, key);
            const res = Reflect.get(obj, key);
            return isRef(res) ? res.value : res;
        },
        set(obj, key, value) {
            console.warn(`Set operation on key "${key}" failed:target is readonly.`);
            return true;
        }
    })
}

function customeRef(factory) {
    let value;
    const dep = new Set();

    const track = () => {
        if (activeEffect) {
            dep.add(activeEffect);
        }
    };

    const trigger = () => {
        dep.forEach(effectFn => {
            if (effectFn.scheduler) {
                effectFn.scheduler();
            } else {
                effectFn();
            }
        });
    };
    const { get, set } = factory(track, trigger);

    return {
        __isRef: true,
        get value() {
            return get();
        },
        set value(newVal) {
            set(newVal);
        }
    }
}

export { effect, reactive, ref, computed, toRef, toRefs, watch, watchEffect, readonly, customeRef };
