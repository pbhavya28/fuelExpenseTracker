


import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import HomePage from "../pages/HomePage.vue";
import AddVehicle from "../pages/AddVehicle.vue";
import FuelLogPage from "../pages/FuelLogPage.vue";  // Import the FuelLogPage component

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/home", component: HomePage },
  { path: "/add-vehicle", component: AddVehicle },
  { path: "/vehicle/:id/fuel-log", component: FuelLogPage, name: "FuelLogPage" }, 
];



export default createRouter({
  history: createWebHistory(),
  routes,
});
