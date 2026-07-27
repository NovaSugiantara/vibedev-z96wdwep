<script setup lang="ts">
defineProps<{ onDone: () => void; onReset: () => void }>()
</script>

<template>
  <div class="bar">
    <button type="button" class="btn reset" @click="onReset">Reset</button>
    <button type="button" class="btn done" @click="onDone">Done</button>
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 320px;
}
.btn {
  flex: 1;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  border-radius: 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
  transition: transform .1s, background .1s, box-shadow .1s;
}
.btn:focus-visible { outline: 3px solid #3b82f6; outline-offset: 3px; }
.btn:active { transform: scale(.96); }
.reset {
  background: var(--surface);
  color: var(--muted);
  border: 1.5px solid var(--border);
}
.reset:hover { background: var(--border); color: var(--text); }
.done {
  background: var(--done);
  color: #fff;
  border: none;
  box-shadow: 0 2px 8px var(--done-glow);
}
.done:hover { background: var(--done-hover); }
</style>
