export type SearchMovieType = {
  query: string;
  page: number;
  language: string;
  api_key: string;
};

export type AlertType = {
  isAlert: boolean;
  alertMsg: string;
  alertKind: number;
};
