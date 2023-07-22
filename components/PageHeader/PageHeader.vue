<template>
  <header class="layout-header">
    <div class="layout-header__container">
      <nuxt-link class="layout-header__title" to="/">MovieTime</nuxt-link>
      <search-bar class="layout-header__search"/>
      <movie-category class="layout-header__menu" />
      <div class="layout-header__menu">MOVIES</div>
      <div class="layout-header__menu">TV SHOWS</div>
      <div class="layout-header__menu">LOGIN</div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style src="./PageHeader.scss" scss scoped></style>