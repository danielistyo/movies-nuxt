import movies from './endpoints/movies';
import genres from './endpoints/genres';

const BASE_URL = 'https://api.themoviedb.org/3';

// only support GET
export const reqObj = {
  request<R>(path: string, params?: { [key: string]: string }): Promise<R> {
    let res: Promise<Response> | null = null;

    const combinedParams: { [key: string]: string } = {
      ...params,
      api_key: '958e8d6c6c49bcc9e0ae5aab01192167',
    };

    const queries = new URLSearchParams(combinedParams);
    res = fetch(`${BASE_URL}${path}?${queries}`);
    return res
      .then((rawRes) => rawRes.json())
      .catch(() => {
        alert('Error, please reload');
      });
  },
};

type ApisKeys = keyof typeof merger;
const merger = { ...movies, ...genres };
const combined: { [key: string]: any } = merger;

Object.keys(combined).forEach((key) => {
  combined[key as ApisKeys] = combined[key as ApisKeys].bind(reqObj);
});

export default combined as typeof merger;
