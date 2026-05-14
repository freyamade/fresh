<script setup lang="ts">
import stdin from '@/components/stdin.vue'
import stdout from '@/components/stdout.vue'
import { onMounted, useTemplateRef } from 'vue'

const props = defineProps(['testInputs'])
const stdinRef = useTemplateRef('standardInput')

onMounted(() => {
  const stdinComponent: typeof stdin = stdinRef.value
  for (const input of props.testInputs || []) {
    // If we pass prop inputs, we should call the handleCommand function of stdin
    stdinComponent.executeCommand(input)
  }
})
</script>

<template>
  <stdout />

  <stdin ref="standardInput" />
</template>

<style>
@import '@/assets/fresh.scss';
</style>
