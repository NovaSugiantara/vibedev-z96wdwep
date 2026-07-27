import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('renders the exercise input field', () => {
    const wrapper = mount(App)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('renders the rep counter button', () => {
    const wrapper = mount(App)
    expect(wrapper.find('button[aria-label="Add rep"]').exists()).toBe(true)
  })

  it('renders history section heading', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('History')
  })

  it('shows empty state when no sets logged', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('No sets logged yet')
  })
})
