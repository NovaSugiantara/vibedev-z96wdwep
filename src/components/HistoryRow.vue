<script setup lang="ts">
import type { WorkoutSet } from '../types/workout'
interface Props {
  set: WorkoutSet
  onDelete: (id: number) => void
}
defineProps<Props>()
</script>

<template>
  <li class="history-row" @click.stop>
    <div class="history-info">
      <p class="history-exercise">{{ set.exercise }}</p>
      <p class="history-meta">
        <span class="history-reps">{{ set.reps }} reps</span>
        <span class="history-time">{{ set.timestamp }}</span>
      </p>
    </div>
    <button
      type="button"
      class="delete-btn"
      @click.stop="onDelete(set.id)"
      aria-label="Delete set"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    </button>
  </li>
</template>

<style scoped>
.history-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-4);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  gap: var(--space-4);
  transition: transform var(--duration-fast) var(--ease-out), opacity var(--duration-fast) var(--ease-out);
}
.history-row.deleting {
  transform: translateX(-100%);
  opacity: 0;
}
.history-info {
  flex: 1;
  min-width: 0;
}
.history-exercise {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.history-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-1);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}
.history-reps {
  font-weight: 700;
  color: var(--color-accent);
}
.history-time {
  font-weight: 400;
}
.delete-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-danger);
  border: 1px solid transparent;
  transition: background var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out);
}
.delete-btn:hover {
  background: var(--color-danger-bg);
  border-color: var(--color-danger-border);
}
.delete-btn:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
.delete-btn:active {
  transform: scale(0.95);
}
</style>