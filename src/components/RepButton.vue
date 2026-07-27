<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ onTap: () => void }>()
const bounce = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

function handleTap() {
  props.onTap()
  bounce.value = false
  void document.body.offsetHeight
  bounce.value = true
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => (bounce.value = false), 200)
}
</script>

<template>
  <button type="button" class="btn" :class="{ _: bounce }" @click="handleTap" aria-label="Add rep">
    <span class="lbl">Tap</span>
  </button>
</template>

<style scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 240px;
  min-width: 240px;
  max-width: 360px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 32px var(--accent-shadow), inset 0 -4px 12px rgba(0,0,0,.15);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
  transition: box-shadow .12s;
}
.btn:focus-visible { outline: 3px solid #3b82f6; outline-offset: 4px; }
._ { animation: pulse-in .18s cubic-bezier(.34,1.56,.64,1) both; }
.lbl {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 6vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .08em;
  pointer-events: none;
}
</style>
