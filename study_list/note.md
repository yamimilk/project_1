# Study note
1. 插件的意义：  
    全局注册：在任何组件中都能访问插件对应组件的功能     
    挂载管理：确保组件容器正确挂载到DOM   
    方法暴露：提供统一的API调用方法（eg.notify.show()）
2. 异步懒加载组件：defineAsyncComponent
3. defineStore()   
       # Pinia #提供的核心API  
       定义全局状态管理模块（store）  
       参数是对象，主要包含三个属性  
       state：数据状态（响应式）  
       getters：派生状态（相当于计算属性） ，只读， 自动缓存，自动更新
       actions：方法/函数（操作状态），每个属性是一个方法，用来更新state或执行异步操作（fetch）。ps：箭头函数的this动态绑定，非store实例，而普通函数中的this会被pinia绑定成当前store实例。
4. 现代异步数据加载封装库/工具  
        Axios :自动处理JSON，取消请求，超时处理
        SWR：基于fetch，React专用
        useFetch：VueUse的
5. 模板中“：”的作用：   
        动态绑定，是v-bind的缩写
6. 在项目中使用图表  
        ECharts，它是一个非常流行的图表库。   
        安装：npm install echarts


