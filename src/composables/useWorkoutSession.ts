import { ref, onMounted, onUnmounted } from 'vue'
import type { WorkoutSet } from '../types/workout'
import { loadHistory, saveHistory } from '../utils/workoutStorage'

const MAX_EXERCISE_LENGTH = 100

export interface WorkoutSession {
  exercise: import('vue').Ref<string>
  currentReps: import('vue').Ref<number>
  history: import('vue').Ref<WorkoutSet[]>
  resetting: import('vue').Ref<boolean>
  addRep: () => void
  resetCounter: () => void
  finishSet: () => void
  deleteSet: (id: number) => void
}

export function useWorkoutSession(): WorkoutSession {
  const exercise = ref('')
  const currentReps = ref(0)
  const history = ref<WorkoutSet[]>([])
  const resetting = ref(false)
  let resetTimer: ReturnType<typeof setTimeout> | null = null

  onMounted(() => {
    history.value = loadHistory()
  })

  onUnmounted(() => {
    if (resetTimer) clearTimeout(resetTimer)
  })

  function addRep(): void {
    currentReps.value += 1
  }

  function resetCounter(): void {
    currentReps.value = 0
    resetting.value = true
    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(() => (resetting.value = false), 400)
  }

  function finishSet(): void {
    const name = (exercise.value || '').trim()
    if (!name) {
      exercise.value = ''
    }
    const safeName = name.slice(0, MAX_EXERCISE_LENGTH) || 'Untitled Exercise'
    const newSet: WorkoutSet = {
      id: Date.now(),
      exercise: safeName,
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
