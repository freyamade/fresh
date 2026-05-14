<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { OutputType } from '@/interfaces/output'
import { useOutputsStore } from '@/stores/outputs'
import { nextTick, onMounted } from 'vue'
import Prompt from './prompt.vue'

// Stored Data
const outputsStore = useOutputsStore()
const { outputs } = storeToRefs(outputsStore)

onMounted(() => {
  outputsStore.$subscribe(() =>
    nextTick(() => {
      document.body.scrollTo(0, document.body.scrollHeight)
    }),
  )
})
</script>

<template>
  <div id="output-wrapper">
    <template v-for="(output, i) in outputs" v-bind:key="`output-${i}`">
      <div :class="{ red: output.type === OutputType.error }" class="output-container">
        <Prompt :prompt="output.prompt" />
        <component v-if="output.type === OutputType.jsx" :is="output.content"></component>
        <span v-else-if="output.type !== OutputType.asIs">{{ output.content }}</span>
        <pre v-else>{{ output.content }}</pre>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
