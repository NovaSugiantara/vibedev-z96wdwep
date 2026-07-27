import { ref, onMounted } from 'vue'
import type { WorkoutSet } from '../types/workout'
import { loadHistory, saveHistory } from '../utils/workoutStorage'

export function useWorkoutSession() {
  const exercise = ref('')
  const currentReps = ref(0)
  const history = ref<WorkoutSet[]>([])
  const resetting = ref(false)
  let resetTimer: ReturnType<typeof setTimeout> | null = null

  onMounted(() => {
    history.value = loadHistory()
  })

  function addRep(): void {
    currentReps.value += 1
  }

  function resetCounter(): void {
    currentReps.value = 0
    // trigger reset flash
    resetting.value = true
    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(() => (resetting.value = false), 400)
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
    resetting,
    addRep,
    resetCounter,
    finishSet,
    deleteSet,
  }
}
