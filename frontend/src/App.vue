<template>
  <div id="app" class="container app-wrapper">
    <router-link to="/home" class="logo-circle">
      <img src="/fuel.png" alt="Fuel Logo" />
    </router-link>
    <nav class="navbar">
      <h1 class="app-title mb-4 ">Vehicle Fuel Expense Tracker</h1>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
// no logic needed here for now
</script>

<style>
/* Global styles */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #D99872;
  margin: 0;
  padding: 0;
}

/* App container */
.app-wrapper {
  padding-top: 2rem;
}

/* Title styling */
.app-title {
  color: #544740;
  font-weight: bold;
}

.logo-circle {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden;
}

.logo-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}
</style>
