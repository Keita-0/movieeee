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

const useFetchArray2 = (url: string, key: string, refreshInterval: number) => {
  const { data, error } = useSWR(key ? [url, key] : null, fetcher, {
    refreshInterval: refreshInterval,
  });

  return {
    data,
    error,
    isLoading: !error && !data,
    isEmpty: data && data.results.length === 0,
  };
};

const useFetch = (
  url: string,
  refreshInterval: number,
  key: number | undefined
) => {
  const { data, error } = useSWR(key ? [url, key] : null, fetcher, {
    refreshInterval: refreshInterval,
  });

  return {
    data,
    error,
    isLoading: !error && !data,
    isEmpty: data && data.length === 0,
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

export const getSearchMovies = (
  index: number,
  key: string,
  refreshInterval: number
) => {
  return useFetchArray2(
    `https://api.themoviedb.org/3/search/movie?api_key=36281c7271c65f50477f77ca7b16573a&query=${key}&page=${index}&language=ja-JP&region=JP`,
    key,
    refreshInterval
  );
};

export const getMovieQuery = (
  index: number,
  key: string,
  refreshInterval: number
) => {
  return useFetchArray2(
    `https://api.themoviedb.org/3/movie/${key}?api_key=36281c7271c65f50477f77ca7b16573a&page=${index}&language=ja-JP&region=JP`,
    key,
    refreshInterval
  );
};

export const getMovie = (key: number | undefined, refreshInterval: number) => {
  return useFetch(
    `https://api.themoviedb.org/3/movie/${key}?api_key=36281c7271c65f50477f77ca7b16573a&language=ja-JP&region=JP`,
    refreshInterval,
    key
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
