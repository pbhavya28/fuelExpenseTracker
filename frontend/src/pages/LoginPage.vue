   <template>
    <div class="container mt-5">
      <div class="card p-4 shadow-lg mx-auto" style="max-width: 400px;">
        <h2 class="mb-4 text-center text-primary">Login</h2>
  
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="email" type="email" class="form-control" required />
          </div>
  
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
  
          <button type="submit" class="btn btn-primary w-100">Login</button>
  
          <div v-if="error" class="alert alert-danger mt-3" role="alert">
            {{ error }}
          </div>
        </form>
  
        <p class="mt-3 text-center">
          Don’t have an account?
          <router-link to="/register" class="text-decoration-none">Register here</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const router = useRouter()
  
  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3030/login', {
        email: email.value,
        password: password.value
      }, {
        withCredentials: true
      })
  
      localStorage.setItem('user', JSON.stringify(res.data.user))
      router.push('/home')
    } catch (err) {
        error.value = err.response?.data?.error || 'Login failed'
        alert(error.value)
    }
    finally{
        email.value='';
        password.value='';
    }
  }
  </script>
  