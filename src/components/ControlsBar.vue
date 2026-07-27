<script setup lang="ts">
interface Props {
  onDone: () => void
  onReset: () => void
}
defineProps<Props>()
</script>

<template>
  <div class="controls-bar">
    <button
      type="button"
      class="btn btn-reset"
      @click="onReset"
    >
      Reset
    </button>
    <button
      type="button"
      class="btn btn-done"
      @click="onDone"
    >
      Done
    </button>
  </div>
</template>

<style scoped>
.controls-bar {
  display: flex;
  gap: var(--space-4);
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}
.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 600;
  border-radius: var(--radius-xl);
  border: none;
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out),
              background var(--duration-fast) var(--ease-out);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
  min-height: 48px;
}
.btn:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}
.btn:active {
  transform: scale(0.96);
}
.btn-reset {
  background: var(--color-surface);
  color: var(--color-text-muted);
  border: 1.5px solid var(--color-border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
.btn-reset:hover {
  background: var(--color-border);
  color: var(--color-text);
}
.btn-done {
  background: var(--color-done);
  color: var(--color-done-text);
  box-shadow: 0 2px 8px var(--color-done-shadow);
}
.btn-done:hover {
  background: var(--color-done-hover);
}
</style>