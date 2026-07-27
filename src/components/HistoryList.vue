<script setup lang="ts">
import type { WorkoutSet } from '../types/workout'
import HistoryRow from './HistoryRow.vue'
defineProps<{ history: WorkoutSet[]; onDelete: (id: number) => void }>()
</script>

<template>
  <section class="section">
    <h2 class="title">History</h2>

    <TransitionGroup v-if="history.length" name="row" tag="ul" class="list">
      <HistoryRow v-for="s in history" :key="s.id" :set="s" :on-delete="onDelete" />
    </TransitionGroup>

    <div v-else class="empty">
      <p class="e1">No sets logged yet</p>
      <p class="e2">Tap <strong>Done</strong> after a set to save it</p>
    </div>
  </section>
</template>

<style scoped>
.section { width: 100%; max-width: 400px; margin: 0 auto; }
.title {
  margin-bottom: 10px;
  padding: 0 2px;
  font-family: var(--font-body);
  font-size: .6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: var(--muted);
}
.list { display: flex; flex-direction: column; gap: 8px; list-style: none; padding: 0; margin: 0; }
.empty {
  text-align: center;
  padding: 36px 16px 32px;
  border: 2px dashed var(--border);
  border-radius: 16px;
}
.e1 { font-size: 1rem; font-weight: 500; color: var(--muted); margin-bottom: 6px; }
.e2 { font-size: .8125rem; color: var(--muted); opacity: .65; }
.e2 strong { font-weight: 600; color: var(--text); opacity: .85; }

/* TransitionGroup classes */
.row-enter-active { animation: slide-in .25s cubic-bezier(.16,1,.3,1) both; }
.row-leave-active { animation: slide-out .2s cubic-bezier(.16,1,.3,1) both; position: absolute; }
.row-move { transition: transform .25s cubic-bezier(.16,1,.3,1); }
</style>
