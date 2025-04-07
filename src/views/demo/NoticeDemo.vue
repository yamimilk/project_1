<template>
    <div class="flex gap-2">
        <el-button type="success" @click="notify('success','success','finish action')">success</el-button>
        <el-button type="warning" @click="notify('warining','warn','you have a warn')">warning</el-button>
        <el-button type="info" @click="notify('info','message','you have a message')">message</el-button>
        <el-button type="error" @click="notify('danger','erroe','you have a error')">error</el-button>
    </div>
</template>

<script>
import { notify } from '../../utils/Notice';
export default {
    methods:{
        notify:(type,title,message) => {
            notify(type,title,message);
        }
    }
}
</script>