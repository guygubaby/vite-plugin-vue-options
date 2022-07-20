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
