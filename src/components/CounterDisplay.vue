<script setup lang="ts">
interface Props {
  reps: number
}
defineProps<Props>()
</script>

<template>
  <div class="counter-display" aria-live="polite" aria-atomic="true">
    <span class="counter-num" :key="reps">{{ reps }}</span>
  </div>
</template>

<style scoped>
.counter-display {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.counter-num {
  font-family: var(--font-display);
  font-size: clamp(4rem, 20vw, 8rem);
  font-weight: 800;
  line-height: 1;
  color: var(--color-text);
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  animation: pop var(--duration-bounce) var(--ease-bounce) both;
}
@keyframes pop {
  0% { transform: scale(0.85); opacity: 0.6; }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); opacity: 1; }
}
</style>