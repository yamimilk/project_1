<script setup>
import { reactive, effect, ref, computed } from './train.js'

const num = ref(2);
const double = computed(() => {
  console.log('computed re-run');
  return num.value * 2;
});

effect(() => {
  console.log('effect: double is', double.value);
});

setTimeout(() => {
  num.value++;
}, 1000);
</script>

<template>
  <h1>打开控制台看输出</h1>
</template>
