import { mount } from '@vue/test-utils'
import HelloWorld from '@/pages/users/SetNickname'

describe('Nickname.vue', () => {
  it('renders', () => {
    const msg = 'new message'
    const wrapper = mount(HelloWorld)
    expect(wrapper.element).toBeTruthy()
  })
})
