<script setup>
import NavBar from './components/NavBar.vue'
// No imports yet, will add router and components later
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
    <NavBar />
    <main class="p-4 w-full">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* No custom styles yet */
</style>
