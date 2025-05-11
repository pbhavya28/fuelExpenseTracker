<!-- <template>
    <div class="container mt-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <button class="btn btn-outline-secondary" @click="goBack">← Back</button>
        <h4 class="mb-0 text-primary">Add Fuel Log for {{ vehicle.vehicleName }}</h4>
        <div style="width: 90px"></div>
      </div>
  
      <div class="d-flex">
        <div v-if="vehicle.vehicleImage" class="flex-shrink-0 me-4">
          <img
            :src="vehicle.vehicleImage"
            alt="Vehicle Image"
            class="img-fluid rounded shadow-sm"
            style="max-height: 250px; object-fit: contain;"
          />
        </div>
  
        <form @submit.prevent="submitFuelLog" class="card p-4 shadow flex-grow-1">
          <div class="mb-3">
            <label for="fuelAmount" class="form-label">Fuel Amount (liters)</label>
            <input
              type="number"
              class="form-control"
              id="fuelAmount"
              v-model="fuelLog.liters"
              required
            />
          </div>
  
          <div class="mb-3">
            <label for="fuelPrice" class="form-label">Fuel Price (per liter)</label>
            <input
              type="number"
              class="form-control"
              id="fuelPrice"
              v-model="fuelLog.pricePerLiter"
              required
            />
          </div>
  
          <div class="mb-3">
            <label for="fuelDate" class="form-label">Fuel Date</label>
            <input
              type="date"
              class="form-control"
              id="fuelDate"
              v-model="fuelLog.date"
              required
            />
          </div>
  
          <div class="mb-3">
            <label for="distance" class="form-label">Distance Traveled (km)</label>
            <input
              type="number"
              class="form-control"
              id="distance"
              v-model="fuelLog.distance"
              required
            />
          </div>
  
          <div class="mb-3 text-center">
            <button type="button" class="btn btn-outline-primary" @click="calculateMileage">
              Calculate Mileage
            </button>
          </div>
  
          <div v-if="mileage !== null" class="alert alert-success text-center">
            Mileage: {{ mileage.toFixed(2) }} km/l
          </div>
  
          <button type="submit" class="btn btn-primary w-100">Add Fuel Log</button>
        </form>
      </div>
  
      <div v-if="message" class="alert alert-info mt-4 text-center">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { useRoute, useRouter } from "vue-router";
  
  const route = useRoute();
  const router = useRouter();
  
  const fuelLog = ref({
    vehicleId: route.params.id,
    liters: "",
    pricePerLiter: "",
    date: "",
    distance: "",
  });
  
  const message = ref("");
  const mileage = ref(null);
  const vehicle = ref({});
  
  onMounted(async () => {
    try {
      const res = await axios.get(`http://localhost:3030/vehicle-data/${route.params.id}`);
      vehicle.value = res.data;
    } catch (error) {
      console.error("Error fetching vehicle:", error);
      message.value = "Failed to fetch vehicle data.";
    }
  });
  
  const calculateMileage = () => {
    const { liters, distance } = fuelLog.value;
    if (liters && distance && liters > 0) {
      mileage.value = distance / liters;
    } else {
      message.value = "Please enter valid liters and distance to calculate mileage.";
    }
  };
  
  const submitFuelLog = async () => {
    const { liters, pricePerLiter, distance } = fuelLog.value;
    if (isNaN(liters) || isNaN(pricePerLiter) || isNaN(distance)) {
      message.value = "Please enter valid numeric values.";
      return;
    }
  
    const calculatedMileage = distance / liters;
    const price = liters * pricePerLiter;
  
    try {
      await axios.post("http://localhost:3030/fuel-log", {
        ...fuelLog.value,
        mileage: calculatedMileage,
        price,
      }, {
        withCredentials: true,
      });
  
      message.value = "Fuel log added successfully! Redirecting to home...";
      setTimeout(() => {
        router.push("/home");
      }, 5000);
    } catch (err) {
      message.value = "Failed to add fuel log.";
      console.error("Error:", err);
    }
  };
  
  const goBack = () => {
    router.push("/home");
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px; /* Increased width to fit both image and form */
  }
  
  .card {
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  
  .d-flex {
    display: flex;
    align-items: flex-start;
    gap: 30px; /* Add gap between image and form */
  }
  </style>
   -->
   <template>
    <div class="container mt-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <button class="btn btn-outline-secondary" @click="goBack">← Back</button>
        <h4 class="mb-0 text-primary">Add Fuel Log for {{ vehicle.vehicleName }}</h4>
        <div style="width: 90px"></div>
      </div>
  
      <div class="d-flex">
        <div v-if="vehicle.vehicleImage" class="flex-shrink-0 me-4">
          <img
            :src="vehicle.vehicleImage"
            alt="Vehicle Image"
            class="img-fluid rounded shadow-sm"
            style="max-height: 250px; object-fit: contain;"
          />
        </div>
  
        <form @submit.prevent="submitFuelLog" class="card p-4 shadow flex-grow-1">
          <div class="mb-3">
            <label for="fuelAmount" class="form-label">Fuel Amount (liters)</label>
            <input
              type="number"
              class="form-control"
              id="fuelAmount"
              v-model.number="fuelLog.liters"
              required
            />
          </div>
  
          <div class="mb-3">
            <label for="fuelPrice" class="form-label">Fuel Price (per liter)</label>
            <input
              type="number"
              class="form-control"
              id="fuelPrice"
              v-model.number="fuelLog.pricePerLiter"
              required
            />
          </div>
  
          <div class="mb-3">
            <label for="fuelDate" class="form-label">Fuel Date</label>
            <input
              type="date"
              class="form-control"
              id="fuelDate"
              v-model="fuelLog.date"
              required
            />
          </div>
  
          <div class="mb-3">
            <label for="distance" class="form-label">Distance Traveled (km)</label>
            <input
              type="number"
              class="form-control"
              id="distance"
              v-model.number="fuelLog.distance"
              required
            />
          </div>
  
          <div class="mb-3 text-center">
            <button type="button" class="btn btn-outline-primary" @click="calculateMileage">
              Calculate Mileage & Expenses
            </button>
          </div>
  
          <div v-if="mileage !== null" class="alert alert-success text-center">
            Mileage: {{ mileage.toFixed(2) }} km/l<br />
            Total Price: ₹{{ price.toFixed(2) }}
          </div>
  
          <button type="submit" class="btn btn-primary w-100">Add Fuel Log</button>
        </form>
      </div>
  
      <div v-if="message" class="alert alert-info mt-4 text-center">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { useRoute, useRouter } from "vue-router";
  
  const route = useRoute();
  const router = useRouter();
  
  const fuelLog = ref({
    vehicleId: route.params.id,
    liters: "",
    pricePerLiter: "",
    date: "",
    distance: "",
  });
  
  const message = ref("");
  const mileage = ref(null);
  const price = ref(0);
  const vehicle = ref({});
  
  onMounted(async () => {
    try {
      const res = await axios.get(`http://localhost:3030/vehicle-data/${route.params.id}`);
      vehicle.value = res.data;
    } catch (error) {
      console.error("Error fetching vehicle:", error);
      message.value = "Failed to fetch vehicle data.";
    }
  });
  
  const calculateMileage = () => {
    const { liters, distance, pricePerLiter } = fuelLog.value;
    if (liters > 0 && distance > 0 && pricePerLiter > 0) {
      mileage.value = distance / liters;
      price.value = liters * pricePerLiter;
      message.value = "";
    } else {
      message.value = "Please enter valid liters, distance, and price.";
      mileage.value = null;
      price.value = 0;
    }
  };
  
  const submitFuelLog = async () => {
    const { liters, pricePerLiter, distance } = fuelLog.value;
    if (isNaN(liters) || isNaN(pricePerLiter) || isNaN(distance)) {
      message.value = "Please enter valid numeric values.";
      return;
    }
  
    const calculatedMileage = distance / liters;
    const totalPrice = liters * pricePerLiter;
  
    try {
      await axios.post("http://localhost:3030/fuel-log", {
        ...fuelLog.value,
        mileage: calculatedMileage,
        price: totalPrice,
      }, {
        withCredentials: true,
      });
  
      message.value = "Fuel log added successfully! Redirecting to home...";
      setTimeout(() => {
        router.push("/home");
      }, 5000);
    } catch (err) {
      message.value = "Failed to add fuel log.";
      console.error("Error:", err);
    }
  };
  
  const goBack = () => {
    router.push("/home");
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
  }
  
  .card {
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  
  .d-flex {
    display: flex;
    align-items: flex-start;
    gap: 30px;
  }
  </style>
  