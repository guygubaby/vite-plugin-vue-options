import { describe, expect, it } from 'vitest'
import { transform } from './../src/index'

const input = `
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

const foo = ref('foo1')
</script>
`

describe('test transform', () => {
  it('expect tranform works', () => {
    const res = transform(input, 'test.vue')
    const code = typeof res === 'object' ? res.code : res
    expect(code).toMatchInlineSnapshot(`
      "
      <template>
        <div>
          foo
        </div>
      </template>

      <script setup lang=\\"ts\\">
      import { ref } from 'vue'



      const foo = ref('foo1')
      </script>
      <script lang=\\"ts\\">
      export default {
        name: 'FooBar',
      }
      </script>"
    `)
  })
})
