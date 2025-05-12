<template>
    <div class="container mt-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <button class="btn btn-outline-secondary" @click="goBack()">← Back</button>
            <h2 class="mb-0 text-primary">Fuel Logs for Vehicle: {{ vehicleNumber }}</h2>
            <div style="width: 90px"></div>
        </div>
        <div class="d-flex mb-4" style="gap: 10px;">
            <label for="fdate">Enter From Date : <input type="date" v-model="fromDate" class="form-control me-2" placeholder="From Date" id="fdate" /></label>
            <label for="tdate">Enter To Date :<input type="date" v-model="toDate" class="form-control me-2" placeholder="To Date" id="tdate"/></label>
            <button style="height:40px; margin-top: 22px;" class="btn btn-primary" @click="filterLogs()">Filter</button>
        </div>

        <h4>Total Expense: {{ totalExpense }}</h4>

        <table class="table table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>Sl#</th>
                    <th>Liters</th>
                    <th>Price/Liter (₹) </th>
                    <th>Date</th>
                    <th>Mileage (km/l)</th>
                    <th>Distance (km)</th>
                    <th>Total Expense (₹)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(log, index) in filteredLogs" :key="log._id">
                    <th>{{ index + 1 }}</th>
                    <td>{{ log.liters }}</td>
                    <td>{{ log.pricePerLiter }}</td>
                    <td>{{ dateFormat(log.date) }}</td>
                    <td>{{ log.mileage }}</td>
                    <td>{{ log.distance }}</td>
                    <td>{{ log.price }}</td>
                </tr>
                <tr v-if="filteredLogs.length === 0">
                    <td colspan="7" class="text-center">No logs found for the selected date range.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

let route = useRoute();
let router = useRouter();
let vehicleId = route.params.vehicleId;

let logs = ref([]);
let filteredLogs = ref([]);
let vehicleNumber = ref("");
let fromDate = ref("");
let toDate = ref("");

onMounted( () => {
    fetchLogs();
});

let totalExpense = computed(() => {
    return filteredLogs.value.reduce((sum, log) => sum + log.price, 0);
});

console.log("Vehicle ID:", vehicleId);

let fetchLogs = () => {
    axios
        .get(`http://localhost:3030/vehicle/${vehicleId}/stats`, {
            withCredentials: true,
        }).then((res) => {
            logs.value = res.data.logs.sort((previous, current)=> {
                return new Date(previous.date) - new Date(current.date);
            });
            vehicleNumber.value = res.data.vehicleNumber;
            filteredLogs.value = logs.value;
        }).catch((error) => {
            console.log("Error when reading logs: ", error);
        });
};

let filterLogs = () => {
    if (!fromDate.value || !toDate.value) {
        alert("Please select both From and To dates.");
        return;
    }

    filteredLogs.value = logs.value.filter((log) => new Date(log.date) >= new Date(fromDate.value)
        && new Date(log.date) <= new Date(toDate.value))
        .sort((previous, current)=> {
                return new Date(previous.date) - new Date(current.date);
            });;
};

let dateFormat =(date)=>{
    let d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth()+1;
    let year = d.getFullYear();
    return `${day}-${month}-${year}`;
}

let goBack = () => {
  router.push('/home');
};
</script>