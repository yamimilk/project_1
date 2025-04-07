<template>
    <div class="loader">
      
        <!-- <h2>this is a test</h2> -->
        <!-- 旋转圆圈 -->
        <div v-if="type === 'circle'" class="circle"
            :style="{ borderTopColor: color, width: size + 'px', height: size + 'px' }"></div>

        <div v-if="type === 'dots'" class="dots">
            <div v-for="i in 3" :key="i" class="dot"
                :style="{ background: color, width: size / 5 + 'px', height: size / 5 + 'px' }"></div>
        </div>
        <div v-if="type === 'text'" class="text"
             :style="{color}">{{ text }}</div>
    </div>
</template>


<script lang="js" setup>


defineProps({
    type: {
        type: String,
        default: 'circle'
    },
    size: {
        type: Number,
        default: 40
    },
    color: {
        type: String,
        default: '#42b883'
    },
    showText: Boolean,
    text: {
        type: String,
        default: 'loading...'
    }
})


</script>

<style scoped>
.loader {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
}

/* 旋转动画 */
.circle {
    width: 50px;
    height: 50px;
    border: 3px solid #eee;
    /* border-top-color:v-bind(color) ; */
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.dots {
    display: flex;
    gap: 6px;
}

.dot {
    width: 20%;
    height: 20%;
    border-radius: 50%;
    animation: bounce 0.6s infinite alternate;
}

@keyframes bounce {
    to {
        transform: translateY(-10px);
    }
}

.dot:nth-child(2) {
    animation-delay: 0.2s;
}

.dot:nth-child(3) {
    animation-delay: 0.4s;
}


.text {
    margin-top: 8px;
}
</style>