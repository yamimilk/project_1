<template>
  <h2>commoditis List</h2>
  <div class="model">
    <div class="commoditis">
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>price</th>
            <th>stock</th>
            <th>add</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <button @click="increase(product)" :disabled="product.stock === 0 || product.stock < 0">+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="cart">
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
          <tr v-for="(item, index) in cart" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.number }}</td>
            <td>
              <button @click="increaseCart(item)" :disabled="item.number === 0 || item.stock < 0">+</button>
            </td>
            <td>
              <button @click="decreaseCart(item)" :disabled="item.number === 0 || item.number < 0">-</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <h3 >totalPrice:{{ totalPrice }}</h3>

</template>


<script lang="js" setup>
import { computed, onMounted, reactive, ref, watch,toRef} from 'vue';
import { setItem, getItem } from '../localStorageUtils';

//shopping card data
//Todo:这里应该没有货物的数量，货物的数量应该存在在购物车里，页面展示时也不应该使用products进入循环，而应该使用购物车的数据
const products = reactive([
  { name: "apple", price: 3.5, stock: 10 },
  { name: "peach", price: 9.4, stock: 50 },
  { name: "app", price: 3.5, stock: 50 },
  { name: "banana", price: 9.4, stock: 50 },
  { name: "appl", price: 3.5, stock: 50 },
  { name: "juice", price: 9.4, stock: 50 },
  { name: "cookie", price: 3.5, stock: 50 },
  { name: "card", price: 9.4, stock: 50 },
])

const cart = reactive([]);

//read localStorage date

onMounted(() => {
  const savedCart = localStorage.getItem('cart')
  if (!savedCart) {
    localStorage.setItem('cart', JSON.stringify([{ name: 'applllly', price: 3.5, number: 2 }]));
  }else{
    try{
      const parseCart = JSON.parse(savedCart);
      cart.splice(0, cart.length, ...parseCart);
    }catch(error)
    {
      console.log('解析购物车失败',error);
      localStorage.removeItem('cart')//清理无效数据
    }
  }
})
console.log(localStorage.getItem('cart'));

const totalPrice = computed(()=>{
  return cart.reduce((sum,item) => sum + item.price*item.number,0).toFixed(2)
})


const increase = (product) => {
  if(product.stock < 0) return;
  const existingItem = cart.find((item) => item.name === product.name);
  // console.log(product.name);
  if (existingItem) {
    existingItem.number += 1;
    product.stock --;
  } else {
    cart.push({ 
      name: product.name, 
      price: product.price, 
      number: 1 });
      product.stock -= 1;
  }
}

const increaseCart = (item) => {
  const product = products.find(p=>p.name === item.name);
  if(!product) return;
  item.number ++;
  product.stock --;
}

const decreaseCart = (item) => {
  const product = products.find(p=>p.name === item.name);
  if(!product) return;
  item.number --;
  product.stock ++;

  if(item.number <= 0){
    const targetIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    if(targetIndex >= 0){
      cart.splice(targetIndex,1)
    }
  }
}

//watch the cart's change and saved it into localStorage
const cartRef = toRef(cart)
watch(cartRef,(newCart)=>{
  localStorage.setItem('cart',JSON.stringify(newCart));
},{deep:true})


</script>

<style scoped>
table {
  width: 100%;
  border-color: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #7789ac;
  text-align: left;
  background-color: #d0ecf2;
}

.model {
  display: flex;
  gap: 10px;
}
</style>