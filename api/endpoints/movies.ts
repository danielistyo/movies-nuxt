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

export type SortBy =
  | 'popularity.asc'
  | 'popularity.desc'
  | 'primary_release_date.desc'
  | 'primary_release_date.asc'
  | 'vote_average.asc'
  | 'vote_average.desc';
type Apis = {
  discoverMovie: (sort_by: SortBy) => Promise<DiscoverMovieResult>;
  getNowPlayingMovies: () => Promise<NowPlayingMovieResult>;
};

const apis = {
  discoverMovie(sort_by = 'popularity.desc') {
    return this.request('/discover/movie', { sort_by });
  },
  getNowPlayingMovies() {
    return this.request('/movie/now_playing');
  },
} as { request: (typeof reqObj)['request'] } & Apis;

export default apis as Apis;
