<template>
  <div>
    {{ foo }} {{ bar }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const bar = ref('bar')

defineOptions({
  name: 'FooBar',
  data: () => ({
    foo: 'foo',
  }),
})
</script>
