<template>
    <div class="message-list">
        <div v-for="message in messages" :key="message.id" class="message-item">
            <span class="text">{{ message.text }}</span>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        messages:Array
    })
</script>

<style scoped>
.message-list {
    max-height: 300px;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid #a8cee8;
}

.message-item {
    padding: 5px ;
    border-bottom: 1px solid #41789c;
}
</style>