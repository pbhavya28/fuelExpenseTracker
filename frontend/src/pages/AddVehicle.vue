<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <button class="btn btn-outline-secondary backbtn" @click="goBack">← Back</button>
    </div>
    <div class="card shadow">
      <h4 class="mb-0 display-4">Add Vehicle</h4>
      <form @submit.prevent="submitVehicle" class=" p-4 ">
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

        <button type="submit" class="btn w-100">Add Vehicle</button>
      </form>
    </div>

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
  router.push("/home");
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
  height: 85vh;
  margin: 0;
  overflow: hidden;
  background-color: #d99872;
  border: 1px solid transparent;
  border-radius: 10px;
}
.card {
  margin: auto;
  border-radius: 10px;
  width: 450px;
  height: auto;
  background-color: #f9f9f9;
}
.display-4 {
  color: #544740;
  font-weight: 500;
  text-align: center;
  margin-top: 15px;
  font-size: 40px;
}
.btn {
  background-color: #544740;
  color: white;
}
.btn:hover {
  background-color: peru;
}
.backbtn{
  margin-top: 20px;
  margin-left: 10px;
}
.backbtn:hover{
  background-color: wheat;
  color: black;
}
</style>
