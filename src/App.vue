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
     <contactForm :notificationRef="notificationRef"/>
     <Notification ref="notificationRef"/>
  </div>

</template>

<script setup>
import {ref} from 'vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import ShoppingCart from './components/ShoppingCart.vue'
import ContactForm from './components/ContactForm.vue'
import Notification from './components/Notification.vue';

const notificationRef = ref(null)

//animation component
// const loading = ref(true)
// setTimeout(()=>{
//   loading.value = false
// },2000)


</script>

<style scoped>

</style>
