<template>
  <header class="bg-blue-800 text-white shadow p-4 flex flex-col sm:flex-row items-center justify-between">
    <h1 class="text-2xl font-bold tracking-wide">Przygotowanie do egzaminu krótkofalarskiego</h1>
    <nav class="mt-2 sm:mt-0 flex gap-4">
      <router-link to="/knowledge" class="hover:underline">Baza pytań</router-link>
      <router-link to="/flashcards" class="hover:underline">Fiszki</router-link>
      <router-link to="/quiz" class="hover:underline">Test próbny</router-link>
    </nav>
    <button @click="toggleTheme" class="ml-4 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 transition">
      {{ isDark ? '☀️ Jasny' : '🌙 Ciemny' }}
    </button>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
})
</script>
