<script setup lang="ts">
interface Props {
  onTap: () => void
}
defineProps<Props>()
</script>

<template>
  <button
    type="button"
    class="rep-button"
    @click="onTap"
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
  transition: transform var(--duration-bounce) var(--ease-bounce),
              box-shadow var(--duration-fast) var(--ease-out);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
}
.rep-button:active {
  transform: scale(0.94);
  box-shadow: 0 2px 8px var(--color-accent-shadow),
              inset 0 -2px 6px rgba(0, 0, 0, 0.2);
}
.rep-button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 4px;
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