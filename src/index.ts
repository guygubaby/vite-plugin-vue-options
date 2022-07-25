import type { Plugin } from 'vite'
import type { defineComponent } from 'vue'
import { transform } from './transform'

declare global {
  const defineOptions: typeof defineComponent
}

const vitePluginVueOptions = (): Plugin => {
  return {
    name: 'vite-plugin-vue-options',
    enforce: 'pre',
    transform,
  }
}

export default vitePluginVueOptions
