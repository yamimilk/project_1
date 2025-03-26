<template>
  <h2>commoditis List</h2>
  <ul>
    <li v-for="(item,index) in products" :key="index">
      <span>{{ item.name }} -${{ item.price }} -stock{{ item.stock }}</span>
      <button @click="increase">increase</button>
    </li>
  </ul>
</template>


<script lang="js" setup>
import { computed, onMounted, ref } from 'vue';



//shopping card data
const products=ref([
  {name:apple,price:3.5,stock:30},
  {name:peach,price:9.4,stock:40},
  {name:apple,price:3.5,stock:30},
  {name:banana,price:9.4,stock:40},
  {name:apple,price:3.5,stock:30},
  {name:juice,price:9.4,stock:40},
  {name:cookie,price:3.5,stock:30},
  {name:card,price:9.4,stock:40},
])

//read localStorage date
const cart=ref();

//组件挂载到页面上时执行。
onMounted(()=>{
  const savedCart=JSON.parse(localStorage.getItem('cart')) || Array(products.value.length).fill(0);
  cart.value = savedCart;
})

//count gross price
const totalPrice=computed(()=>{
  return products.value.reduce((sum,item,index)=>sum+item.price * cart.value[index],0)
})

const increase = (index)=>{
    if(cart.value[index] > 0){
      cart.value[index]++;
    }
}

</script>

<style scoped>

</style>