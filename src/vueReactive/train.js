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

  // Debug 输出（可选）
  console.log(`[track] ${key} collected by`, activeEffect.name || 'effectFn');
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

export { effect, reactive, ref, computed };
