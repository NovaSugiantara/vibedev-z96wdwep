import { ref, onMounted } from 'vue'
import type { WorkoutSet } from '../types/workout'
import { loadHistory, saveHistory } from '../utils/workoutStorage'

export function useWorkoutSession() {
  const exercise = ref('')
  const currentReps = ref(0)
  const history = ref<WorkoutSet[]>([])

  onMounted(() => {
    history.value = loadHistory()
  })

  function addRep(): void {
    currentReps.value += 1
  }

  function resetCounter(): void {
    currentReps.value = 0
  }

  function finishSet(): void {
    const name = exercise.value.trim() || 'Untitled Exercise'
    const newSet: WorkoutSet = {
      id: Date.now(),
      exercise: name,
      reps: currentReps.value,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    history.value.unshift(newSet)
    saveHistory(history.value)
    currentReps.value = 0
  }

  function deleteSet(id: number): void {
    history.value = history.value.filter((s) => s.id !== id)
    saveHistory(history.value)
  }

  return {
    exercise,
    currentReps,
    history,
    addRep,
    resetCounter,
    finishSet,
    deleteSet,
  }
}