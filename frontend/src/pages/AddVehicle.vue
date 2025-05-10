<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <button class="btn btn-outline-secondary" @click="goBack">← Back</button>
      <h4 class="mb-0 text-primary">Add Vehicle</h4>
      <div style="width: 90px"></div>
    </div>
    <form @submit.prevent="submitVehicle" class="card p-4 shadow">
      <div class="mb-3">
        <label for="vehicleName" class="form-label">Vehicle Name</label>
        <input
          type="text"
          class="form-control"
          id="vehicleName"
          v-model="vehicle.vehicleName"
          required
        />
      </div>

      <div class="mb-3">
        <label for="vehicleNumber" class="form-label">Vehicle Number</label>
        <input
          type="text"
          class="form-control"
          id="vehicleNumber"
          v-model="vehicle.vehicleNumber"
          required
        />
      </div>

      <div class="mb-3">
        <label for="vehicleImage" class="form-label">Vehicle Image</label>
        <input
          type="file"
          class="form-control"
          id="vehicleImage"
          @change="handleImageUpload"
        />
      </div>

      <div class="mb-3">
        <label for="fuelType" class="form-label">Fuel Type</label>
        <select
          class="form-select"
          id="fuelType"
          v-model="vehicle.fuelType"
          required
        >
          <option disabled value="">Select fuel type</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary w-100">Add Vehicle</button>
    </form>

    <div v-if="message" class="alert alert-info mt-4 text-center">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const message = ref("");

const vehicle = reactive({
  userId: "",
  vehicleName: "",
  vehicleNumber: "",
  vehicleImage: "",
  fuelType: "",
});

onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser && storedUser._id) {
    vehicle.userId = storedUser._id;
  } else {
    message.value = "User not logged in";
    router.push("/login");
  }
});

const goBack = () => {
  router.push('/home');
};

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    vehicle.vehicleImage = reader.result;
  };
  reader.readAsDataURL(file);
};

const submitVehicle = async () => {
  try {
    const res = await axios.post("http://localhost:3030/vehicle-data", vehicle);
    message.value = "Vehicle added successfully! Redirecting to home...";
    vehicle.vehicleName = "";
    vehicle.vehicleNumber = "";
    vehicle.vehicleImage = "";
    vehicle.fuelType = "";

    setTimeout(() => {
      router.push("/home");
    }, 5000);
  } catch (err) {
    message.value = err.response?.data?.message || "Failed to add vehicle";
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
.card {
  border-radius: 10px;
  background-color: #f9f9f9;
}
</style>
