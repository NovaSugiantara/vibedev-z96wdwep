<script setup lang="ts">
import { useWorkoutSession } from './composables/useWorkoutSession'
import ExerciseInput from './components/ExerciseInput.vue'
import CounterDisplay from './components/CounterDisplay.vue'
import RepButton from './components/RepButton.vue'
import ControlsBar from './components/ControlsBar.vue'
import HistoryList from './components/HistoryList.vue'

const {
  exercise,
  currentReps,
  history,
  addRep,
  resetCounter,
  finishSet,
  deleteSet,
} = useWorkoutSession()
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <ExerciseInput v-model="exercise" />
    </header>

    <main class="app-main">
      <div class="counter-area">
        <CounterDisplay :reps="currentReps" />
        <RepButton :onTap="addRep" />
      </div>

      <ControlsBar
        :onDone="finishSet"
        :onReset="resetCounter"
      />
    </main>

    <aside class="app-history">
      <HistoryList
        :history="history"
        :onDelete="deleteSet"
      />
    </aside>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  max-width: 480px;
  margin: 0 auto;
  padding: var(--space-5) var(--space-4) var(--space-8);
  gap: var(--space-6);
}

.app-header {
  display: flex;
  justify-content: center;
  padding: var(--space-2) 0;
}

.app-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-5);
  flex: 1 0 auto;
}

.counter-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  width: 100%;
}

.app-history {
  flex: 0 1 auto;
  padding-top: var(--space-2);
}
</style>