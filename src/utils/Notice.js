import { ElNotification } from 'element-plus';

export const notify = (type = 'success',title = 'notice',message = 'this is a message') => {
    ElNotification({
        title,
        message,
        type,
        duration:3000,
        position:'top-right',
        showClose:true
    })
}


