import useSWR from "swr";
import { fetcher, searchFetcher } from "../utils/fetcher";

const useFetchArray = (url: string) => {
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading: !error && !data,
    isEmpty: data && data.results.length === 0,
  };
};

const useFetchArrayQuery = (url: string, params: any) => {
  const { data, error } = useSWR([url, params], searchFetcher);
  return {
    data,
    error,
    isLoading: !error && !data,
    isEmpty: data && data.results.length === 0,
  };
};

export const getSearchMovies = (index: number, key: any) => {
  return useFetchArray(
    `https://api.themoviedb.org/3/search/movie?api_key=36281c7271c65f50477f77ca7b16573a&query=${key}&page=${index}&language=ja-JP&region=JP`
  );
};

export const getMovieQuery = (index: number, key: any) => {
  return useFetchArray(
    `https://api.themoviedb.org/3/movie/${key}?api_key=36281c7271c65f50477f77ca7b16573a&page=${index}&language=ja-JP&region=JP`
  );
};

export const getPicUpMovies = (key: String) => {
  return useFetchArray(
    `https://api.themoviedb.org/3/movie/${key}?api_key=36281c7271c65f50477f77ca7b16573a&language=ja-JP&region=JP`
  );
};

export const getVideo = (id: number) => {
  return useFetchArray(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=36281c7271c65f50477f77ca7b16573a&language=ja-JP`
  );
};

export const useSearch = (params: any) => {
  return useFetchArrayQuery(
    "https://api.themoviedb.org/3/search/movie?",
    params
  );
};
