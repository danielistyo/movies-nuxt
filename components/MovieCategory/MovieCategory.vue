<template>
  <div class="categories">
    <i class="fa-solid fa-square-caret-down categories__icon"></i>
    <span class="categories__text">CATEGORIES</span>
    <div class="categories__options">
      <nuxt-link v-for="genre in genres" :key="genre.id" class="categories__option" :to="`/movies?genre_id=${genre.id}`">
        {{ genre.name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGenresStore } from '@/store/genres'
import { storeToRefs } from 'pinia';
const store = useGenresStore()
const { genres } = storeToRefs(store)
</script>

<style scss scoped src="./MovieCategory.scss"></style>