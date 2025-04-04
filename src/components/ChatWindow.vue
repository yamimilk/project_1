<template>
    <div class="chat-window">
        <AsyncMessageList :messages="messages"/>
        <div class="input-box">
            <input v-model="newMessage" placeholder="send message" @keyup.enter="sendMessage"/>
            <button @click="sendMessage">send</button>
            <button @click="removeChat">remove</button>
        </div>
    </div>
</template>

<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';
import LoadingSpinner from './LoadingSpinner.vue';

    const messages =ref([])
    const newMessage = ref('')
    const loading = ref(true)
    const AsyncMessageList = defineAsyncComponent({
        // loader:() => import('./MessageList.vue'),
        //延长加载时间测试懒加载已实现
        loader:() => new Promise((resolve) => {
            setTimeout(() => {
            resolve(import('./MessageList.vue'))
        }, 1000);
        }),
        loadingComponent: LoadingSpinner,
        delay:0
    })

    onMounted(()=>{
        const savedChat = localStorage.getItem('message');
        if(!savedChat){
            localStorage.setItem('message',JSON.stringify([{id:1,user:'you',text:'shfqiuf'}]))
        }else{
            try{
                const parseChat = JSON.parse(savedChat);
                messages.value.splice(0,messages.length,...parseChat);
            }catch(error){
                console.log('parse element is error',error);
                localStorage.removeItem('message')
            }
        }
    })

    console.log(localStorage.getItem('message'));
    
    const sendMessage = () => {
        if(newMessage.value.trim()){
            messages.value.push({
                id:messages.value.length + 1,
                user:'you',
                text:newMessage.value
            });
            newMessage.value='';
            localStorage.setItem('message',JSON.stringify(messages.value))
        }
    }

    const removeChat =()=>{
        localStorage.removeItem('message')
        messages.value='';
    }
</script>

<style scoped>
.chat-window {
    width: 300px;
    border: 1px solid #80adcd;
    padding: 10px;
}

.input-box {
    display: flex;
    gap: 5px;
    margin-top: 10px;
}

input {
    flex: 1;
    padding: 5px;
}

button {
    padding: 5px 10px;
}
</style>
