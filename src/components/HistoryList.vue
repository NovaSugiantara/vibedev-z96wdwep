<script setup lang="ts">
import type { WorkoutSet } from '../types/workout'
import HistoryRow from './HistoryRow.vue'

interface Props {
  history: WorkoutSet[]
  onDelete: (id: number) => void
}
defineProps<Props>()
</script>

<template>
  <section class="history-section">
    <h2 class="history-title">History</h2>
    <ul v-if="history.length > 0" class="history-list">
      <HistoryRow
        v-for="set in history"
        :key="set.id"
        :set="set"
        :onDelete="onDelete"
      />
    </ul>
    <div v-else class="history-empty">
      <p class="empty-text">No sets logged yet</p>
      <p class="empty-hint">Tap Done after a set to save it here</p>
    </div>
  </section>
</template>

<style scoped>
.history-section {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
.history-title {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  margin-bottom: var(--space-3);
  padding: 0 var(--space-1);
}
.history-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  list-style: none;
  padding: 0;
  margin: 0;
}
.history-empty {
  text-align: center;
  padding: var(--space-8) var(--space-4);
  border: 1.5px dashed var(--color-border);
  border-radius: var(--radius-xl);
}
.empty-text {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-text-muted);
  margin: 0 0 var(--space-1);
}
.empty-hint {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  opacity: 0.7;
  margin: 0;
}
</style>