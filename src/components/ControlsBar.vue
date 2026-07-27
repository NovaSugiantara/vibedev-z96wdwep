<script setup lang="ts">
defineProps<{ onDone: () => void; onReset: () => void }>()
</script>

<template>
  <div class="bar">
    <button type="button" class="btn reset" @click="onReset">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="ico">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
      </svg>
      Reset
    </button>
    <button type="button" class="btn done" @click="onDone">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="ico">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Done
    </button>
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 320px;
}
.btn {
  flex: 1;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 16px;
  font-family: var(--font-body);
  font-size: .9375rem;
  font-weight: 600;
  border-radius: 14px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
  transition: transform .1s, background .15s, box-shadow .15s;
}
.btn:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
.btn:active { transform: scale(.96); }
.ico { flex-shrink: 0; }
.reset {
  background: var(--surface);
  color: var(--muted);
  border: 1.5px solid var(--border);
  box-shadow: 0 1px 3px rgba(0,0,0,.04);
}
.reset:hover { background: var(--border); color: var(--text); }
.done {
  background: var(--done);
  color: #fff;
  border: none;
  box-shadow: 0 3px 10px var(--done-glow);
}
.done:hover { background: var(--done-hover); }
</style>
