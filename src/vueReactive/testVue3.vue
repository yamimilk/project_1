<script setup>
import { reactive, effect, ref, computed,toRef,toRefs,watch,watchEffect,readonly,customeRef } from './train.js'

// const state = reactive({count:1,name:'vue'});
// const stateRefs = toRefs(state);
// const num = ref(2);
// const count = ref(0);
// const double = computed(() => {
//   console.log('computed re-run');
//   return num.value * 2;
// });

// effect(() => {
//   console.log('effect: double is', double.value);
// });

// effect(()=>{
//     console.log('count is',stateRefs.count.value);
    
// })

// watch(() =>state.count,(newVal,oldVal) =>{
//     console.log('watch',oldVal,'->',newVal);
    
// },{immediate:true})

// watchEffect(()=>{
// console.log('count change:',count.value);

// })

// setTimeout(() => {
// //   num.value++;
// state.count++;
// }, 1000);


// const original = reactive({ msg: 'hello' });
// const readonlyState = readonly(original);

// // 试图修改只读对象
// setTimeout(() => {
//   readonlyState.msg = 'changed'; // 应该触发 warning
// }, 1000);

// // 响应式读取，依然可用
// effect(() => {
//   console.log('readonly msg:', readonlyState.msg);
// });


const debounced = customeRef((track,trigger) =>{
    let value='';
    let timeout;
    return {
        get(){
            track();
            return value;
        },
        set(newVal){
            clearTimeout(timeout);
            timeout = setTimeout(() =>{
                value = newVal;
                trigger();
            },500);
        }
    }
});

effect(() =>{
    console.log(debounced.value);
})

let index = 0;
const values = ['a','ab','abc','abcd'];
const interval = setInterval(() =>{
    if(index >= values.length){
        clearInterval(interval);
        return;
    }
    debounced.value = values[index++];
},200)


</script>

<template>
  <h1>打开控制台看输出</h1>
</template>
