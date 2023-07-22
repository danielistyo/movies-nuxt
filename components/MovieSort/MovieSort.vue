<template>
  <div ref="sortEl" class="movie-sort">
    <div class="movie-sort__selected" @click="onClick">{{ selected || 'Select one' }}</div>
    <i :class="['movie-sort__icon', 'fa-solid', open ? 'fa-caret-up' : 'fa-caret-down']"></i>
    <div v-if="open" class="movie-sort__options">
      <div class="movie-sort__option" v-for="(value, id) in data" :key="id" @click="onSelected(id)">
        {{ value }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue'

const emit = defineEmits<{
  change: [sort: string]
}>()
const selected = ref('Popularity Descending')
const open = ref(false)
const data = {
  'popularity.asc': 'Popularity Ascending',
  'popularity.desc': 'Popularity Descending',
  'primary_release_date.desc': 'Release Date Ascending',
  'primary_release_date.asc': 'Release Date Descending',
  'vote_average.asc': 'Rating Ascending',
  'vote_average.desc': 'Rating Descending',
}
const onClick = () => {
  open.value = !open.value
}
const sortEl = ref<HTMLDivElement | null>(null)

const outsideClickLis = (e) => {
  if (!sortEl.value?.contains(e.target as HTMLElement)) open.value = false
}
onMounted(() => {
  window.addEventListener('click', outsideClickLis)
})
onBeforeUnmount(() => {
  window.removeEventListener('click', outsideClickLis)
})

const onSelected = (sort: string) => {
  selected.value = data[sort]
  emit('change', sort)
  open.value = false
}
</script>

<style scss src="./MovieSort.scss" scoped></style>