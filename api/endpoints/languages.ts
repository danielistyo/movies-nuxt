import { reqObj } from 'api';

export type Language = {
  iso_639_1: string;
  english_name: string;
  name: string;
};

type Result = Language[];

type Apis = { getLanguages: () => Promise<Result> };

const apis = {
  getLanguages() {
    return this.request('/configuration/languages');
  },
} as { request: (typeof reqObj)['request'] } & Apis;

export default apis as Apis;
