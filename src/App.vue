<template>
  <div class="card">
    <h3>A test </h3>
    <!-- <ShoppingCart/> -->
     <!-- <div v-if="loading">
      <LoadingSpinner type="text" :showText="true"/>
     </div>
     <div v-else>
      <span>nothing</span>
     </div> -->
     <!-- <ContactForm/>
    <NotificationContainer ref="notifier" v-if="isNotifierReady"/> -->
    <!-- <ChatWindow/> -->
     <div class="image-list">
      <lazyImage
        v-for="i in 20"
        :key="i"
        :src="`https://picsum.photos/300/200?random=${i}`"
        alt="random picture"
      />
     </div>
  </div>

</template>

<script setup>
import {ref} from 'vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import ShoppingCart from './components/ShoppingCart.vue'
import ContactForm from './components/ContactForm.vue'
import NotificationContainer from './components/NotificationContainer.vue';
import MessageList from './components/MessageList.vue';
import ChatWindow from './components/ChatWindow.vue';
import LazyImage from './components/LazyImage.vue';
//消息通知组件
// import { provide } from 'vue';

// const notifier = ref(null)


// watchEffect(() => {
//   if (notifier.value) {
//     console.log('Notifier instance set:', notifier.value);
//     provide('notifier', notifier.value); // 确保 `provide` 的是 `notifier.value`
//   }
// });

//动画组件
// const loading = ref(true)
// setTimeout(()=>{
//   loading.value = false
// },2000)


</script>

<style scoped>
 .image-list {
  max-width: 320px;
  margin: 0 auto;
 }
</style>
