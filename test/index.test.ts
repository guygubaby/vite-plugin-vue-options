import { describe, expect, it } from 'vitest'
import { transform } from './../src/transform'

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
  data: () => ({
    foo: ref('foo'),
  }),
  methods: {
    foo() {
      console.log('foo')
    }
  }
})

const foo = ref('foo1')
</script>
`

describe('test transform', () => {
  it('expect tranform works', () => {
    const res = transform(input, 'test.vue')
    const code = typeof res === 'object' ? res.code : res
    expect(code).toMatchInlineSnapshot(`
      "<script lang=\\"ts\\">
        export default {
        name: 'FooBar',
        data: () => ({
          foo: ref('foo'),
        }),
        methods: {
          foo() {
            console.log('foo')
          }
        }
      }
      </script>

      <template>
        <div>
          foo
        </div>
      </template>

      <script setup lang=\\"ts\\">
      import { ref } from 'vue'



      const foo = ref('foo1')
      </script>
      "
    `)
  })
})
