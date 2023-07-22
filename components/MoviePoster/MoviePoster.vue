<template>
  <img :src="image" @error="onImageError" loading="lazy" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ src: string }>()
const image = ref(props.src)
const onImageError = function () {
  image.value = 'https://m.nesshome.com/main/data/noimage.gif'
}
</script>