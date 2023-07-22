<template>
  <div class="movie-carousel">
    <div ref="listEl" class="movie-carousel__list">
      <nuxt-link :class="['movie-carousel__item', id === selected ? 'movie-carousel__item--selected' : '']"
        v-for="(mv, id) in movies" :key="id" :to="`movies/${mv.id}`">
        <movie-poster class="movie-carousel__cover" :src="$getImages(mv.poster_path)" />
        <div class="movie-carousel__item-detail">
          <div class="movie-carousel__item-rating">
            <i class="fa-solid fa-star fa-sm"></i><span>{{ mv.vote_average }}</span>
          </div>
          <div class="movie-carousel__item-title">{{ mv.title }}</div>
          <div class="movie-carousel__item-subtitle">
            {{ $getYear(mv.release_date) }}
            <i class="fa-solid fa-circle"></i>
            {{ $getGenre(mv.genre_ids[0]) }}
          </div>
          <p class="movie-carousel__item-desc">{{ mv.overview }}</p>
        </div>
      </nuxt-link>
    </div>
    <div class="movie-carousel__nav">
      <div :class="['movie-carousel__nav-item', id === selected ? 'movie-carousel__nav-item--selected' : '']"
        v-for="(mv, id) in movies" :key="id" @click="onNavClick(id)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { Movie } from '@/api/endpoints/movies';

const props = defineProps<{ movies: Movie[] }>()
const ITEM_WIDTH = 340
const selected = ref(1)
const listEl = ref<HTMLDivElement | null>(null)
const onNavClick = (id: number) => {
  if (!listEl.value) return
  selected.value = id
  const x = (window.innerWidth / 2) - (ITEM_WIDTH * id) - (ITEM_WIDTH / 2)

  listEl.value.style.transform = `translateX(${x}px)`
}

nextTick(() => {
  if (listEl.value) { listEl.value.style.transform = `translateX(${(window.innerWidth / 2) - (ITEM_WIDTH * 1.5)}px)`; }
})
</script>

<style lang="scss" src="./MovieCarousel.scss" scoped></style>