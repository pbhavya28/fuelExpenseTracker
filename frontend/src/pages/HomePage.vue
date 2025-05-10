<template>
    <div class="container text-center mt-5">
      <div class="card shadow p-5">
        <h1 class="text-primary">Welcome, {{ user.firstName }}!</h1>
        <p class="mt-3">You are now logged in.</p>
        <button class="btn btn-danger mt-4" @click="logout">Logout</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const user = ref({})
  const router = useRouter()
  
  onMounted(async () => {
    try {
      const res = await axios.get('http://localhost:3030/profile', { withCredentials: true })
      user.value = res.data.userinfo
    } catch (err) {
      router.push('/login')
    }
  })
  
  const logout = async () => {
    await axios.get('http://localhost:3030/logout', { withCredentials: true })
    router.push('/login')
  }
  </script>
  