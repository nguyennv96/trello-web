<script setup>
import { reactive, useTemplateRef } from 'vue'
import { login } from './apis/auth'
import { update } from './apis/user'
import { RouterView } from 'vue-router'
import '@/assets/main.css'

let file = null

const handleLogin = async () => {
  let res = await login({
    email: 'nguyen.haui.bb96@gmail.com',
    password: 'Bicatxo@1996',
  })
  if (res.status === 200) {
  }
  console.log(res)
}
const handleUpload = async () => {
  const formData = new FormData()
  formData.append('avatar', file)
  const res = await update(formData)
  console.log(res)
}
const handleOnChange = (event) => {
  console.log(event)
  file = event.target.files[0]
}
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
