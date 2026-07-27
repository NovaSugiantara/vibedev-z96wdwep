<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ reps: number }>()
const bounce = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

watch(() => props.reps, () => {
  bounce.value = false
  void document.body.offsetHeight
  bounce.value = true
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => (bounce.value = false), 200)
}, { flush: 'sync' })
</script>

<template>
  <div aria-live="polite" aria-atomic="true" class="wrap">
    <span class="num" :class="{ _: bounce }">{{ reps }}</span>
  </div>
</template>

<style scoped>
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
}
.num {
  font-family: var(--font-display);
  font-size: clamp(4rem, 20vw, 8rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -.03em;
  font-variant-numeric: tabular-nums;
}
._ { animation: pop-in .18s cubic-bezier(.34,1.56,.64,1) both; }
</style>
