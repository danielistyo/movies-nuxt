<template>
  <div class="detail-page">
    <div class="detail-page__header">
      <img class="detail-page__header-cover" :src="$getImages(movie?.backdrop_path || '', 'original')" />
      <div class="detail-page__background-detail"></div>
      <div class="detail-page__header-container">
        <img class="detail-page__poster" :src="$getImages(movie?.poster_path || '')">
        <div class="detail-page__details">
          <div class="detail-page__details-main">
            <div class="detail-page__year">{{ $getYear(movie?.release_date || '') }}</div>
            <div class="detail-page__title">{{ movie?.title }}</div>
            <div class="detail-page__genre">{{ movieGenres }}</div>
          </div>
          <div class="detail-page__more-details">
            <div class="detail-page__rating">
              <i class="fa-solid fa-star fa-xl"></i>
              {{ Number(movie?.vote_average).toFixed(1) || '0' }}
            </div>
            <div class="detail-page__score">
              <div class="detail-page__more-details-title">USER SCORE</div>
              <div class="detail-page__more-details-value">{{ movie?.vote_count || '0' }} VOTES</div>
            </div>
            <div class="detail-page__status">
              <div class="detail-page__more-details-title">STATUS</div>
              <div class="detail-page__more-details-value">{{ movie?.status || '-' }}</div>
            </div>
            <div class="detail-page__language">
              <div class="detail-page__more-details-title">LANGUAGE</div>
              <div class="detail-page__more-details-value">{{ movieLang }}</div>
            </div>
            <div class="detail-page__budget">
              <div class="detail-page__more-details-title">BUDGET</div>
              <div class="detail-page__more-details-value">{{ $getBudget(movie?.budget || 0) }}</div>
            </div>
            <div class="detail-page__production">
              <div class="detail-page__more-details-title">PRODUCTION</div>
              <div class="detail-page__more-details-value">{{ production }}</div>
            </div>
          </div>

          <div class="detail-page__overview">
            <h4 class="detail-page__overview-title">OVERVIEW</h4>
            {{ movie?.overview || '-' }}
          </div>
        </div>
      </div>
    </div>
    <div class="detail-page__body">
      <h4 class="detail-page__review-title">REVIEWS</h4>
      <div class="detail-page__review">
        <div class="review" v-for="(review, id) in reviews.slice(0, 2)" :key="review.id">
          <div class="review__header">
            <img class="review__author" :src="$getImages(review.author_details.avatar_path)" />
            <div class="review__detail">
              <div class="review__name">{{ review.author }}</div>
              <div class="review__date">{{ $getDate(review.created_at) }}</div>
            </div>
            <div class="review__rating">
              <i class="fa-solid fa-star fa-2xs"></i>
              <div class="review__rating-number">{{ review.author_details.rating }}</div>
            </div>
          </div>
          <div class="review__text">
            {{ review.content }}
          </div>
        </div>
      </div>
    </div>
    <div class="detail-page__recommendation">
      <div class="detail-page__recommendation-container">
        <h4 class="detail-page__recommendation-title">RECOMMENDATION MOVIES</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from '@/api';
import { Movie, MovieReview } from 'api/endpoints/movies';
import { useLanguageStore } from '@/store/languages';
import { defineComponent, ref, computed, onMounted } from 'vue'

export default defineComponent({
  name: "DetailPage",
  setup() {
    const route = useRoute()
    const movie = ref<Movie>()
    const movieGenres = computed(() => {
      return movie.value?.genres?.map(g => g.name).join(", ")
    })
    const movieLang = computed(() => {
      const { languages } = useLanguageStore()
      console.log(languages)
      return languages.find(l => l.iso_639_1 === movie.value?.original_language)?.english_name || "No lang"
    })
    const fetchMovie = async () => {
      if (route.params?.id) {
        const res = await api.getMovieById(route.params.id as string)
        movie.value = { ...res }
      }
    }
    const reviews = ref<MovieReview[]>([])
    const fetchReview = async () => {
      const res = await api.getReview(route.params.id as string)
      reviews.value.push(...res.results)
    }
    onMounted(() => {
      fetchMovie();
      fetchReview();
    })

    const production = computed(() => {
      if (!movie.value?.production_companies?.length) return '-'

      return movie.value?.production_companies[0].name
    })

    onMounted(() => {
      const root = document.querySelector(':root');
      (root as HTMLElement).style.setProperty('--bgColor', `#fff`)
    })
    onBeforeUnmount(() => {
      const root = document.querySelector(':root');
      (root as HTMLElement).style.setProperty('--bgColor', `#1f232b`)
    })

    return { movie, movieGenres, movieLang, production, reviews }
  },
})
</script>

<style src="./detail.scss" scss scoped></style>