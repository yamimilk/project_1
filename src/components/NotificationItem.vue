<template>
  <div 
    class="notification"
    :class="[type,{ clickable}]"
    @mouseenter="pauseTimeout"
    @mouseleave="resumeTimeout"
    @click="handleClick"
    >
    <div class="content">
        <i :class="iconClass"></i>
        <span>{{ message }}</span>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount } from 'vue';

// 定义组件属性
const props = defineProps({
    id:Number,
    message:String,
    type:{
        type:String,
        default:'info',
        validator:(value) =>['info','success','warning','error'].includes(value)
    },
    duration:Number,
    closeButton:Boolean,
    onClick:Function,
    clickable:Boolean
})

    const emit = defineEmits(['close'])

    //定时器管理
    let timeoutId = null
    let remainingTime = props.duration
    let startTime = null

    //图标映射表
    const icons = {
        info:'fas fa-info-circle',
        success:'fas fa-check-circle',
        warning:'fas fa-exclamation-triangle',
        error:'fas fa-times-circle'
    }

    const iconClass = icons[props.type]

    //启动倒计时
    const startTimeout = () =>{
        timeoutId = setTimeout(()=>{
            close()
        },remainingTime)
    }

    //暂停倒计时（鼠标悬停）
    const pauseTimeout =() =>{
        clearTimeout(timeoutId)
        remainingTime -= Date.now() -startTime
    }

    //恢复倒计时（鼠标离开）
    const resumeTimeout = () =>{
        startTime = Date.now()
        startTimeout()
    }

    //关闭通知
    const close = () =>{
        emit('close',props.id)
    }

    //点击处理
    const handleClick = () =>{
        if(props.onClick){
            props.onClick()
        }
        if(props.clickable){
            close()
        }
    }

    //生命周期管理
    onMounted(()=>{
        if(props.duration > 0){
            startTime = Date.now()
            startTimeout()
        }
       
    })

    onBeforeUnmount(() =>{
        clearTimeout(timeoutId)
    })
</script>

<style scoped>
/* 基础通知样式 */
.notification {
  position: relative;
  min-width: 250px;
  padding: 16px 24px;
  border-radius: 6px;
  background: white;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  opacity: 0.95;
}

/* 悬停效果 */
.notification:hover {
  opacity: 1;
  transform: translateY(-2px);
}

/* 类型配色 */
.info { background: #2196f3; }
.success { background: #4caf50; }
.warning { background: #ff9800; }
.error { background: #f44336; }

</style>