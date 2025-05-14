<template>
  <div class="container-fluid p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-heading">Welcome, <span class="name"> {{ user.firstName }}</span> !</h2>
      <button class="btn btn-light" @click="logout">Logout</button>
    </div>

    <div class="d-flex justify-content-start mb-4">
      <button class="btn btn-add" @click="addVehicle">+ Add Vehicle</button>
    </div>

    <div class="row g-4">
      <div v-for="vehicle in vehicles" :key="vehicle._id" class="mb-4">
        <div
          class="card shadow-sm p-3 d-flex flex-row align-items-center justify-content-between"
        >
          <div class="d-flex align-items-center">
            <img
              :src="vehicle.vehicleImage"
              alt="Vehicle"
              class="img-thumbnail me-3 vehicle-img"
              style="width: 155px; height: 100px; object-fit: cover"
            />

            <div>
              <h5 class="mb-1">{{ vehicle.vehicleName }}</h5>
              <p class="mb-0 text-muted">{{ vehicle.vehicleNumber }}</p>
            </div>
          </div>

          <div class="ms-auto d-flex flex-column align-items-end">
            <div class="mb-2">
              <button
                class="btn btn-action btn-sm me-2"
                @click="goToStats(vehicle._id)"
              >
                View Stats
              </button>
              <button
                class="btn btn-secondary btn-sm"
                @click="goToFuelLog(vehicle._id)"
              >
                Add Fuel Log
              </button>
            </div>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="removeVehicle(vehicle._id)"
            >
              Remove Vehicle
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="vehicles.length === 0" class="text-center mt-5 text-muted">
      <p>No vehicles found. Click "Add Vehicle" to get started.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref({});
const vehicles = ref([]);
const message = ref("");

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3030/profile", {
      withCredentials: true,
    });
    user.value = res.data.userinfo;
    localStorage.setItem("user", JSON.stringify(user.value));

    await fetchVehicles();
  } catch (err) {
    router.push("/login");
  }
});

const fetchVehicles = async () => {
  try {
    const res = await axios.get("http://localhost:3030/vehicle-data", {
      withCredentials: true,
    });
    vehicles.value = res.data.filter((v) => v.userId === user.value._id);
  } catch (error) {
    message.value = "Failed to load vehicles.";
    console.error(error);
  }
};

const addVehicle = () => {
  if (!user.value?._id) {
    alert("User not found. Please log in again.");
    router.push("/login");
    return;
  }
  router.push("/add-vehicle");
};

const removeVehicle = async (vehicleId) => {
  if (!confirm("Are you sure you want to remove this vehicle?")) return;

  try {
    await axios.delete(`http://localhost:3030/vehicle-data/${vehicleId}`, {
      withCredentials: true,
    });
    vehicles.value = vehicles.value.filter((v) => v._id !== vehicleId);
  } catch (err) {
    console.error("Error removing vehicle:", err);
    alert("Failed to remove vehicle. Try again.");
  }
};

const goToStats = (vehicleId) => {
  router.push(`/vehicle/${vehicleId}/stats`);
};

const goToFuelLog = (vehicleId) => {
  router.push(`/vehicle/${vehicleId}/fuel-log`);
};

const logout = async () => {
  await axios.get("http://localhost:3030/logout", {
    withCredentials: true,
  });
  localStorage.removeItem("user");
  router.push("/login");
};
</script>

<style scoped>
.container-fluid {
  background-color: #d99872;
  /* background-color: white; */
  color: #544740;
  min-height: 90vh;
  overflow: hidden;
  border-radius: 25px;
}

.text-heading {
  color: #544740;
  font-weight: bold;
}
.name{
  color: whitesmoke;
}

.btn-light:hover {
  background-color: red;
  color: white;
}

.btn-add {
  background-color: #544740;
  color: #fff;
  border: none;
}

.btn-add:hover {
  background-color: #B66E4C;
  color: white;
  border: 1px solid #544740;
}

.card {
  background-color: #fff;
  /* background-color: #B66E4C; */
  border-left: 5px solid #544740;
  border-radius: 15px;
  padding: 15px;
}

.vehicle-img {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}

.btn-action {
  background-color: #544740;
  color: #fff;
  border: none;
  padding: 4px 10px;
  font-size: 0.875rem;
}

.btn-action:hover {
  background-color: #B66E4C;
  color: white;
  border: 1px solid #544740;
}

.btn-secondary {
  background-color: #a38675;
  border: none;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #C69B82	;
  color: #544740;
  border: 1px solid #a38675;
}

.btn-outline-danger:hover {
  background-color: #a94442;
  color: #fff;
}

.text-muted {
  color: #6c5b51 !important;
}
</style>
