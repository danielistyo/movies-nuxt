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
  genres: { id: number; name: string }[];
  status?: number;
  budget?: number;
  production_companies?: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
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
  discoverMovie: (params: { sort_by?: SortBy; with_genres?: string; page?: number }) => Promise<DiscoverMovieResult>;
  getMovieById: (id: string) => Promise<Movie>;
  getNowPlayingMovies: () => Promise<NowPlayingMovieResult>;
  searchMovies: (keyword: string) => Promise<SearchMovieResult>;
};

const apis = {
  discoverMovie({ sort_by, with_genres, page = 1 }) {
    const params: { [key: string]: string } = {};
    if (with_genres) params.with_genres = with_genres;
    if (sort_by) params.sort_by = sort_by;
    if (page) params.page = `${page}`;
    return this.request('/discover/movie', params);
  },
  getNowPlayingMovies() {
    return this.request('/movie/now_playing');
  },
  searchMovies(keyword) {
    return this.request('/search/movie', { query: keyword });
  },
  getMovieById(id) {
    return this.request('/movie/' + id);
  },
} as { request: (typeof reqObj)['request'] } & Apis;

export default apis as Apis;
