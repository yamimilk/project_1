let activeEffect = null;
const targetMap = new WeakMap();//用来存所有的响应式对象和依赖关系

//实现effect（fn）和reactive(obj)雏形
function effect(fn,options={}) {
   const effectFn = ()=>{
    activeEffect = effectFn;
    const res = fn();
    activeEffect = null;
    return res;
   }
     // 保存调度器
  effectFn.scheduler = options.scheduler;

  if (!options.lazy) {
    effectFn(); // 立即执行
  }
   return effectFn;//返回runner
}

function reactive(target) {
    return new Proxy(target, {
        get(obj, key) {
            track(obj, key);//依赖收集
            // console.log('GET', obj, key);
            const res =  Reflect.get(obj, key);
            return isRef(res) ? res.value:res;
        },
        set(obj, key, value) {
            const result = Reflect.set(obj, key, value);
            trigger(obj, key);//触发更新
            return result;
        }
    });
}


function track(target, key) {
    if (!activeEffect) return

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
//dep是一个 Set，用来装“依赖这个属性的所有 effect 函数”，add是Set的方法
    dep.add(activeEffect);//收集副作用函数
}

function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;

    const dep = depsMap.get(key);
    if (dep) {
        dep.forEach(fn => fn());
    }
}


//实现ref
function ref(initialValue) {
    const wrapper = {
      __isRef: true,
      get value() {
        track(wrapper, 'value');
        return initialValue;
      },
      set value(newVal) {
        initialValue = newVal;
        trigger(wrapper, 'value');
      }
    };
    return wrapper;
  }

function isRef(value){
    return value && value.__isRef === true;
}

function computed(getter){
    let value;
    let dirty = true;//标记是否需要重新计算

    //创建一个ref包裹结果值
    const result = {
        __isRef:true,
        get value() {
            if (dirty) {
              value = runner();
              dirty = false;
            }
            track(result,'value');
            return value;
    }
};

    //创建一个effect，用来自动追踪getter 的依赖
    const runner = effect(getter, {
        lazy: true,
        scheduler: () => {
            if(!dirty){
                dirty = true;
                trigger(result,'value');//通知依赖数据(computed.value)的effect更新
            }
        }
      });
    
      return result;
}


export { effect, reactive,ref,computed }