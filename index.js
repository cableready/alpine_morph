import { Utils } from 'cable_ready'

if (!window.Alpine) {
  import Alpine from 'alpinejs'
  window.Alpine = Alpine
}

if (!window.Alpine.morph) {
  import morph from '@alpinejs/morph'
  window.Alpine.plugin(morph)
}

const { dispatch, before, operate, after, processElements } = Utils

export default {
  alpineMorph: operation => {
    processElements(operation, element => {
      const { html } = operation
      const template = document.createElement('template')

      template.innerHTML = String(safeScalar(html)).trim()
      operation.content = template.content

      const parent = element.parentElement
      const ordinal = Array.from(parent.children).indexOf(element)

      before(element, operation)

      operate(operation, () => {
        const { childrenOnly, focusSelector } = operation

        const options = {
          // childrenOnly: !!childrenOnly,
          // onBeforeElUpdated: shouldMorph(operation),
          // onElUpdated: didMorph(operation)
        }

        const newHtml = childrenOnly ? template.content : template.innerHTML

        Alpine.morph(element, newHtml, options)

        assignFocus(focusSelector)
      })

      after(parent.children[ordinal], operation)
    })
  }
}
