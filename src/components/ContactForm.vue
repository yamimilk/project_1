<template>
    <form @submit.prevent="handleSubmit">
        <label for="name">name:</label>
        <input v-model="name" placeholder="edit name"/>
        <button type="submit">submit</button>
    </form>
</template>

<script setup>
import { ref} from 'vue';
import { inject,watchEffect } from 'vue';
import NotificationContainer from './NotificationContainer.vue';
const notifier = inject('notifier')

const name = ref('')

watchEffect(() => {
  console.log('Injected notifier:', notifier);
});

const handleSubmit = async() =>{
   try {
        if(name){
            console.log(name);           
        }
        if (notifier) {
      notifier.addNotification({
        message: 'Success',
        type: 'success'
      });
    } else {
      console.error('Notifier is not available');
    }
   } catch(error) {
    notifier.value?.addNotification({
        message:`error:${error.message}`,
        type:'error',
        duration:5000
    })
   }
}

</script>