
<template>
  <div class="register-wrapper">
    <div class="left-side">
      <img src="../assets/images/image.png" alt="Register visual" class="register-image" />
    </div>

    <div class="right-side">
      <div class="card register-card shadow-lg">
        <h2 class="mb-4 text-center register-title">Register</h2>

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

          <button type="submit" class="btn custom-btn w-100">Register</button>

          <div v-if="message" class="alert alert-info mt-3" role="alert">
            {{ message }}
          </div>
        </form>

        <p class="mt-3 text-center">
          Already have an account?
          <router-link to="/login" class="register-link">Login here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const user = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

const message = ref("");
const router = useRouter();

const submitForm = async () => {
  try {
    await axios.post("http://localhost:3030/data", user);
    message.value = "Registration successful! Redirecting to login...";
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (err) {
    message.value = err.response?.data?.error || "Something went wrong!";
  }
};
</script>

<style scoped>
html,
body,
.register-wrapper {
  height: 85vh;
  margin: 0;
  overflow: hidden;
}

.register-wrapper {
  display: flex;
}

.left-side {
  flex: 1;
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: white;
}

.register-image {
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

.register-card {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.register-title {
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
  .register-wrapper {
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

  .register-card {
    max-height: 100%;
    width: 90%;
  }
}
</style>
