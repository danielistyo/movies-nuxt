<template>
  <div class="movie-list-page">
    <div class="movie-list-page__container">
      <div class="movie-list-page__title">Movies</div>
      <div class="movie-list-page__body">
        <movie-filter class="movie-list-page__filter" @sort="onSort" @genre="onGenre" />
        <div class="movie-list-page__result">
          <nuxt-link v-for="mv in movies" :key="mv.id" class="movie-list-page__item" :to="`movies/${mv.id}`">
            <movie-card :movie="mv" />
          </nuxt-link>
          <div class="movie-list-page__loadmore">
            <button @click="onLoadmoreClick">Load More</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Movie, SortBy } from 'api/endpoints/movies';
import { defineComponent, ref } from 'vue'
import api from '@/api'

export default defineComponent({
  name: "ListPage",
  setup() {
    const movies = ref<Movie[]>([])
    const route = useRoute()
    const page = ref(1)
    const sort = ref<SortBy>('popularity.desc')
    const selectedGenres = ref<number[]>([])
    
    const fetchMovies = async (clearMovies: boolean) => {
      if (clearMovies) movies.value.splice(0, movies.value.length)
      const combinedGenres: string = [route.query.genre_id as string, ...selectedGenres.value].join('|')
      const res = await api.discoverMovie({ with_genres: combinedGenres, page: page.value, sort_by: sort.value })
      movies.value.push(...res.results)
    }
    onMounted(() => {
      fetchMovies(true)
    })
    watch(() => route.query, () => {
      fetchMovies(true)
    })
    const onLoadmoreClick = () => {
      page.value = page.value + 1
      fetchMovies(false)
    }

    const onSort = (opt: SortBy) => {
      sort.value = opt
      fetchMovies(true)
    }

    const onGenre = (genres: number[]) => {
      selectedGenres.value.splice(0, selectedGenres.value.length, ...genres)
      fetchMovies(true)
    }
    return { movies, onLoadmoreClick, onSort, onGenre }
  },
})
</script>

<style scoped scss src="./movies.scss"></style>
