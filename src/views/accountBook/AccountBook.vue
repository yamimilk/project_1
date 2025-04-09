<script setup>
import { computed, reactive,ref} from 'vue';
import Chart from '../../components/Chart.vue';
import { useAccountBook } from '../../stores/AccountBookStore';

const store = useAccountBook()


const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

//初始化每月为0
const incomeData = computed(() =>{
    const result = Array(months.length).fill(0)
    const records = store.records || []
    records.forEach(record => {
        const monthIndex = new Date(record.data || Date.now()).getMonth()
        if(record.type === 'income' && monthIndex < months.length) {
            result[monthIndex] += record.amount
        }
    })
    return result
})

const expenseData = computed(()=>{
    const result = Array(months.length).fill(0)
    const records = store.records || []
    records.forEach(record =>{
        const monthIndex = new Date(record.data || Date.now()).getMonth()
        if(record.type === 'expense' && monthIndex < months.length){
            result[monthIndex] += record.amount
        }
    })
    return result
})

const form = reactive({
    type: '',
    time:null,
    amount: 0,
    note: ''
})

const dateValue = ref(null)
const editingIndex = ref(null)

const handleAdd = () => {
    if (!form.type || form.amount <= 0) return
    const formattedDate = new Date(form.time).toISOString().slice(0, 10) 
    store.addRecord({ ...form ,time:formattedDate})
    form.type = ''
    form.time = null
    form.amount = 0
    form.note = ''
    dateValue.value = null
}

const startEdit = (index) =>{
    const record = store.records[index]
    editingIndex.value = index
    form.type = record.type
    form.time = record.time
    form.amount = record.amount
    form.note = record.note
}

const handleMod = (index) =>{
    if(editingIndex.value === null) return
    store.modifyRecord(editingIndex.value,{...form})
    editingIndex.value = null
    form.type = ''
    form.time = null
    form.amount = 0
    form.note = ''
}

const deleteRecord = (index) => {
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
                    <el-option label="income" value="income" />
                    <el-option label="expense" value="expense" />
                </el-select>
            </el-form-item>

            <el-form-item label="selectTime">
                <el-date-picker
                  v-model="form.time"
                  type="date"
                  placeholder="select time"
                  :clearable="true"
                >
                </el-date-picker>
            </el-form-item>

            <el-form-item label="amount">
                <el-input-number v-model="form.amount" :min="0" />
            </el-form-item>

            <el-form-item label="remark">
                <el-input v-model="form.note" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleAdd">add records</el-button>
            </el-form-item>
        </el-form>
        <el-divider />

        <el-table :data="records" style="width: 100%;">
            <el-table-column prop="type" label="type" />
            <el-table-column prop="time" label="time"/>
            <el-table-column prop="amount" label="amount" />
            <el-table-column prop="note" label="note" />
            <el-table-column label="option" width="80" fixed="right" align="center">
                <template #default="{ $index }">
                    <el-button type="danger" size="small" @click="deleteRecord($index)">delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-divider />
        <div>
            <p>incomeTotal:{{ store.incomeTotal }}</p>
            <p>expenseTotal:{{ store.expenseTotal }}</p>
        </div>
    </div>
    <Chart :incomeData="incomeData" :expenseData="expenseData" :months="months"/>
</template>