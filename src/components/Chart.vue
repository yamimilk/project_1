<template>
    <div ref="ChartContainer" style="height: 200px;"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted,ref,watch } from 'vue'

//Props
const props = defineProps({
    incomeData:{
        type:Array,
        required:true
    },
    expenseData:{
        type:Array,
        required:true
    },
    months:{
        type:Array,
        default:()=>['Jan','Feb','Mar','Apr','May','Jun']
    }
})

const ChartContainer = ref(null)
let chartInstance = null

const renderChart = () =>{
    if(!chartInstance) {
        chartInstance = echarts.init(ChartContainer.value)
    }

    const option = {
        title: {
            text:'income and expense',
            left:'center'
        },
        tooltip:{},
        legend: {
            data:['income','expense'],
            top:'10%'
        },
        xAxis: {
            data:props.months
        },
        yAxis: {
            type:'value',
        },
        series:[
            {
                name:'income',
                type:'line',
                data:props.incomeData
            },
            {
                name:'expense',
                type:'line',
                data:props.expenseData
            }
        ]
    }
    chartInstance.setOption(option)
}

onMounted(renderChart)

watch(()=>[props.incomeData,props.expenseData],renderChart,{deep:true})
</script>