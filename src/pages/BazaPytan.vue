<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Baza pytań egzaminacyjnych</h2>
    <div v-if="loading" class="text-center py-8">Ładowanie pytań...</div>
    <div v-else>
      <!-- Navigation Tabs: Tabs for desktop, dropdown for mobile -->
      <div class="mb-8">
        <!-- Tabs for desktop -->
        <div class="hidden sm:flex flex-wrap justify-center gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            class="px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition border-b-2"
            :class="[
              selectedCategory === cat
                ? 'bg-blue-700 text-white border-blue-700 shadow'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-transparent hover:bg-blue-100 dark:hover:bg-gray-700',
              'min-w-[120px]'
            ]"
          >
            {{ cat }}
          </button>
        </div>
        <!-- Dropdown for mobile -->
        <div class="sm:hidden">
          <select v-model="selectedCategory" class="w-full p-2 rounded border border-blue-300">
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
      </div>

      <!-- Questions for selected category -->
      <div v-if="selectedCategory">
        <div class="flex items-center justify-end gap-4 mb-2 mt-6">
          <button @click="expandAll = true" v-if="!allExpanded" class="text-sm px-3 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-200 transition">Rozwiń wszystkie</button>
          <button @click="expandAll = false" v-if="allExpanded" class="text-sm px-3 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-200 transition">Zwiń wszystkie</button>
        </div>
        <div>
          <QuestionCard
            v-for="(q, idx) in questionsByCategory[selectedCategory]"
            :key="idx"
            :question="q"
            :expand="expandAll"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import QuestionCard from '../components/QuestionCard.vue'

const questionsByCategory = ref({})
const loading = ref(true)
const selectedCategory = ref('')
const expandAll = ref(false)

const categories = computed(() => Object.keys(questionsByCategory.value))

const allExpanded = computed(() => expandAll.value)

watch(selectedCategory, () => {
  expandAll.value = false
})

onMounted(async () => {
  try {
    const res = await fetch('/questions_by_category.json')
    questionsByCategory.value = await res.json()
    // Set default category to the first one
    selectedCategory.value = Object.keys(questionsByCategory.value)[0] || ''
  } finally {
    loading.value = false
  }
})
</script>
