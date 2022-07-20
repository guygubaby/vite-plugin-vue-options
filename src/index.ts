import type { Plugin } from 'vite'
import type { defineComponent } from 'vue'
import MagicString from 'magic-string'

declare global {
  const defineOptions: typeof defineComponent
}

const DEFINE_OPTIONS_FN_NAME = 'defineOptions'

const OptionFnRE = /\bdefineOptions\(\W*(\{[\w\W\s\S]+\})\W*\)$/mi

const transform = (code: string, _id: string) => {
  const matches = code.match(OptionFnRE)
  if (!matches)
    return code

  const optionFnStr = matches[0]
  const optionFnBody = matches[1]
  const index = matches.index!

  const extraCode = `<script lang="ts">
export default ${optionFnBody}
</script>`

  const s = new MagicString(code)
  s.overwrite(index, index + optionFnStr.length, '')
  s.append(extraCode)

  return {
    code: s.toString(),
    map: s.generateMap(),
  }
}

const vitePluginVueOptions = (): Plugin => {
  return {
    name: 'vite-plugin-vue-options',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.vue'))
        return

      if (!code.includes(DEFINE_OPTIONS_FN_NAME))
        return

      return transform(code, id)
    },
  }
}

export {
  vitePluginVueOptions as default,
  // for testing
  transform,
}
