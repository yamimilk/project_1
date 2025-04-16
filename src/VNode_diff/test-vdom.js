import { h, mount, patch } from './diff'

export function testVDOM() {
  const prevVNode = h('div', { id: 'app' }, [
    h('p', null, 'hello'),
    h('p', null, 'world')
  ])

  const nextVNode = h('div', { id: 'app', class: 'container' }, [
    h('p', null, 'hello'),
    h('p', null, 'vue3')
  ])

  mount(prevVNode, document.body)

  setTimeout(() => {
    patch(prevVNode, nextVNode)
  }, 2000)
}
