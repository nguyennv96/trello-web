import { ElNotification } from 'element-plus'

const error = (message) =>
  ElNotification.error({
    title: 'Lỗi',
    message: message,
    duration: 4000,
    position: 'top-right',
  })
const info = (message) =>
  ElNotification.info({
    message: message,
    duration: 4000,
    position: 'top-right',
  })
const success = (message) =>
  ElNotification.success({
    title: 'Thành công',
    message: message,
    duration: 4000,
    position: 'top-right',
  })
const warning = (message) =>
  ElNotification.warning({
    message: message,
    duration: 4000,
    position: 'top-right',
  })
const notification = {
  error,
  success,
  info,
  warning,
}
export default notification
