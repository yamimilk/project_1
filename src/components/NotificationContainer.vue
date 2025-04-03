<template>
  <Teleport to="body">
    <h2>this is a test</h2>
    <transition-group
     name="notification-list"
     tag="div"
     class="notification-container"
     :class="position"
     >
        <!-- 动态渲染所有通知项 -->
    <notification-item
     v-for="notification in notifications"
     :key="notification.id"
     v-bind="notification"
     @close="removeNotification"
    />     
    </transition-group>
  </Teleport>
</template>

<script setup>
import { ref,reactive } from 'vue';
import NotificationItem from './NotificationItem.vue'

//定义组件属性(位置配置)
const props=defineProps({
    position: {
        type:String,
        default:'top-right',
        validator:(value) => [
            'top-right','top-left',
            'bottom-right','bottom-left'
        ].includes(value)
    }
})

//响应式通知列表
const notifications=ref([]);
let idCounter = 0;

//添加通知方法
const addNotification = (notification) => {
    
    const id = ++idCounter
    notifications.value.push({
        id,
        ...notification,
        duration:notification.duration || 3000
    })
    console.log('Adding notification:', notification);
}

//移出通知
const removeNotification = (id) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
}

//暴露方法
defineExpose({addNotification,removeNotification})
</script>

<style>
.notification-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 999;
    padding: 20px;
}

.top-right {top:20px; right:20px;}
.top-left {top: 20px;left: 20px;}
.bottom-right {bottom: 20px;right: 20px;}
.bottom-left {bottom: 20px;right: 20px;}

.notification-list-enter-active,
.notification-list-leave-active {
    transition: all 0.5s ease;
}

.notification-list-enter-from,
.notification-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.notification-list-leave-active {
  position: absolute;
}
</style>