<script setup>
import { computed, reactive, ref } from 'vue';
import Chart from '../../components/Chart.vue';
import { useAccountBook } from '../../stores/AccountBookStore';
import { dayjs } from 'element-plus';
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

const store = useAccountBook()
const records = store.records || []
const timeFilter = ref('thisMonth')
// const timeOptions = [
//     { label: 'thisMonth', value: 'thisMonth' },
//     { label: 'lastMonth', value: 'lastMonth' }
// ]
const editingField = ref(null)
// 当前时间基准
const now = dayjs()
const form = reactive({
    type: '',
    time: null,
    amount: 0,
    note: ''
})

const dateValue = ref(null)
const editingIndex = ref(null)
const tempRow = reactive({
    type: '',
    time: null,
    amount: 0,
    note: ''
})


// function isThisMonth(date) {
//     const now = new Date()
//     return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
// }

// function isLastMonth(date) {
//     const now = new Date()
//     const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
//     return date.getFullYear() === lastMonth.getFullYear() && date.getMonth() === lastMonth.getMonth()
// }

const filteredRecords = computed(() => {
    return records.filter(record => {
        const date = dayjs(record.date)
        switch (timeFilter.value) {
            case 'thisMonth': return date.isSame(now, 'month')
            case 'lastMonth': return date.isSame(now.subtract(1, 'month'), 'month')
            case 'thisYear': return date.isSame(now, 'year')
            case 'lastYear': return date.isSame(now.subtract(1, 'year'), 'year')
            case 'thisWeek': return date.isSame(now, 'week')
            case 'lastWeek': return date.isSame(now.subtract(1, 'week'), 'week')
            default: return true
        }
    })
})

const groupFormat = computed(() => {
  switch (timeFilter.value) {
    case 'thisMonth':
    case 'lastMonth':
      return 'MM-DD' // 按天
    case 'thisWeek':
    case 'lastWeek':
      return 'ddd' // Mon/Tue/...
    case 'thisYear':
    case 'lastYear':
      return 'MMM' // Jan/Feb/...
    default:
      return 'MMM'
  }
})

const groups = computed(() => {
  const all = filteredRecords.value.map(r => dayjs(r.date).format(groupFormat.value))
  return [...new Set(all)]
})

const months = computed(() => {
    if (['thisYear', 'lastYear'].includes(timeFilter.value)) {
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    } else {
        return filteredRecords.value.map(r => dayjs(r.date).format('MM-DD'))
    }
})


//自行转换时间，避免自动转换时间提前一天
function formatDateToLocalISO(date) {
    if (!date) return null
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}


const incomeData = computed(() => {
    return groups.value.map(g => {
        return filteredRecords.value
            .filter(r => r.type === 'income' && dayjs(r.date).format(groupFormat.value) === g)
            .reduce((sum, r) => sum + r.amount, 0)
    })
})

const expenseData = computed(() => {
    return groups.value.map(g => {
        return filteredRecords.value
            .filter(r => r.type === 'expense' && dayjs(r.date).format(groupFormat.value) === g)
            .reduce((sum, r) => sum + r.amount, 0)
    })
})

const handleAdd = () => {
    if (!form.type || form.amount <= 0) return
    const formattedDate = formatDateToLocalISO(form.time)
    store.addRecord({ ...form, time: formattedDate })
    form.type = ''
    form.time = null
    form.amount = 0
    form.note = ''
    dateValue.value = null
}

const startEdit = (index, field) => {
    const record = store.records[index]
    editingIndex.value = index
    editingField.value = field
    tempRow[field] = record[field]
}

const saveEdit = () => {
    if (editingIndex.value !== null && editingField.value) {
        const value = tempRow[editingField.value]
        const update = { [editingField.value]: value }

        if (editingField.value === 'time') {
            update.time = formatDateToLocalISO(value)
        }

        store.modifyRecord(editingIndex.value, {
            ...store.records[editingIndex.value],
            ...update
        })

        editingIndex.value = null
        editingField.value = null
    }
}



// const handleMod = (index) => {
//     if (editingIndex.value === null) return
//     store.modifyRecord(editingIndex.value, { ...form })
//     editingIndex.value = null
//     form.type = ''
//     form.time = null
//     form.amount = 0
//     form.note = ''
// }

const deleteRecord = (index) => {
    store.deleteRecord(index)
}


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
                <el-date-picker v-model="form.time" type="date" placeholder="select time" :clearable="true">
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
            <!-- 类型 -->
            <el-table-column prop="type" label="type">
                <template #default="{ row, $index }">
                    <template v-if="editingIndex === $index && editingField === 'type'">
                        <el-select v-model="tempRow.type" size="small" @change="saveEdit">
                            <el-option label="income" value="income" />
                            <el-option label="expense" value="expense" />
                        </el-select>
                    </template>
                    <span v-else @click="startEdit($index, 'type')">
                        {{ row.type }}
                    </span>
                </template>
            </el-table-column>

            <!-- 时间 -->
            <el-table-column prop="time" label="time">
                <template #default="{ row, $index }">
                    <template v-if="editingIndex === $index && editingField === 'time'">
                        <el-date-picker v-model="tempRow.time" type="date" size="small" @change="saveEdit"
                            @blur="saveEdit" />
                    </template>
                    <span v-else @click="startEdit($index, 'time')">
                        {{ row.time }}
                    </span>
                </template>
            </el-table-column>

            <!-- 金额 -->
            <el-table-column prop="amount" label="amount">
                <template #default="{ row, $index }">
                    <template v-if="editingIndex === $index && editingField === 'amount'">
                        <el-input-number v-model="tempRow.amount" size="small" @change="saveEdit" @blur="saveEdit" />
                    </template>
                    <span v-else @click="startEdit($index, 'amount')">
                        {{ row.amount }}
                    </span>
                </template>
            </el-table-column>

            <!-- 备注 -->
            <el-table-column prop="note" label="note">
                <template #default="{ row, $index }">
                    <template v-if="editingIndex === $index && editingField === 'note'">
                        <el-input v-model="tempRow.note" size="small" @change="saveEdit" @blur="saveEdit" />
                    </template>
                    <span v-else @click="startEdit($index, 'note')">
                        {{ row.note }}
                    </span>
                </template>
            </el-table-column>

            <!-- 删除按钮 -->
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

    <el-button-group class="mb-4">
        <el-button @click="timeFilter = 'thisWeek'"
            :type="timeFilter === 'thisWeek' ? 'primary' : 'default'">本周</el-button>
        <el-button @click="timeFilter = 'lastWeek'"
            :type="timeFilter === 'lastWeek' ? 'primary' : 'default'">上周</el-button>
        <el-button @click="timeFilter = 'thisMonth'"
            :type="timeFilter === 'thisMonth' ? 'primary' : 'default'">本月</el-button>
        <el-button @click="timeFilter = 'lastMonth'"
            :type="timeFilter === 'lastMonth' ? 'primary' : 'default'">上月</el-button>
        <el-button @click="timeFilter = 'thisYear'"
            :type="timeFilter === 'thisYear' ? 'primary' : 'default'">今年</el-button>
        <el-button @click="timeFilter = 'lastYear'"
            :type="timeFilter === 'lastYear' ? 'primary' : 'default'">去年</el-button>
    </el-button-group>

    <Chart :incomeData="incomeData" :expenseData="expenseData" :months="groups" />
</template>