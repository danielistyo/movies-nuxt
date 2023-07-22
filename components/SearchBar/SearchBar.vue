<template>
  <div class="searchbar">
    <i class="fa-solid fa-clapperboard searchbar__prefix fa-sm"></i>
    <input v-model="keyword" class="searchbar__input" placeholder="Find movie" />
    <i class="fa-solid fa-magnifying-glass searchbar__suffix fa-xs"></i>
    <div v-if="keyword" class="searchbar__suggestions">
      <div v-if="loading">Loading...</div>
      <div v-if="!loading && !movies.length">Not found</div>
      <nuxt-link class="searchbar__suggestion" v-for="mv in movies" :key="mv.id" :to="`/movies/${mv.id}`"
        @click="clearSearch">
        {{ mv.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'
import { Movie } from '@/api/endpoints/movies';
import { ref, watch } from 'vue'
import api from '@/api'

const movies = ref<Movie[]>([])
const keyword = ref('')
const loading = ref(false)
const searchMovies = debounce(async () => {
  if (!keyword.value) return
  const res = await api.searchMovies(keyword.value)
  movies.value.push(...res.results.slice(0, 5))
  loading.value = false
}, 1500)
watch(keyword, () => {
  loading.value = true
  movies.value.splice(0, movies.value.length)
  searchMovies()
})
const clearSearch = () => {
  movies.value.splice(0, movies.value.length)
  keyword.value = ''
}
</script>

<style scss scoped src="./SearchBar.scss"></style>