<template>
    <div ref="ChartContainer" style="height: 200px;"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted,ref } from 'vue'

const ChartContainer = ref(null)

onMounted(() => {
    const chart = echarts.init(ChartContainer.value)

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
            data:['January','February','March','May','June','July']
        },
        yAxis: {
            type:'value',
        },
        series:[
            {
                name:'income',
                type:'line',
                data:[1500,2000,1800,2300,2100,2500,3000],
            },
            {
                name:'expense',
                type:'line',
                data:[1000,1500,1300,1400,1200,1600,1900],
            }
        ]
    }
    chart.setOption(option)
})
</script>