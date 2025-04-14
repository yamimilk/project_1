<script setup>
import { reactive, effect,ref,computed } from './train.js'

// const state = reactive({ count: 0 });
// const count = ref(0)
// effect(()=>{
//     console.log('count changed:', count.value);
// })
// effect(() => {
//   console.log('state changed:', state.count);
// });

//setTimeout(() => {
//   state.count += 1;
//   count.value += 1;
 // num.value += 1;
//}, 1000);

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

effect(()=>{
    console.log('update',double.value);
})
</script>

<template>
  <h1>打开控制台看输出</h1>
</template>
