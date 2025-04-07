<script lang="js" setup>
import {ref,computed} from 'vue';

const allOptions = ref([
    'alice@111.com',
    'ccccc@sjdf.com',
    'dfwfh@sjfos.com'
])

const inputTags = ref([])

const filteredOptions = computed(()=>
    allOptions.value.filter(
        (item) => !inputTags.value.includes(item)
    )
)

const handleChange = (val) =>{
    //自动去重
    inputTags.value = [...new Set(val)]
}
</script>

<template>
    <div>
        <el-select
           v-model="inputTags"
           multiple
           filterable
           allow-create
           default-first-option
           :reserve-keyword="false"
           placeholder="please input the receivent"
           style="width: 100%;"
           @change="handleChange"
        >
        <el-option
           v-for="item in filteredOptions"
           :key="item"
           :lable="item"
           :value="item"/>
        </el-select>
    </div>
</template>