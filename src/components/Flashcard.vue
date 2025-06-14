<template>
  <div class="flex flex-col items-center w-full">
    <div class="flip-card-outer" :style="{ height: cardHeight + 'px' }">
      <div class="flip-card-inner" :class="{ flipped }" @click="flip">
        <div class="flip-card-front card-surface" ref="front">
          <div class="font-medium text-lg mb-4 text-center break-words">{{ question.question }}</div>
          <div v-if="question.images && question.images.length" class="mb-4 flex flex-wrap gap-2 justify-center">
            <img v-for="img in question.images" :key="img" :src="resolveImagePath(img)" class="max-h-40 rounded border" :alt="'Ilustracja do pytania'" />
          </div>
          <ul class="list-disc pl-6 text-left w-full space-y-2">
            <li v-for="(ans, idx) in question.answers" :key="idx" class="break-words text-base">
              {{ ans }}
            </li>
          </ul>
          <div class="text-xs text-gray-400 mt-4">Kliknij, aby zobaczyć odpowiedź</div>
        </div>
        <div class="flip-card-back card-surface flex flex-col items-center justify-center" :style="{ minHeight: frontHeight ? frontHeight + 'px' : undefined }">
          <div class="font-semibold text-lg mb-4 text-center">Poprawna odpowiedź:</div>
          <div class="text-green-700 font-bold text-xl text-center mb-4 break-words">
            {{ question.answers[question.correct] }}
          </div>
          <div class="text-xs text-gray-400 mt-4">Kliknij, aby wrócić do pytania</div>
        </div>
      </div>
    </div>
    <div class="flex justify-center gap-2 mt-8 w-full">
      <button @click.stop="setKnown(true)" :class="['px-3 py-2 rounded text-sm', known ? 'bg-green-200 text-green-800 border border-green-400' : 'bg-gray-100 text-gray-700 border border-gray-300']">Znam</button>
      <button @click.stop="setKnown(false)" :class="['px-3 py-2 rounded text-sm', !known ? 'bg-red-200 text-red-800 border border-red-400' : 'bg-gray-100 text-gray-700 border border-gray-300']">Nie znam</button>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
const props = defineProps({
  question: Object,
  qid: String,
  known: Boolean
})
const emit = defineEmits(['mark-known'])
const flipped = ref(false)
const front = ref(null)
const frontHeight = ref(null)
const cardHeight = ref(200)
function flip() {
  flipped.value = !flipped.value
  nextTick(updateHeights)
}
function setKnown(val) { emit('mark-known', val) }
function resolveImagePath(img) {
  let file = img.replace(/^images\//, '').replace(/^\//, '')
  return `/images/${file}`
}
function updateHeights() {
  nextTick(() => {
    const frontH = front.value ? front.value.offsetHeight : 0
    frontHeight.value = frontH
    // For flip animation, set cardHeight to the tallest side
    const back = document.querySelector('.flip-card-back')
    const backH = back ? back.offsetHeight : 0
    cardHeight.value = Math.max(frontH, backH, 180)
  })
}
watch(() => props.qid, () => {
  flipped.value = false
  nextTick(updateHeights)
})
onMounted(() => {
  nextTick(updateHeights)
})
watch(flipped, () => {
  nextTick(updateHeights)
})
</script>

<style scoped>
.flip-card-outer {
  perspective: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 180px;
  transition: height 0.3s cubic-bezier(.4,2,.6,1);
}
.flip-card-inner {
  transition: transform 0.5s;
  transform-style: preserve-3d;
  width: 90vw;
  max-width: 600px;
  min-width: 320px;
  margin: 0 auto;
  display: block;
  cursor: pointer;
  position: relative;
  height: 100%;
}
.card-surface {
  background: #fff;
  color: #222;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  width: 100%;
  min-height: 180px;
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  transition: box-shadow 0.2s;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  backface-visibility: hidden;
}
.flip-card-front {
  z-index: 2;
}
.flip-card-back {
  transform: rotateY(180deg);
  z-index: 3;
}
.flip-card-inner.flipped {
  transform: rotateY(180deg);
}
@media (max-width: 600px) {
  .card-surface {
    min-width: 0;
    max-width: 98vw;
    padding: 1rem 0.5rem;
  }
  .flip-card-inner {
    min-width: 0;
    width: 98vw;
    max-width: 98vw;
  }
}
</style>
