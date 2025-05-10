
   <template>
    <div class="container mt-5">
      <div class="card p-4 shadow-lg mx-auto" style="max-width: 500px;">
        <h2 class="mb-4 text-center text-success">Register</h2>
  
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label class="form-label">First Name</label>
            <input v-model="user.firstName" class="form-control" required />
          </div>
  
          <div class="mb-3">
            <label class="form-label">Last Name</label>
            <input v-model="user.lastName" class="form-control" required />
          </div>
  
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" v-model="user.email" class="form-control" required />
          </div>
  
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" v-model="user.password" class="form-control" required />
          </div>
  
          <button type="submit" class="btn btn-success w-100">Register</button>
  
          <div v-if="message" class="alert alert-info mt-3" role="alert">
            {{ message }}
          </div>
        </form>
  
        <p class="mt-3 text-center">
          Already have an account?
          <router-link to="/login" class="text-decoration-none">Login here</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const user = reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  
  const message = ref('')
  const router = useRouter()
  
  const submitForm = async () => {
    try {
      await axios.post('http://localhost:5050/data', user)
      message.value = 'Registration successful! Redirecting to login...'
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (err) {
      message.value = err.response?.data?.error || 'Something went wrong!'
    }
  }
  </script>
  