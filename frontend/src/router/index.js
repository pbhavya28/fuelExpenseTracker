import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import HomePage from "../pages/HomePage.vue";
import AddVehicle from "../pages/AddVehicle.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/home", component: HomePage },
  { path: "/add-vehicle", component: AddVehicle }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
