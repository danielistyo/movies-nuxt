<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGenresStore } from '@/store/genres'
import { useLanguageStore } from '@/store/languages';
useHead({
  script: [{ src: "https://kit.fontawesome.com/18a0e38651.js", crossorigin: 'anonymous' }]
})
const { getGenres } = useGenresStore()
const { getLanguages } = useLanguageStore()
onMounted(() => {
  getGenres()
  getLanguages()
})
</script>

<style src="./public/index.css"></style>