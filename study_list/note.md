# Study note
1. 插件的意义：  
    1.全局注册：在任何组件中都能访问插件对应组件的功能     
    2.挂载管理：确保组件容器正确挂载到DOM   
    3.方法暴露：提供统一的API调用方法（eg.notify.show()）
2. 异步懒加载组件：defineAsyncComponent