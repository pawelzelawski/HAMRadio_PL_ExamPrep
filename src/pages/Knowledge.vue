<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Baza pytań egzaminacyjnych</h2>
    <div v-if="loading" class="text-center py-8">Ładowanie pytań...</div>
    <div v-else>
      <div v-for="(questions, category) in questionsByCategory" :key="category" class="mb-8">
        <h3 class="text-xl font-semibold mb-2 mt-6">{{ category }}</h3>
        <div>
          <QuestionCard v-for="(q, idx) in questions" :key="idx" :question="q" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QuestionCard from '../components/QuestionCard.vue'

const questionsByCategory = ref({})
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('/data/questions_by_category.json')
    questionsByCategory.value = await res.json()
  } finally {
    loading.value = false
  }
})
</script>
