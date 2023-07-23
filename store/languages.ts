import api from '@/api';
import { Language } from 'api/endpoints/languages';
import { defineStore } from 'pinia';

type State = {
  languages: Language[];
};
export const useLanguageStore = defineStore('languages', {
  state: (): State => ({
    languages: [],
  }),
  actions: {
    async getLanguages() {
      try {
        const res = await api.getLanguages();
        this.languages = res;
      } catch (e) {
        console.error('Error fetching languages');
      }
    },
  },
});
