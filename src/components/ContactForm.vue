<template>
    <form @submit.prevent="submit">
        <input v-model="name">
        <button type="submit">submit</button>
    </form>
</template>

<script>
import { ref,defineProps } from 'vue';

const props = defineProps(['notificationRef'])
const name = ref('')

const submit =() =>{
    if(!name.value.trim()){
        props.notificationRef.show('can not null')
        return;
    }
    name.value =''
}
</script>