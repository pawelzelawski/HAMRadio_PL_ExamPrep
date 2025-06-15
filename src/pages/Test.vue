<template>
  <div class="max-w-2xl mx-auto py-8 px-2">
    <h2 class="text-2xl font-bold mb-6 text-center tracking-tight">Test próbny (20 pytań)</h2>
    <div v-if="loading" class="text-center py-8 text-lg text-gray-600 dark:text-gray-300">Ładowanie pytań...</div>
    <div v-else>
      <form @submit.prevent="submitQuiz">
        <div v-for="(q, idx) in quizQuestions" :key="q._id" class="mb-10 p-4 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div class="font-bold text-lg mb-3 text-blue-900 dark:text-blue-200">
            {{ idx + 1 }}. {{ cleanQuestion(q.question) }}
          </div>
          <div v-if="q.images && q.images.length" class="mb-3 flex flex-wrap gap-2 justify-center">
            <img v-for="img in q.images" :key="img" :src="resolveImagePath(img)" class="max-h-32 rounded border border-gray-300 dark:border-gray-600 bg-white" :alt="'Ilustracja do pytania'" />
          </div>
          <div class="flex flex-col gap-3">
            <label
              v-for="(ans, aIdx) in q.answers"
              :key="aIdx"
              class="block cursor-pointer select-none group"
            >
              <input
                type="radio"
                :name="'q' + idx"
                :value="aIdx"
                v-model="userAnswers[idx]"
                :disabled="submitted"
                class="sr-only"
              />
              <span
                class="block w-full px-5 py-3 rounded-lg border transition text-left font-medium text-base tracking-tight focus:outline-none group-hover:ring-2 group-hover:ring-blue-200"
                :class="[
                  userAnswers[idx] === aIdx
                    ? submitted
                      ? (aIdx === q.correct
                          ? 'bg-green-600 border-green-700 text-white font-bold'
                          : 'bg-red-600 border-red-700 text-white font-bold')
                    : 'bg-blue-600 border-blue-700 text-white font-semibold'
                    : 'bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-900 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-800',
                  'shadow-sm',
                  submitted && aIdx === q.correct ? 'ring-2 ring-green-400' : '',
                  submitted && userAnswers[idx] === aIdx && aIdx !== q.correct ? 'ring-2 ring-red-400' : ''
                ]"
              >
                {{ ans }}
              </span>
            </label>
          </div>
          <div v-if="submitted" class="mt-3 text-base">
            <span v-if="userAnswers[idx] === q.correct" class="text-green-700 font-semibold">✔️ Poprawnie</span>
            <span v-else class="text-red-700 font-semibold">❌ Błędnie. Poprawna: <b>{{ q.answers[q.correct] }}</b></span>
          </div>
        </div>
        <div class="flex flex-col items-center gap-4 mt-10">
          <button
            v-if="!submitted"
            type="submit"
            class="px-8 py-3 rounded-lg bg-blue-700 text-white font-bold text-lg hover:bg-blue-800 transition shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            :disabled="userAnswers.some(a => a === null)"
          >
            Zatwierdź odpowiedzi
          </button>
          <div v-else class="text-center">
            <div class="text-2xl font-bold mb-2 text-blue-900 dark:text-blue-200">Wynik: {{ score }} / {{ quizQuestions.length }}</div>
            <button @click="restartQuiz" class="mt-2 px-6 py-2 rounded-lg bg-blue-100 text-blue-800 border border-blue-300 font-semibold hover:bg-blue-200 transition">Spróbuj ponownie</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const loading = ref(true)
const quizQuestions = ref([])
const userAnswers = ref([])
const submitted = ref(false)
const score = ref(0)

function resolveImagePath(img) {
  let file = img.replace(/^images\//, '').replace(/^\//, '')
  return `/images/${file}`
}

function cleanQuestion(q) {
  // Remove leading number and dot (e.g., '58. ...')
  return q.replace(/^\d+\.\s*/, '')
}

function shuffle(arr) {
  let a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

async function loadQuiz() {
  loading.value = true
  const res = await fetch('/questions_by_category.json')
  const byCat = await res.json()
  let all = []
  let id = 0
  for (const cat of Object.keys(byCat)) {
    const picked = shuffle(byCat[cat]).slice(0, 5)
    picked.forEach(q => {
      all.push({ ...q, _id: `${cat}__${id++}` })
    })
  }
  quizQuestions.value = shuffle(all)
  userAnswers.value = Array(quizQuestions.value.length).fill(null)
  submitted.value = false
  score.value = 0
  loading.value = false
}

function submitQuiz() {
  submitted.value = true
  let s = 0
  quizQuestions.value.forEach((q, idx) => {
    if (userAnswers.value[idx] === q.correct) s++
  })
  score.value = s
}

function restartQuiz() {
  loadQuiz()
}

onMounted(loadQuiz)
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
