import type { WorkoutSet } from '../types/workout'

const STORAGE_KEY = 'workout-history'

export function loadHistory(): WorkoutSet[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item: unknown) =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as Record<string, unknown>).id === 'number' &&
        typeof (item as Record<string, unknown>).exercise === 'string' &&
        typeof (item as Record<string, unknown>).reps === 'number' &&
        typeof (item as Record<string, unknown>).timestamp === 'string',
    ) as WorkoutSet[]
  } catch {
    return []
  }
}

export function saveHistory(history: WorkoutSet[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  } catch {
    // private browsing / full storage — silently degrade
  }
}
