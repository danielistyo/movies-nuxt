import api from '@/api';
import { Genre } from 'api/endpoints/genres';
import { defineStore } from 'pinia';

type State = {
  genres: Genre[];
};
export const useGenresStore = defineStore('genres', {
  state: (): State => ({
    genres: [],
  }),
  actions: {
    async getGenres() {
      try {
        const res = await api.getGenres();
        this.genres = res.genres;
      } catch (e) {
        console.error('Error fetching genres');
      }
    },
  },
});
