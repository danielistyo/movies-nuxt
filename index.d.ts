declare module '#app' {
  interface NuxtApp {
    $getImages(name: string, size: '500' | 'original' = '500'): string;
    $getYear(date: string): string;
    $getGenre(id: number): string;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $getImages(name: string, size: '500' | 'original' = '500'): string;
    $getYear(date: string): string;
    $getGenre(id: number): string;
  }
}

export {};
