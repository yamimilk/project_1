<template>
    <Teleport to="body">
        <div class="notifications">
            <div
               v-for="(msg,index) in message"
               :key="msg.id"
               :class="['msg',msg.type]"
               >
                <span>{{ msg.content }}</span>
                <button @click="remove(index)">close</button>
            </div>
        </div>
    </Teleport>
</template>


<script setup>
    import { ref } from 'vue';

    const message = ref([]);

    //add message
    const show = (content,type = 'info',timeout = 3000) =>{
        const id = Data.now();
        message.value.push({id,content,type})

        //remove auto
        if(timeout > 0){
            setTimeout(()=>{
                message.value = message.value.filter(m => m.id !== id)
            },timeout)
        }
    }
    //rmeove by hand
    const remove = (index) =>{
        message.value.splice(index,1);
    }

    defineExpose({show})
</script>

<style scoped>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
}

.msg {
    padding: 12px 20px;
    margin-bottom: 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    animation: slideIn 0.3s ease-out;

}

.msg.success {
    background: #f0fff4;
    border: 1px solid #fc8181;
}

.msg.error {
    background: #fff5f5;
    border: 1px solid #fc8181;
}

@keyframes slideIn {
    from { transform: translateX(100%);}
    to {transform: translateX(0);}
}
</style>
