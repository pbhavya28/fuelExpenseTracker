<template>
    <div class="container">
        <div class="heading d-flex justify-content-between align-items-center mb-4">
            <button class="btn backbtn" @click="goBack()"> ← Back</button>
            <h3 class="mb-0">Fuel Logs for Vehicle: <span class="vnumber"> {{ vehicleNumber }} </span></h3>
            <div style="width: 90px"></div>
        </div>
        <div class="d-flex mb-4" style="gap: 10px;">
            <label for="fdate">Enter From Date : <input type="date" v-model="fromDate" class="form-control me-2"
                    placeholder="From Date" id="fdate" /></label>
            <label for="tdate">Enter To Date :<input type="date" v-model="toDate" class="form-control me-2"
                    placeholder="To Date" id="tdate" /></label>
            <button style="height:38px; margin-top: 24px;" class="btn filter" @click="filterLogs()">Filter</button>
        </div>

        <h4>Total Expense: {{ totalExpense }} ₹</h4>

        <table class="table table-hover table-bordered">
            <thead class="tablehead">
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
                <tr v-for="(log, index) in showLogsOnpage" :key="log._id">
                    <th>{{ (currentPage - 1) * logsPerPage + index + 1 }}</th>
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

        <div class="d-flex justify-content-center align-items-center" v-if="totalPages > 1">
            <button class="btn pagination" :disabled="currentPage === 1" @click="previousPage()">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button class="btn pagination" :disabled="currentPage === totalPages" @click="nextPage()">Next</button>
        </div>

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

let currentPage = ref(1);
let logsPerPage = 10;

onMounted(() => {
    fetchLogs();
});

let totalExpense = computed(() => {
    return filteredLogs.value.reduce((sum, log) => sum + log.price, 0);
});

let showLogsOnpage = computed(() => {
    let starting = (currentPage.value - 1) * logsPerPage;
    return filteredLogs.value.slice(starting, starting + logsPerPage);
});

let totalPages = computed(() => {
    return Math.ceil(filteredLogs.value.length / logsPerPage);
});

let previousPage = () => {
    if (currentPage.value > 1) currentPage.value--;
}

let nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
}

console.log("Vehicle ID:", vehicleId);

let fetchLogs = () => {
    axios
        .get(`http://localhost:3030/vehicle/${vehicleId}/stats`, {
            withCredentials: true,
        }).then((res) => {
            logs.value = res.data.logs.sort((previous, current) => {
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
        .sort((previous, current) => {
            return new Date(previous.date) - new Date(current.date);
        });;
};

let dateFormat = (date) => {
    let d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    return `${day}-${month}-${year}`;
}

let goBack = () => {
    router.push('/home');
};
</script>
<style scoped>
.container {
    padding: 20px;
    background-color: #D99872;
    max-width: 1400px;
    border: 1px solid transparent;
    border-radius: 10px;
}

.heading h3 {
    color: black;
}

.vnumber {
    color: whitesmoke;
    font-family: 'Times New Roman', Times, serif;
}

.backbtn {
    background-color: #544740;
    color: #ffffff;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.backbtn:hover {
    background-color: #B66E4C;
    color: white;
    border: 1px solid #544740;
}

.tablehead th {
    background-color: #544740;
    color: white;
}

.filter {
    background-color: black;
    color: white;
    height: fit-content;
}

.filter:hover {
    background-color: #B66E4C;
    color: white;
    border: 1px solid #544740;
}

.pagination {
    background-color: #544740;
    color: white;
    padding: 5px;
    margin: 5px;
    border: 1px solid black;
}

.pagination:disabled {
    background-color: darkgray;
    color: black;
}

.pagination:hover {
    background-color: #B66E4C;
    color: white;
    border: 1px solid #544740;
}
</style>