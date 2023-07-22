<template>
  <div class="home">
    <movie-carousel :movies="nowPlayingMovies" />
    <div class="home__wrapper">
      <div class="discover-movies">
        <div class="discover-movies__header">
          <div class="discover-movies__title">Discover Movies</div>
          <div class="discover-movies__order">
            <button :class="{ selected: discoveredMoviesSort === 'popularity.desc' }"
              @click="onSortChange('popularity.desc')">Popularity</button>
            <button :class="{ selected: discoveredMoviesSort === 'primary_release_date.desc' }"
              @click="onSortChange('primary_release_date.desc')">Release Date</button>
          </div>
        </div>
        <div class="discover-movies__list">
          <nuxt-link v-for="mv in discoveredMovies" :key="mv.id" class="discover-movies__item" :to="`movies/${mv.id}`">
            <movie-card :movie="mv" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MovieCarousel from '@/components/MovieCarousel'
import MovieCard from '@/components/MovieCard'
import { defineComponent, onMounted, ref } from 'vue'
import api from '@/api'
import { Movie, SortBy } from 'api/endpoints/movies'

export default defineComponent({
  name: "HomePage",
  components: { MovieCarousel, MovieCard },
  setup() {

    const discoveredMovies = reactive<Movie[]>([])
    const discoveredMoviesSort = ref<SortBy>('popularity.desc')
    const fetchDiscoveredMovies = async () => {
      const res = await api.discoverMovie(discoveredMoviesSort.value)
      discoveredMovies.splice(0, discoveredMovies.length, ...res.results.slice(0, 10))
    }

    const nowPlayingMovies = reactive<Movie[]>([])
    const fetchNowPlayingMovies = async () => {
      const res = await api.getNowPlayingMovies()
      nowPlayingMovies.splice(0, nowPlayingMovies.length, ...res.results.slice(0, 5))
    }

    onMounted(() => {
      fetchDiscoveredMovies();
      fetchNowPlayingMovies()
    })

    const onSortChange = (sort: SortBy) => {
      discoveredMoviesSort.value = sort
      fetchDiscoveredMovies()
    }


    return { discoveredMovies, onSortChange, discoveredMoviesSort, nowPlayingMovies }
  },
})
</script>

<style lang="scss" src="./home.scss" scoped></style>
