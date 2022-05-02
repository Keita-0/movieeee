import { atom } from "recoil";
import { AlertType, SearchMovieType } from "../types/SearchMovie";

export const movieSearchState = atom<string>({
  key: "movieSearchState",
  default: "",
});

export const searchState = atom<SearchMovieType>({
  key: "searchState",
  default: {
    query: "",
    page: 1,
    language: "ja-JA",
    api_key: "36281c7271c65f50477f77ca7b16573a",
  },
});

export const signInUserState = atom({
  key: "auth/signIn",
  default: {
    uid: "",
  },
});
export const searchFlg = atom<boolean>({
  key: "searchFlg",
  default: false,
});

export const alertFlg = atom<AlertType>({
  key: "alertFlg",
  default: {
    isAlert: false,
    alertMsg: "",
    alertKind: 0,
  },
});
