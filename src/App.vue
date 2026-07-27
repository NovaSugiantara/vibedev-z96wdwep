<script setup lang="ts">
import { useWorkoutSession } from './composables/useWorkoutSession'
import ExerciseInput from './components/ExerciseInput.vue'
import CounterDisplay from './components/CounterDisplay.vue'
import RepButton from './components/RepButton.vue'
import ControlsBar from './components/ControlsBar.vue'
import HistoryList from './components/HistoryList.vue'
import './style.css'

const { exercise, currentReps, history, addRep, resetCounter, finishSet, deleteSet } =
  useWorkoutSession()
</script>

<template>
  <div class="shell">
    <header class="header">
      <ExerciseInput v-model="exercise" />
    </header>

    <main class="main">
      <CounterDisplay :reps="currentReps" />
      <RepButton :on-tap="addRep" />
      <ControlsBar :on-done="finishSet" :on-reset="resetCounter" />
    </main>

    <aside class="history">
      <HistoryList :history="history" :on-delete="deleteSet" />
    </aside>
  </div>
</template>

<style scoped>
.shell {
  max-width: 480px;
  margin: 0 auto;
  padding: 20px 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100dvh;
}
.header {
  display: flex;
  justify-content: center;
  padding: 8px 0;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
.history {
  padding-top: 8px;
}
</style>
