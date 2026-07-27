<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ reps: number; resetting?: boolean }>()

const bounce = ref(false)
const flash = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null
let flashTimer: ReturnType<typeof setTimeout> | null = null

watch(() => props.reps, () => {
  bounce.value = false
  void document.body.offsetHeight
  bounce.value = true
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => (bounce.value = false), 200)
}, { flush: 'sync' })

watch(() => props.resetting, (v) => {
  if (!v) return
  flash.value = false
  void document.body.offsetHeight
  flash.value = true
  if (flashTimer) clearTimeout(flashTimer)
  flashTimer = setTimeout(() => (flash.value = false), 400)
})
</script>

<template>
  <div aria-live="polite" aria-atomic="true" class="wrap">
    <span class="num" :class="{ pop: bounce, flash: flash }">{{ reps }}</span>
  </div>
</template>

<style scoped>
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  padding: 8px 0;
}
.num {
  font-family: var(--font-display);
  font-size: clamp(4.5rem, 22vw, 8.5rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -.03em;
  font-variant-numeric: tabular-nums;
  color: var(--text);
  text-shadow: 0 2px 8px rgba(0,0,0,.04);
}
.pop { animation: pop-in .18s cubic-bezier(.34,1.56,.64,1) both; }
.flash { animation: flash-in .35s cubic-bezier(.34,1.56,.64,1) both; }
</style>
