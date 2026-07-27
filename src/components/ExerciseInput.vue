<script setup lang="ts">
defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <label class="sr-only" for="n">Exercise name</label>
  <input
    id="n"
    type="text"
    class="input"
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    placeholder="Push-ups, squats, pull-ups..."
    autocomplete="off"
    spellcheck="false"
  />
</template>

<style scoped>
.input {
  width: 280px;
  max-width: 100%;
  padding: 10px 16px;
  font-family: var(--font-body);
  font-size: .9375rem;
  font-weight: 500;
  color: var(--text);
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 14px;
  outline: none;
  text-align: center;
  transition: border-color .15s, box-shadow .15s;
}
.input::placeholder {
  color: var(--muted);
  font-weight: 400;
  opacity: .7;
}
.input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}
</style>
