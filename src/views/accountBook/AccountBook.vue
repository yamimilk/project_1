<script setup>
import { reactive } from 'vue';
import Chart from '../../components/Chart.vue';
import { useAccountBook } from '../../stores/AccountBookStore';

const store = useAccountBook()

const form = reactive({
    type:'',
    amount:0,
    note:''
})

const handleAdd = () => {
    if(!form.type || form.amount <= 0) return
    store.addRecord({ ...form })
    form.type = ''
    form.amount = 0
    form.note = ''
}

const deleteRecord = (index) =>{
    store.deleteRecord(index)
}

const records = store.records

</script>

<template>
    <div>
        <h2>ACCOUNT BOOK</h2>

        <el-form :model="form" inline @submit.prevent="handleAdd">
            <el-form-item label="type">
                <el-select v-model="form.type" placeholder="select" size="large" style="width: 150px;">
                    <el-option label="income" value="income"/>
                    <el-option label="expense" value="expense"/>
                </el-select>
            </el-form-item>

            <el-form-item label="amount">
                <el-input-number v-model="form.amount" :min="0"/>
            </el-form-item>

            <el-form-item label="remark">
                <el-input v-model="form.note"/>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleAdd">add records</el-button>
            </el-form-item>
        </el-form>
        <el-divider/>

        <el-table :data="records" style="width: 100%;">
            <el-table-column prop="type" label="type"/>
            <el-table-column prop="amount" label="amount"/>
            <el-table-column prop="note" label="note"/>
            <el-table-column
            label="option"
            width="80"
            fixed="right"
            align="center"
            >
            <template #default="{$index}">
                <el-button type="danger" size="small" @click="deleteRecord($index)">delete</el-button>
            </template>
            </el-table-column>
        </el-table>

        <el-divider/>
        <div>
            <p>incomeTotal:{{ store.incomeTotal }}</p>
            <p>expenseTotal:{{ store.expenseTotal }}</p>
        </div>
    </div>
    <!-- <Chart/> -->
</template>