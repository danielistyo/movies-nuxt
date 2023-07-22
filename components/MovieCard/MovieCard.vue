<template>
  <div class="movie-card">
    <div class="movie-card__rating">{{ movie.vote_average }}</div>
    <movie-poster class="movie-card__cover" :src="$getImages(movie.poster_path)" />
    <div class="movie-card__title" :title="movie.title">{{ movie.title }}</div>
    <div class="movie-card__year">{{ $getYear(movie.release_date) }}</div>
    <div class="movie-detail">
      <div class="movie-detail__rating"><i class="fa-solid fa-star"></i> {{ movie.vote_average }}</div>
      <div class="movie-detail__genre">{{ $getGenre(movie.genre_ids[0]) }}</div>
      <button class="movie-detail__view">VIEW</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Movie } from '@/api/endpoints/movies';
const props = defineProps<{ movie: Movie }>();
</script>

<style lang="scss" src="./MovieCard.scss" scoped></style>
