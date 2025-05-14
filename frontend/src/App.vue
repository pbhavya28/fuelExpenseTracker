<template>
  <div id="app" class="container app-wrapper">
    <h1 class="app-title text-center mb-4">Vehicle Fuel Expense Tracker</h1>
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
  padding-bottom: 2rem;
}

/* Title styling */
.app-title {
  color: #544740;
  font-weight: bold;
}
</style>
