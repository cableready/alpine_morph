import { Utils } from 'cable_ready'
import Alpine from 'alpinejs'
import morph from '@alpinejs/morph'

if (!window.Alpine) {
  window.Alpine = Alpine
}

if (!window.Alpine.morph) {
  window.Alpine.plugin(morph)
}

const {
  dispatch,
  before,
  operate,
  after,
  processElements,
  safeScalar,
  assignFocus
} = Utils

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
          updating (element, toElement, childrenOnlyFn, skip) {
            if (childrenOnly) {
              childrenOnlyFn()
            }

            // shouldMorph(operation)
          },

          updated (element, toElement) {
            // didMorph(operation)
          },

          removing (element, skip) {},
          removed (element) {},

          adding (element, skip) {},
          added (element) {}
        }

        const newHtml = childrenOnly ? template.content : template.innerHTML

        window.Alpine.morph(element, newHtml, options)

        assignFocus(focusSelector)
      })

      after(parent.children[ordinal], operation)
    })
  }
}
