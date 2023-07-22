import { reqObj } from 'api';

export type Genre = {
  id: number;
  name: string;
};

type Result<R> = {
  genres: Genre[];
};

type GenreMovieResult = Result<Genre[]>;
type Apis = { getGenres: () => Promise<GenreMovieResult> };

const apis = {
  getGenres() {
    return this.request('/genre/movie/list');
  },
} as { request: (typeof reqObj)['request'] } & Apis;

export default apis as Apis;
