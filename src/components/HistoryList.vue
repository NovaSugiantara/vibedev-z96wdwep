<script setup lang="ts">
import type { WorkoutSet } from '../types/workout'
import HistoryRow from './HistoryRow.vue'
defineProps<{ history: WorkoutSet[]; onDelete: (id: number) => void }>()
</script>

<template>
  <section class="section">
    <h2 class="title">History</h2>
    <ul v-if="history.length" class="list">
      <HistoryRow v-for="s in history" :key="s.id" :set="s" :on-delete="onDelete" />
    </ul>
    <div v-else class="empty">
      <p class="e1">No sets logged yet</p>
      <p class="e2">Tap Done after a set to save it here</p>
    </div>
  </section>
</template>

<style scoped>
.section { width: 100%; max-width: 400px; margin: 0 auto; }
.title {
  margin-bottom: 12px;
  font-family: var(--font-body);
  font-size: .75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--muted);
}
.list { display: flex; flex-direction: column; gap: 8px; list-style: none; padding: 0; margin: 0; }
.empty {
  text-align: center;
  padding: 32px 16px;
  border: 2px dashed var(--border);
  border-radius: 16px;
}
.e1 { font-size: 1rem; font-weight: 500; color: var(--muted); margin-bottom: 4px; }
.e2 { font-size: .875rem; color: var(--muted); opacity: .7; }
</style>
