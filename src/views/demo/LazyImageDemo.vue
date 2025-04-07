<template>
    <div class="image-list">
      <LazyImage
        v-for="i in 20"
        :key="i"
        :src="`https://picsum.photos/300/200?random=${i}`"
        alt="random picture"
      />
     </div>
</template>

<script setup>
import LazyImage from '../../components/LazyImage.vue';
</script>

