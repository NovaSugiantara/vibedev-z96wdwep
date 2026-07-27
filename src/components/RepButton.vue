<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  onTap: () => void
}
const props = defineProps<Props>()

const bouncing = ref(false)
let bounceTimer: ReturnType<typeof setTimeout> | null = null

function handleTap() {
  props.onTap()

  // restart bounce animation cleanly on rapid taps
  bouncing.value = false
  void document.body.offsetHeight // force reflow
  bouncing.value = true

  if (bounceTimer) clearTimeout(bounceTimer)
  bounceTimer = setTimeout(() => {
    bouncing.value = false
  }, 200)
}
</script>

<template>
  <button
    type="button"
    class="rep-button"
    :class="{ bouncing }"
    @click="handleTap"
    aria-label="Add rep"
  >
    <span class="rep-button-label">Tap</span>
  </button>
</template>

<style scoped>
.rep-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 240px;
  min-width: 240px;
  max-width: 360px;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-accent-text);
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 32px var(--color-accent-shadow),
              inset 0 -4px 12px rgba(0, 0, 0, 0.15);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
}
.rep-button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 4px;
}
/* bounce animation — 0.9 → 1.05 → 1 over 180ms */
.rep-button.bouncing {
  animation: repBounce 180ms var(--ease-bounce) both;
}
@keyframes repBounce {
  0%   { transform: scale(1); }
  35%  { transform: scale(0.9); }
  65%  { transform: scale(1.05); }
  100% { transform: scale(1); }
}
.rep-button-label {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 6vw, 2.5rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  pointer-events: none;
}
</style>