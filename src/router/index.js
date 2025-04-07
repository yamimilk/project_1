import {createRouter, createWebHistory} from 'vue-router';

import ShoppingCart from '../views/ShoppingCart.vue';
import LoadingSpinnerDemo from '../views/demo/LoadingSpinnerDemo.vue';
import LazyImageDemo from '../views/demo/LazyImageDemo.vue';
import ChatWindow from '../components/ChatWindow.vue';
import AppLayout from '../components/AppLayout.vue';
import NoticeDemo from '../views/demo/NoticeDemo.vue';
import TagInput from '../components/TagInput.vue';
import StepComponent from '../components/StepComponent.vue';

const routes = [
    {
        path:'/',
        component:AppLayout,
        children:[
            {path:'chat',component:ChatWindow},
            {path:'shopping',component:ShoppingCart},
            {path:'lazyImage',component:LazyImageDemo},
            {path:'loadingSpinner',component:LoadingSpinnerDemo},
            {path:'notice',component:NoticeDemo},
            {path:'tagInput',component:TagInput},
            {path:'step',component:StepComponent}
        ]
    }
];

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;