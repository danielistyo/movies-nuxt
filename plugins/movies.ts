import { useGenresStore } from '@/store/genres';

export default defineNuxtPlugin((nuxtApp) => {
  console.log(nuxtApp.store);
  return {
    provide: {
      getImages(name: string, size: 'w500' | 'original' = 'w500') {
        return `https://image.tmdb.org/t/p/${size}${name}`;
      },
      getYear(date: string) {
        return new Date(date).getFullYear();
      },
      getGenre(id: number) {
        const store = useGenresStore();
        return store.genres.find((g) => g.id === id)?.name;
      },
      getBudget(budget: number) {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });
        return formatter.format(budget);
      },
    },
  };
});
