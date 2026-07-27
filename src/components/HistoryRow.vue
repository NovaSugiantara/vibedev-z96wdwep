<script setup lang="ts">
import type { WorkoutSet } from '../types/workout'
defineProps<{ set: WorkoutSet; onDelete: (id: number) => void }>()
</script>

<template>
  <li class="row">
    <div class="info">
      <p class="name">{{ set.exercise }}</p>
      <div class="meta">
        <span class="reps">{{ set.reps }} reps</span>
        <span class="time">{{ set.timestamp }}</span>
      </div>
    </div>
    <button type="button" class="del" @click.stop="onDelete(set.id)" aria-label="Delete set">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
      </svg>
    </button>
  </li>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
}
.info { flex: 1; min-width: 0; }
.name {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
  font-family: var(--font-mono);
  font-size: .875rem;
}
.reps { font-weight: 700; color: var(--accent); }
.time { color: var(--muted); }
.del {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: transparent;
  color: var(--danger);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background .1s, border-color .1s;
}
.del:hover { background: rgba(209,67,67,.1); border-color: rgba(209,67,67,.25); }
.del:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
.del:active { transform: scale(.95); }
</style>
