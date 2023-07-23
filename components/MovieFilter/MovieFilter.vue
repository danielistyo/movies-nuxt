<template>
  <div class="movie-filter">
    <div class="movie-filter__title">Sort Result By</div>
    <div class="movie-filter__sort">
      <movie-sort @change="onSortChange" />
    </div>
    <div class="movie-filter__title">Genres</div>
    <div class="movie-filter__genre genre-filter">
      <div class="genre-filter__item" v-for="genre in genres" :key="genre.id">
        <span>{{ genre.name }}</span>
        <input type="checkbox" @change="e => onGenreChange(e, genre.id)"
          :checked="route.query.genre_id === `${genre.id}`" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue'
import { useGenresStore } from '../../store/genres'

const emit = defineEmits<{
  sort: [payload: string],
  genre: [payload: number[]]
}>()
const onSortChange = (opt: string) => {
  emit('sort', opt)
}

const route = useRoute()

const store = useGenresStore()
const { genres } = storeToRefs(store)

const checkedGenres = ref<number[]>([])
const onGenreChange = (e: Event, id: number) => {
  if ((e.target as HTMLInputElement).checked) checkedGenres.value.push(id)
  else { checkedGenres.value.splice(0, checkedGenres.value.length, ...checkedGenres.value.filter((g) => g !== id)) }
  emit('genre', checkedGenres.value)
}
</script>

<style src="./MovieFilter.scss" scss scoped></style>