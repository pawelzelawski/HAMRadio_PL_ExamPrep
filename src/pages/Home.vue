<template>
  <div class="py-12 w-full">
    <h2 class="text-3xl font-bold mb-4">Przygotowanie do egzaminu krótkofalarskiego</h2>
    <p class="mb-6">Lekka aplikacja do nauki i powtórek przed polskim egzaminem krótkofalarskim. Wybierz tryb nauki:</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <router-link to="/knowledge" class="block w-full px-8 py-12 bg-blue-700 text-white rounded shadow hover:bg-blue-800 text-xl font-semibold text-center">Baza pytań</router-link>
      <router-link to="/flashcards" class="block w-full px-8 py-12 bg-green-600 text-white rounded shadow hover:bg-green-700 text-xl font-semibold text-center">Fiszki</router-link>
      <router-link to="/quiz" class="block w-full px-8 py-12 bg-purple-700 text-white rounded shadow hover:bg-purple-800 text-xl font-semibold text-center">Test próbny</router-link>
    </div>
  </div>
</template>

<script setup>
// No logic needed for now
</script>
