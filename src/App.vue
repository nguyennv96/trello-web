<script setup>
import { reactive, useTemplateRef } from 'vue'
import { login } from './apis/auth'
import { update } from './apis/user'
import { setItem } from './utils/local-storage'

let file = null

const handleLogin = async () => {
  let res = await login({
    email: 'nguyen.haui.bb96@gmail.com',
    password: 'Bicatxo@1996',
  })
  if (res.status === 200) {
    setItem('access-token', res.data.accessToken)
    setItem('refresh-token', res.data.refreshToken)
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
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <button @click="handleLogin">Test Login</button>
  <br />
  <input type="file" @change="handleOnChange" />
  <button @click="handleUpload">Test upload</button>
</template>

<style scoped></style>
