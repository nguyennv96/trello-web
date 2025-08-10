<script setup>
import { reactive, useTemplateRef } from 'vue'
import { login } from './apis/auth'
import { update } from './apis/user'
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
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
  <div class="bg-white p-6 rounded-2xl shadow-lg w-80">
    <h1 class="text-2xl font-bold text-gray-800 mb-4 text-center">Hello Tailwind!</h1>
    <p class="text-gray-600 mb-6 text-center">Đây là đoạn code test Tailwind CSS.</p>
    <button
      class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
    >
      Bấm vào tôi
    </button>
  </div>
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
