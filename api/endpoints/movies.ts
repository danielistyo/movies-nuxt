import { reqObj } from 'api';

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type Result<R> = {
  page: number;
  results: R;
  total_pages: number;
  total_results: number;
};

type DiscoverMovieResult = Result<Movie[]>;
type NowPlayingMovieResult = Result<Movie[]> & { dates: { maximum: string; minimum: string } };
type SearchMovieResult = Result<Movie[]>;

export type SortBy =
  | 'popularity.asc'
  | 'popularity.desc'
  | 'primary_release_date.desc'
  | 'primary_release_date.asc'
  | 'vote_average.asc'
  | 'vote_average.desc';
type Apis = {
  discoverMovie: (sort_by: SortBy, with_genres?: string) => Promise<DiscoverMovieResult>;
  getNowPlayingMovies: () => Promise<NowPlayingMovieResult>;
  searchMovies: (keyword: string) => Promise<SearchMovieResult>;
};

const apis = {
  discoverMovie(sort_by = 'popularity.desc', with_genres) {
    const params: { [key: string]: string } = {};
    if (with_genres) params.with_genres = with_genres;
    if (sort_by) params.sort_by = sort_by;
    return this.request('/discover/movie', params);
  },
  getNowPlayingMovies() {
    return this.request('/movie/now_playing');
  },
  searchMovies(keyword) {
    return this.request('/search/movie', { query: keyword });
  },
} as { request: (typeof reqObj)['request'] } & Apis;

export default apis as Apis;
