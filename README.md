# vite-plugin-vue-options

A compile macro to make the usage of options api in setup script in ease.

[![NPM version](https://img.shields.io/npm/v/vite-plugin-vue-options?color=a1b858&label=)](https://www.npmjs.com/package/vite-plugin-vue-options)

## Get started

```bash
pnpm i vite-plugin-vue-options
```

## Usage

1. Setup plugin in `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import VueOptions from 'vite-plugin-vue-options'

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

3. Typescript support (Optional)

```json
{
  "types": [
    "vite-plugin-vue-options"
  ]
}
```

Then you can use `defineOptions` with type emits.

## License

[MIT](./LICENSE) License © 2022 [guygubaby](https://github.com/guygubaby)
