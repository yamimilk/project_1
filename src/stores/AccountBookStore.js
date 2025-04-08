import { defineStore } from "pinia";

export const useAccountBook = defineStore('accountBook', {
    state: () => ({
        records: JSON.parse(localStorage.getItem('account-records') || '[]',)
    }),

    getters: {
        incomeTotal: (state) => state.records.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0),
        expenseTotal: (state) => state.records.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0),
    },

    actions: {
        addRecord(record) {
            this.records.push({...record,date: new Date().toDateString()})
            this.saveToLocalStorage()
        },
        deleteRecord(index){
            this.records.splice(index,1)
            this.saveToLocalStorage()
        },
        saveToLocalStorage(){
            localStorage.setItem('account-records',JSON.stringify(this.records))
        }
    }
})