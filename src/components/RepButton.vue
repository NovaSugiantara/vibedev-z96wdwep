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
  <button
    type="button"
    class="btn"
    :class="{ _: bounce }"
    @click="handleTap"
    aria-label="Add rep"
  >
    <span class="lbl">Tap</span>
  </button>
</template>

<style scoped>
.btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 240px;
  max-width: 360px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background:
    radial-gradient(ellipse at 35% 30%, rgba(255,255,255,.25) 0%, transparent 60%),
    radial-gradient(ellipse at 50% 60%, rgba(0,0,0,.12) 0%, transparent 50%),
    var(--accent);
  color: #fff;
  border: none;
  cursor: pointer;
  box-shadow:
    0 8px 32px var(--accent-shadow),
    inset 0 -6px 16px rgba(0,0,0,.18),
    inset 0 2px 4px rgba(255,255,255,.15);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
  transition: box-shadow .12s, transform .12s;
}
.btn:focus-visible { outline: 3px solid var(--accent); outline-offset: 4px; }
.btn:active {
  transform: scale(.96);
  box-shadow: 0 2px 8px var(--accent-shadow), inset 0 -2px 6px rgba(0,0,0,.2);
}
._ { animation: pulse-in .18s cubic-bezier(.34,1.56,.64,1) both; }
.lbl {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 7vw, 2.75rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .1em;
  pointer-events: none;
  text-shadow: 0 2px 4px rgba(0,0,0,.15);
}
</style>
