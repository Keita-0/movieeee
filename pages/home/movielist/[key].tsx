import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import { getMovieQuery, getSearchMovies } from "../../../hooks/useFetchArray";
import { sp, tab } from "../../../utils/Media";
import { Loading } from "../../../components/atoms/Loading";
import { MovieCard } from "../../../components/molecules/MovieCard";
import { PageNation } from "../../../components/molecules/PageNation";
import { useRouter } from "next/router";

interface RouterParams {
  id: string;
}

const Patterns = [
  { key: "now_playing", word: "上映中" },
  { key: "popular", word: "人気" },
  { key: "top_rated", word: "評価が高い" },
  { key: "upcoming", word: "上映予定" },
];

const MovieList: NextPage = () => {
  const router = useRouter();
  //stateの管理
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isMaxPage, setIsMaxPage] = useState(false);
  const [selectKey, setSelectKey] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [key, setKey] = useState<string | undefined>("");
  const isSearch: boolean = router.asPath.indexOf("search") !== -1;
  const [refreshInterval, setRefreshInterval] = useState(1000);

  useEffect(() => {
    // patternがqueryで利用可能になったら処理される
    if (router.asPath !== router.route) {
      if (typeof router.query.key === "string") {
        setKey(router.query.key);
      }
    }
  }, [router]);

  // patternが取得されてセットされたら処理される
  useEffect(() => {
    if (selectKey) {
      console.log(selectKey);

      setRefreshInterval(0);
    }
  }, [selectKey]);

  //データの取得
  const { data, error, isLoading, isEmpty } = isSearch
    ? getSearchMovies(pageNumber, selectKey, refreshInterval)
    : getMovieQuery(pageNumber, selectKey, refreshInterval);

  //Location・取得データの変更があった場合
  useEffect(() => {
    if (key) {
      //ページを先頭にする
      window.scrollTo(0, 0);

      //最大ページか判定
      setIsMaxPage(data?.total_pages === pageNumber);

      //はじめのページか判定
      if (pageNumber === 1) {
        setIsFirstPage(true);
      } else {
        setIsFirstPage(false);
      }

      //keyの取得
      if (isSearch) {
        setSelectKey(key.substring(key.indexOf("=") + 1, key.lastIndexOf("&")));
        setPageNumber(parseInt(key.substring(key.indexOf("&page") + 6)));
      } else {
        setSelectKey(
          key.substring(
            key.lastIndexOf("/", key.lastIndexOf("/")) + 1,
            key.lastIndexOf("&")
          )
        );
        setPageNumber(parseInt(key.substring(key.indexOf("=") + 1)));
      }
    }
  }, [key, data]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>映画の取得に失敗しました。</div>;
  }

  return (
    <>
      <Body>
        <MovieListArea>
          <LabelContainer>
            <SLabel>
              {isSearch
                ? `検索結果：${selectKey}`
                : Patterns.map((pattern) => {
                    if (pattern.key === selectKey) {
                      return pattern.word + "の映画";
                    }
                  })}
            </SLabel>
          </LabelContainer>
          <MovieContainer>
            <MovieCardArea>
              {isEmpty ? (
                <p>データが見つかりません。</p>
              ) : (
                data.results.map((movie: any) => {
                  return (
                    <MovieCard key={movie.id} movie={movie} isSmall={false} />
                  );
                })
              )}
            </MovieCardArea>
          </MovieContainer>
        </MovieListArea>
        {data.results.length === 0 ? null : (
          <PageNation
            isSearch={isSearch}
            selectKey={selectKey}
            pageNumber={pageNumber}
            total_pages={data.total_pages}
            isFirstPage={isFirstPage}
            isMaxPage={isMaxPage}
          />
        )}
      </Body>
    </>
  );
};

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1.5rem 2rem;
  margin-bottom: 5vh;
  @media (max-width: 560px) {
    padding: 1rem 0.2rem;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
  width: 90%;
`;

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const SLabel = styled.label`
  margin-left: 4vw;
  font-size: 25px;
  padding-left: 2%;
  padding-right: 2%;
  border-bottom: 2px solid #cccccc;
  font-weight: bold;
  @media (max-width: 560px) {
    font-size: 1.2rem;
  }
`;

const MovieCardArea = styled.div`
  padding-top: 10px;
  width: 90%;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 30px 20px;
  @media (max-width: 560px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    grid-gap: 2vw 1vw;
  }
`;

const MovieListArea = styled.div`
  width: 90%;
  margin-bottom: 2%;
  @media (max-width: 560px) {
    width: 100%;
  }
`;

export default MovieList;
