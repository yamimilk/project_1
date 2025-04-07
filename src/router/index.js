import {createRouter, createWebHistory} from 'vue-router';

import ShoppingCart from '../views/ShoppingCart.vue';
import MessageList from '../components/MessageList.vue';
import LoadingSpinnerDemo from '../views/demo/LoadingSpinnerDemo.vue';
import LazyImageDemo from '../views/demo/LazyImageDemo.vue';
import ChatWindow from '../components/ChatWindow.vue';
import AppLayout from '../components/AppLayout.vue';

const routes = [
    {
        path:'/',
        component:AppLayout,
        children:[
            {path:'chat',component:ChatWindow},
            {path:'shopping',component:ShoppingCart},
            {path:'lazyImage',component:LazyImageDemo},
            {path:'loadingSpinner',component:LoadingSpinnerDemo},
            {path:'message',component:MessageList}
        ]
    }
];

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;