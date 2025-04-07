<template>
<h2>loading spinner</h2>
      <div v-if="loading">
            <LoadingSpinner :type="animationType" :showText="true" />
        </div>
        <div v-else>
            <span>nothing</span>
        </div>
<button @click="setAnimation('circle')">circle</button>
<button @click="setAnimation('dots')">dot</button>
<button @click="setAnimation('text')">text</button>
</template>

<script setup>
import { ref } from 'vue'
import LoadingSpinner from '../../components/LoadingSpinner.vue'

const loading = ref(true)
const animationType = ref('circle')

const setAnimation = (type) =>{    
   animationType.value = type
   loading.value = true
//    setTimeout(() => {
//     loading.value = false
//    },2000)
}

</script>
