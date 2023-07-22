<template>
  <header class="layout-header">
    <div class="layout-header__container">
      <nuxt-link class="layout-header__title" to="/">MovieTime</nuxt-link>
      <search-bar class="layout-header__search"/>
      <movie-category class="layout-header__menu" />
      <nuxt-link class="layout-header__menu" to="/movies">MOVIES</nuxt-link>
      <div class="layout-header__menu">TV SHOWS</div>
      <div class="layout-header__menu">LOGIN</div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style src="./PageHeader.scss" scss scoped></style>