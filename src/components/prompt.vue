<script setup lang="ts">
defineProps(['prompt'])
</script>

<template>
  <span class="prompt" v-if="prompt != null">
    <component :is="prompt"></component>
  </span>
</template>

<style scoped></style>
