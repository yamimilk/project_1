# Study note
```
1. 插件的意义：  
    全局注册：在任何组件中都能访问插件对应组件的功能     
    挂载管理：确保组件容器正确挂载到DOM   
    方法暴露：提供统一的API调用方法（eg.notify.show()）
```

```
2. 异步懒加载组件：defineAsyncComponent
```
```
3. defineStore()   
       # Pinia #提供的核心API  
       定义全局状态管理模块（store）  
       参数是对象，主要包含三个属性  
       state：数据状态（响应式）  
       getters：派生状态（相当于计算属性） ，只读， 自动缓存，自动更新
       actions：方法/函数（操作状态），每个属性是一个方法，用来更新state或执行异步操作（fetch）。ps：箭头函数的this动态绑定，非store实例，而普通函数中的this会被pinia绑定成当前store实例。
```
```
4. 现代异步数据加载封装库/工具  
        Axios :自动处理JSON，取消请求，超时处理，支持 Promise 链式调用，也可配合 async/await。统一的请求方法：axios.get(), axios.post()
        SWR：基于fetch，React专用
        useFetch：VueUse的
```
```
5. 模板中“：”的作用：   
        动态绑定，是v-bind的缩写
```
```
6. 在项目中使用图表  
        ECharts，它是一个非常流行的图表库。   
        安装：npm install echarts  
```  
```
7. vue3中的响应式系统 
<!-- 执行过程 -->
        effect(fn) 执行时   
                ↓  
        读取 state.count   
                ↓  
        track() 收集依赖 fn   
                ↓  
        修改 state.count++  
                ↓  
        trigger() 通知 fn 再次执行 

<!-- 概念 -->
        用 Proxy 来拦截对象的读写行为：
        get()：在读取属性时调用，用于收集依赖，拦截读取
        set()：在修改属性时调用，用于触发更新，拦截操作
        Reflect.get() 和 Reflect.set() 是更安全和一致的原始操作。   
        Proxy是JS提供的内建对象，用来拦截依赖行为   

        Reflect是JS内建对象，用来更安全的访问对象属性，用Reflect是为了避免出发递归和一些边界错误  

        depsMap是一个哈希表(Map())，作用是保存每个属性的依赖集合  

        track的作用：记录当前属性被那些effect()函数依赖了  

        wrapper：包装器

        所以响应式对象的特点是：  
        能自动追踪你访问的属性（依赖收集）  
        在属性变更时，自动重新执行相关代码（触发更新） 

        依赖关系：A使用了属性B，A依赖B，A是依赖者，B是被依赖的响应式数据。数据发生变化，就要重新执行依赖者  

        收集依赖的原因：Vue不知道代码使用了哪些数据，所以在访问数据时记录下当前的effect函数是谁，然后在数据变化时能找到并重新执行这个effect函数  
        对应的核心逻辑：dep.add(activeEffect);//收集依赖  dep.forEach(fn => fn())//触发依赖更新  

        JS内建对象：这些是 JavaScript 自带的核心对象，比如：Map, Set(收集用到属性的依赖函数(effect函数)), WeakMap, Date, Promise, Proxy, Reflect 等

         依赖收集+触发图解：  

         访问属性               改变属性
          ↓                      ↓
   +----------------+     +----------------+
   |  effect(fn) 执行 |     |  state.count++ |
   +----------------+     +----------------+
          ↓                      ↓
    track(obj, key)         trigger(obj, key)
          ↓                      ↓
     depsMap.set(key,dep)   dep.forEach(fn => fn())
          ↓                      ↓
   dep.add(activeEffect)     重新执行 effect(fn)
```









