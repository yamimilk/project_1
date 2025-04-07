<script lang="js" setup>
import { ref } from 'vue';

const currentStep = ref(0);

const steps = [
    {title:'writeInfo',desc:'write your info'},
    {title:'confirm',desc:'confirm order'},
    {title:'finish',desc:'finish payment'}
]

const nextStep =() =>{
    if(currentStep.value <steps.length-1){
        currentStep.value++;
    }
}

const prevStep = () =>{
    if(currentStep.value > 0) {
        currentStep.value--;
    }
}
</script>

<template>
    <div style="padding: 20px;">
        <el-steps :active="currentStep" align-center finish-status="success">
            <el-step title="wirteInfo" description="writeInfo"/>
            <el-step title="confirm" description="confirm order"/>
            <el-step title="finish" description="finish payment"/>
        </el-steps>

        <div style="margin-top: 30px; text-align: center;">
            <el-button @click="prevStep" :disabled="currentStep === 0">last</el-button>
            <el-button @click="nextStep" :disabled="currentStep === steps.length-1" type="primary">next</el-button>
        </div>
    </div>
</template>