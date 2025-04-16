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
7. vue3中的响应式系统相关概念   
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

        toRef(obj,key):包裹对象的某个属性（key）为ref，从而可以独立传递  
        toRefs(obj)：将响应式对象的所有属性变为ref，方便结构赋值时保持响应式

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

        watch函数相关概念：参数source:观察的数据来源，可以是一个ref，一个getter函数，eg.()=>state.count,一个reactive对象  
                              cb：当source的值发生变化时要执行的回调函数，接受两个参数：newValue  和  oldValue  
                              options:可选的配置对象，支持immediate，控制是否在第一次watch时立即执行cb
                        watch函数监控时若拿到的参数既不是ref，也不是函数而是一个对象，那就默认想watch整个对象，这时用traverse来递归访问对象的每一个属性，  
                        从而建立依赖追踪。用 seen Set 防止循环引用（避免无限递归）  
                        immediate 是 Vue 中 watch 的一个选项，意思是：  
                        如果设为 true，就在监听器绑定之后立即执行一次 cb 回调，默认是 false，这时会先执行一次 getter() 得到 oldValue，不调用回调 

        customeRef:核心作用是 让你自定义 ref 的响应式行为(.value 的 获取（get）和设置（set）时的行为)。这在一些特殊需求下特别有用  
        比如：实现防抖输入框、节流、缓存、异步控制等。
        防抖（debounce）：延迟一段时间再触发，如果中途又发生变化，就重新计时  
        常用于搜索框输入，只有用户停下来一段时间后才执行操作  

```
```
8. 虚拟DOM的diff算法:  
        
        虚拟 DOM 的 diff 算法（差异算法）是用于比较新旧两棵虚拟 DOM 树的核心算法，目的是找出两棵树之间的最小差异，然后将这些差异高效地更新到真实 DOM 上。这个过程称为 patching。  

        props:属性对象  
        Array.isArray()：这是 JavaScript 提供的一个内置方法，用来判断一个变量是不是数组  
        key:key 是每个节点在列表中的唯一标识，用来帮助虚拟 DOM 更快、更准确地找到对应的节点，避免不必要的重绘和重建











