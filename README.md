# vite-plugin-vue-options

[![NPM version](https://img.shields.io/npm/v/vite-plugin-vue-options?color=a1b858&label=)](https://www.npmjs.com/package/vite-plugin-vue-options)

## Get started

```bash
pnpm i vite-plugin-vue-options
```

## Usage

1. Setup plugin in `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { VueOptions } from '../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Vue(), VueOptions()],
})
```

2. Usage in vue SFC

```html
<template>
  <div>
    foo
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'FooBar',
})

const foo = ref('foo')
</script>
```

Using `defineOptions` fn to set option api in setup script.

The code will compile to:

```html
<template>
  <div>
    foo
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const foo = ref('foo')
</script>

<script lang=ts>
export default {
  name: 'FooBar',
}
</script>
```

## License

[MIT](./LICENSE) License © 2022 [guygubaby](https://github.com/bryce-loskie)
