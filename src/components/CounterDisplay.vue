<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  reps: number
}
const props = defineProps<Props>()

const bouncing = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

watch(() => props.reps, () => {
  bouncing.value = false
  void document.body.offsetHeight
  bouncing.value = true
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => { bouncing.value = false }, 200)
}, { flush: 'post' })
</script>

<template>
  <div class="counter-display" aria-live="polite" aria-atomic="true">
    <span class="counter-num" :class="{ bouncing }">{{ reps }}</span>
  </div>
</template>

<style scoped>
.counter-display {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
}
.counter-num {
  font-family: var(--font-display);
  font-size: clamp(4rem, 20vw, 8rem);
  font-weight: 800;
  line-height: 1;
  color: var(--color-text);
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  min-width: 0.5em;
}
.counter-num.bouncing {
  animation: pop 180ms var(--ease-bounce) both;
}
@keyframes pop {
  0%   { transform: scale(0.9); }
  50%  { transform: scale(1.06); }
  100% { transform: scale(1); }
}
</style>