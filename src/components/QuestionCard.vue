<template>
  <div class="mb-4">
    <button @click="open = !open" class="w-full flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-4 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition">
      <span class="font-medium text-left">{{ question.question }}</span>
      <span class="ml-2">{{ open ? '▲' : '▼' }}</span>
    </button>
    <div v-if="open" class="mt-2 px-4 pb-2">
      <ul class="list-disc pl-6">
        <li v-for="(ans, idx) in question.answers" :key="idx" :class="{'font-bold text-green-700 dark:text-green-400': idx === question.correct}">
          {{ ans }}
        </li>
      </ul>
      <div v-if="question.images && question.images.length" class="mt-2 flex flex-wrap gap-2">
        <img v-if="question.images[0]" :src="resolveImagePath(question.images[0])"
          class="w-auto h-auto rounded border"
          :alt="'Ilustracja do pytania'"
          @error="onImgError($event, question.images[0])" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({ question: Object, expand: Boolean })
const open = ref(false)

watch(() => props.expand, (val) => {
  open.value = !!val
})

function resolveImagePath(img) {
  // Remove any leading 'images/' or '/' from the path, then prepend '/images/'
  let file = img.replace(/^images\//, '').replace(/^\//, '')
  return `/images/${file}`
}

function onImgError(event, img) {
  event.target.style.display = 'none'
  // Optionally, log missing image
  // console.warn('Missing image:', img)
}
</script>
