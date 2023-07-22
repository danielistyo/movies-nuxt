<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGenresStore } from '@/store/genres'
useHead({
  script: [{ src: "https://kit.fontawesome.com/18a0e38651.js", crossorigin: 'anonymous' }]
})
onMounted(() => {
  const { getGenres } = useGenresStore()
  getGenres()
})
</script>

<style src="./public/index.css"></style>