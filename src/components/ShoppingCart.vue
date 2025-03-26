<template>
  <h2>commoditis List</h2>
  <table>
    <thead>
      <tr>
        <th>name</th>
        <th>price</th>
        <th>number</th>
        <th>add</th>
        <th>minus</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in products" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.number }}</td>
        <td>
          <button @click="increase(index)" :disabled="item.stock === 0 || item.stock<0">+</button>
        </td>
        <td>
          <button @click="decrease(index)" :disabled="item.number ===0 || item.number<0">-</button>
        </td>
      </tr>
    </tbody>
  </table>
  <h3>totalPrice:{{ totalPrice }}</h3>
 
</template>


<script lang="js" setup>
import { computed, onMounted, ref,watch } from 'vue';
import { setItem,getItem } from '../localStorageUtils';

//shopping card data
const products=ref([
  {name:"apple",price:3.5,number:30,stock:10},
  {name:"peach",price:9.4,number:40,stock:50},
  {name:"app",price:3.5,number:30,stock:50},
  {name:"banana",price:9.4,number:40,stock:50},
  {name:"appl",price:3.5,number:30,stock:50},
  {name:"juice",price:9.4,number:40,stock:50},
  {name:"cookie",price:3.5,number:30,stock:50},
  {name:"card",price:9.4,number:40,stock:50},
])

//read localStorage date
const cart=ref(Array(products.value.length).fill(0));

setItem('cart',{name:"apple",price:3.5,number:30,stock:10},
  {name:"peach",price:9.4,number:40,stock:50},
  {name:"app",price:3.5,number:30,stock:50},
  {name:"banana",price:9.4,number:40,stock:50},
  {name:"appl",price:3.5,number:30,stock:50},   
  {name:"juice",price:9.4,number:40,stock:50},
  {name:"cookie",price:3.5,number:30,stock:50},
  {name:"card",price:9.4,number:40,stock:50},)

//组件挂载到页面上时执行。
onMounted(()=>{
  const savedCart=JSON.parse(localStorage.getItem('cart')) || Array(products.value.length).fill(0);
  cart.value = savedCart;
})
// console.log(localStorage.getItem('cart'));


//count gross price
const totalPrice=computed(()=>{
  return products.value.reduce((sum,item)=> sum+item.price*item.number,0)
})


const increase = (index)=>{
  if(products.value[index].stock>0){
    products.value[index].number ++;
    products.value[index].stock --;
  }
// console.log(products.value[index].number);
// console.log(products.value[index].stock);
}

const decrease=(index)=>{
  if(products.value[index].number >0){
    products.value[index].number --;
    products.value[index].stock ++;
  }
}
const newCart = getItem('cart')
console.log(newCart);

//watch the cart's change and saved it into localStorage
watch(cart.value,(newValue)=>{
  console.log( 1);
  localStorage.setItem('cart',JSON.stringify(newCart));
},{deep:true})



</script>

<style scoped>
table {
  width: 100%;
  border-color: collapse;
}

th,td{
  padding: 10px;
  border: 1px solid #7789ac;
  text-align: left;
}

th,td {
  background-color: #d0ecf2;
}

</style>