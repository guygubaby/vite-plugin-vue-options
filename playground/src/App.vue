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
    foo: 'foo',
  }),
})

const foo = ref('foo')
</script>
