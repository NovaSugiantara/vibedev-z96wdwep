<script setup lang="ts">
interface Props {
  modelValue: string
}
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
const props = defineProps<Props>()

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="exercise-input-wrap">
    <label for="exercise-name" class="sr-only">Exercise name</label>
    <input
      id="exercise-name"
      type="text"
      class="exercise-input"
      :value="modelValue"
      @input="onInput"
      placeholder="Exercise name"
      autocomplete="off"
      spellcheck="false"
    />
  </div>
</template>

<style scoped>
.exercise-input-wrap {
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}
.exercise-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-text);
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-xl);
  outline: none;
  transition: border-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
}
.exercise-input::placeholder {
  color: var(--color-text-muted);
  font-weight: 400;
}
.exercise-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-glow);
}
</style>