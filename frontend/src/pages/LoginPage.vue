<template>
  <div class="login-wrapper no-scroll">
    <div class="left-side">
      <img src="../assets/images/image.png" alt="Login visual" class="login-image" />
    </div>

    <div class="right-side">
      <div class="card login-card shadow-lg">
        <h2 class="mb-4 text-center login-title">Login</h2>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="email" type="email" class="form-control" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>

          <button type="submit" class="btn custom-btn w-100">Login</button>

          <div v-if="error" class="alert alert-danger mt-3" role="alert">
            {{ error }}
          </div>
        </form>

        <p class="mt-3 text-center">
          Don’t have an account?
          <router-link to="/register" class="register-link">Register here</router-link>
        </p>
      </div>
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
  } finally {
    email.value = ''
    password.value = ''
  }
}
</script>

<style scoped>
html,
body,
.login-wrapper {
  height: 85vh;
  margin: 0;
  overflow: hidden;
}

.login-wrapper {
  display: flex;
}

.left-side {
  flex: 1;
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #D99872;
  margin-right: 0rem;
  background-color: white;
}

.login-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}


.right-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #D99872;
  padding: 2rem;
  overflow: hidden;
}

.login-card {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.login-title {
  color: #544740;
  font-weight: bold;
}

.custom-btn {
  background-color: #544740;
  color: white;
  border: none;
}

.custom-btn:hover {
  background-color: #3d372e;
}

.register-link {
  color: #544740;
  font-weight: 500;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}

.form-label {
  color: #544740;
  font-weight: 500;
}

.form-control {
  color: #333;
  background-color: #fff;
  border: 1px solid #ccc;
}

@media (max-width: 768px) {
  .login-wrapper {
    flex-direction: column;
  }

  .left-side,
  .right-side {
    width: 100%;
    height: 50vh;
  }

  .left-side {
    order: 2;
  }

  .right-side {
    order: 1;
  }

  .login-card {
    max-height: 100%;
    width: 90%;
  }
}
</style>
