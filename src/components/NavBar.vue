<template>
  <header class="bg-blue-800 text-white shadow p-4 flex flex-col sm:flex-row items-center justify-between">
    <!-- Mobile layout -->
    <div class="flex w-full items-center sm:hidden relative">
      <!-- Hamburger left -->
      <button @click="showMenu = !showMenu" class="p-2 focus:outline-none z-10" aria-label="Menu">
        <svg v-if="!showMenu" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <!-- Centered clickable title -->
      <router-link to="/" class="absolute left-1/2 -translate-x-1/2 text-center text-2xl font-bold tracking-wide text-white hover:text-yellow-300 transition-colors z-0 w-max">
        Egzamin KF
      </router-link>
      <!-- Theme switcher right -->
      <div class="ml-auto flex items-center z-10">
        <button @click="toggleTheme" class="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition flex items-center justify-center ml-2" aria-label="Przełącz motyw">
          <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.7" />
            <g stroke="currentColor" stroke-width="2">
              <line x1="12" y1="2" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="2" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </g>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.7" />
          </svg>
        </button>
      </div>
    </div>
    <!-- Desktop layout -->
    <div class="hidden sm:flex w-full items-center justify-between">
      <router-link to="/" class="text-2xl font-bold tracking-wide text-white hover:text-yellow-300 transition-colors" style="text-decoration: none;">Egzamin KF</router-link>
      <nav class="mt-2 sm:mt-0 gap-4 hidden sm:flex items-center">
        <router-link to="/baza-pytan" class="hover:underline text-blue-200 hover:text-yellow-300 transition-colors">Baza pytań</router-link>
        <router-link to="/fiszki" class="hover:underline text-blue-200 hover:text-yellow-300 transition-colors">Fiszki</router-link>
        <router-link to="/test" class="hover:underline text-blue-200 hover:text-yellow-300 transition-colors">Test próbny</router-link>
        <router-link to="/nauka" class="hover:underline text-blue-200 hover:text-yellow-300 transition-colors">Nauka</router-link>
        <button v-if="showInstall" @click="installPWA" class="flex items-center gap-1 px-3 py-1 rounded text-blue-900 bg-yellow-300 hover:bg-yellow-200 font-semibold transition-colors" style="margin-left: 0.5rem;">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v12m0 0l-4-4m4 4l4-4m-4 4V4" /></svg>
          Zainstaluj
        </button>
      </nav>
      <div class="flex items-center">
        <button @click="toggleTheme" class="ml-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition flex items-center justify-center" aria-label="Przełącz motyw">
          <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.7" />
            <g stroke="currentColor" stroke-width="2">
              <line x1="12" y1="2" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="2" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </g>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.7" />
          </svg>
        </button>
      </div>
    </div>
    <!-- Mobile menu dropdown -->
    <nav v-if="showMenu" class="flex flex-col gap-2 mt-4 sm:hidden w-full bg-blue-900 rounded shadow z-50">
      <router-link @click="showMenu = false" to="/baza-pytan" class="block px-4 py-2 hover:bg-blue-700 text-blue-200 hover:text-yellow-300 transition-colors">Baza pytań</router-link>
      <router-link @click="showMenu = false" to="/fiszki" class="block px-4 py-2 hover:bg-blue-700 text-blue-200 hover:text-yellow-300 transition-colors">Fiszki</router-link>
      <router-link @click="showMenu = false" to="/test" class="block px-4 py-2 hover:bg-blue-700 text-blue-200 hover:text-yellow-300 transition-colors">Test próbny</router-link>
      <router-link @click="showMenu = false" to="/nauka" class="block px-4 py-2 hover:bg-blue-700 text-blue-200 hover:text-yellow-300 transition-colors">Nauka</router-link>
      <button @click="installPWA" class="block w-full px-4 py-2 mt-2 rounded bg-yellow-300 text-blue-900 font-semibold shadow hover:bg-yellow-200 transition flex items-center gap-2 justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v12m0 0l-4-4m4 4l4-4m-4 4V4" /></svg>
        Zainstaluj
      </button>
    </nav>
  </header>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const isDark = ref(false)
const showMenu = ref(false)
const deferredPrompt = ref(null)
const showInstall = ref(true) // Always show install button

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

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    showInstall.value = true
  })
})

function installPWA() {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    deferredPrompt.value.userChoice.then(() => {
      deferredPrompt.value = null
      showInstall.value = false
    })
  } else {
    alert('Aby zainstalować aplikację, użyj opcji „Zainstaluj” lub „Dodaj do ekranu głównego” w menu przeglądarki.');
  }
}
</script>
