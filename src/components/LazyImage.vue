<script setup>
import { ref,onMounted,onBeforeUnmount } from 'vue';

//传入的Props
const props = defineProps({
    src:{type:String,required:true},
    placeholder:{
        type:String,
        default: 'https://via.placeholder.com/300x200?text=Loading...'
    },
    alt:{
        type:String,
        default:''
    }
})

const imgRef = ref(null)
const imageSrc = ref(props.placeholder)

let observer = null

onMounted(()=>{
  let observer = new IntersectionObserver(([entry]) => {
    console.log(observer);
    
        if(entry.isIntersecting){
            imageSrc.value = props.src
            observer.unobserve(entry.target)
        }
    })

    if(imgRef.value){
        observer.observe(imgRef.value)
    }
})

onBeforeUnmount(()=>{
    if(observer && imgRef.value){
        observer.unobserve(imgRef.value)
    }
})

const isLoaded = ref(false)

const handleLoad = () =>{
    isLoaded.value = true
}
</script>

<template>
  <div class="image-wrapper">
    <div v-if="!isLoaded" class="skeleton"></div>
    <img
       ref="imgRef"
       :src="imageSrc"
       :alt="alt"
       class="lazy-image"
       :class="{loaded: isLoaded}"
       @load="handleLoad"
    />  
  </div>
</template>

<style scoped>
.image-wrapper {
    position: relative;
    width: 100%;
}

.skeleton {
    width: 100%;
    padding-top: 66.66%;
    background: linear-gradient(
        -90deg,
        #eee 0%,
        #ddd 50%,
        #eee 100%
    );
    background-size: 200% 100%;
    animation: loading 1.2s infinite;
    position: absolute;
    top: 0;
    left: 0;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

.lazy-image {
  width: 100%;
  display: block;
  object-fit: cover;
  margin-bottom: 16px;
  opacity: 0;
  transition: opacity 2s ease-in-out;
}

.lazy-image.loaded {
    opacity: 1;
}
</style>