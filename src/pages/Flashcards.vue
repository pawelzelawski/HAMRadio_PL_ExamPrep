<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Fiszki (Flashcards)</h2>
    <div v-if="loading" class="text-center py-8">Ładowanie pytań...</div>
    <div v-else>
      <!-- Category selector label -->
      <div class="mb-2">
        <span class="text-base text-gray-700 font-medium">Wybierz kategorię fiszek:</span>
      </div>
      <!-- Category selector -->
      <div class="mb-6">
        <div class="hidden sm:flex gap-4 flex-wrap border-b border-blue-200 pb-1">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectCategory(cat)"
            :class="[
              'bg-transparent px-0 py-1 text-blue-800 hover:underline focus:outline-none transition',
              selectedCategory === cat ? 'font-bold border-b-2 border-blue-800' : 'font-normal'
            ]"
            style="min-width: 0"
          >
            {{ cat }}
          </button>
        </div>
        <div class="sm:hidden mb-4">
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
    const res = await fetch('/data/questions_by_category.json')
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
