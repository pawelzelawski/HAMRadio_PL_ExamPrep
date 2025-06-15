<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Fiszki (Flashcards)</h2>
    <div v-if="loading" class="text-center py-8">Ładowanie pytań...</div>
    <div v-else>
      <!-- Navigation Tabs: Tabs for desktop, dropdown for mobile -->
      <div class="mb-8">
        <!-- Tabs for desktop -->
        <div class="hidden sm:flex flex-wrap justify-center gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectCategory(cat)"
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
          <select v-model="selectedCategory" @change="resetIndex" class="w-full p-2 rounded border border-blue-300">
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
      </div>
      <div class="flex items-center justify-end gap-4 mb-4">
        <label class="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" v-model="showOnlyUnknown" class="accent-blue-700" @change="resetIndex" />
          Pokaż tylko nieznane
        </label>
      </div>
      <div v-if="selectedCategory && filteredQuestions.length">
        <div class="flex flex-col items-center">
          <Flashcard
            :question="filteredQuestions[currentIndex]"
            :qid="getQuestionId(selectedCategory, filteredIndexes[currentIndex])"
            :known="isKnown(getQuestionId(selectedCategory, filteredIndexes[currentIndex]))"
            @mark-known="markKnown(getQuestionId(selectedCategory, filteredIndexes[currentIndex]), $event)"
          />
          <div class="flex gap-4 mt-6">
            <button @click="prevCard" :disabled="currentIndex === 0" class="px-4 py-2 rounded bg-blue-100 text-blue-800 border border-blue-200 disabled:opacity-50">Poprzednia</button>
            <span class="text-sm text-gray-600 mt-2">{{ currentIndex + 1 }} / {{ filteredQuestions.length }}</span>
            <button @click="nextCard" :disabled="currentIndex === filteredQuestions.length - 1" class="px-4 py-2 rounded bg-blue-100 text-blue-800 border border-blue-200 disabled:opacity-50">Następna</button>
          </div>
        </div>
      </div>
      <div v-else-if="selectedCategory">
        <div class="text-center text-gray-500 mt-8">Brak fiszek do wyświetlenia.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import Flashcard from '../components/Flashcard.vue';

const questionsByCategory = ref({})
const loading = ref(true)
const selectedCategory = ref('')
const showOnlyUnknown = ref(false)
const knownMap = ref({})
const currentIndex = ref(0)

const categories = computed(() => Object.keys(questionsByCategory.value))

function getQuestionId(category, idx) {
  // Unique ID for each question (category + index)
  return `${category}__${idx}`
}

function isKnown(qid) {
  return knownMap.value[qid] === true
}

function markKnown(qid, val) {
  knownMap.value = { ...knownMap.value, [qid]: val }
  localStorage.setItem('flashcards_known', JSON.stringify(knownMap.value))
}

const filteredIndexes = computed(() => {
  if (!selectedCategory.value) return []
  const all = questionsByCategory.value[selectedCategory.value] || []
  if (!showOnlyUnknown.value) return all.map((_, idx) => idx)
  return all.map((q, idx) => (!isKnown(getQuestionId(selectedCategory.value, idx)) ? idx : null)).filter(idx => idx !== null)
})

const filteredQuestions = computed(() => {
  if (!selectedCategory.value) return []
  const all = questionsByCategory.value[selectedCategory.value] || []
  return filteredIndexes.value.map(idx => all[idx])
})

function nextCard() {
  if (currentIndex.value < filteredQuestions.value.length - 1) currentIndex.value++
}
function prevCard() {
  if (currentIndex.value > 0) currentIndex.value--
}
function resetIndex() {
  currentIndex.value = 0
}
function selectCategory(cat) {
  selectedCategory.value = cat
  resetIndex()
}

watch([selectedCategory, showOnlyUnknown], resetIndex)

onMounted(async () => {
  try {
    const res = await fetch('/questions_by_category.json')
    questionsByCategory.value = await res.json()
    selectedCategory.value = Object.keys(questionsByCategory.value)[0] || ''
    // Load knownMap from localStorage
    const saved = localStorage.getItem('flashcards_known')
    if (saved) {
      knownMap.value = JSON.parse(saved)
    }
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
