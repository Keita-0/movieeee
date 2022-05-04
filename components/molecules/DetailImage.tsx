import toast from "react-hot-toast";
import {
  checkMark,
  checkReview,
  deleteBookMark,
  insertBookMark,
} from "../../hooks/useFireStore";
import { memo, useEffect, useState } from "react";
import { Loading } from "../atoms/Loading";
import styled from "styled-components";
import React from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";

type Props = {
  movie: any;
  watchedFlg: boolean;
  setWatchedFlg: Dispatch<SetStateAction<boolean>>;
  setmodalReview: Dispatch<SetStateAction<boolean>>;
};

// eslint-disable-next-line react/display-name
export const DetailImage = memo((props: Props) => {
  const { movie, watchedFlg, setWatchedFlg, setmodalReview } = props;

  //stateの管理
  const [bookMarkFlg, setBookMarkFlg] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  //初期化処理
  useEffect(() => {
    checkMark(movie).then((result) => {
      setBookMarkFlg(result);
      setLoading(false);
    });
    checkReview(movie).then((result) => {
      setWatchedFlg(result);
      setLoading(false);
    });
  }, []);

  //ブックマーク登録処理
  const BookMark = () => {
    toast.promise(insertBookMark(movie, setBookMarkFlg), {
      loading: "Loading",
      success: "ブックマークしました",
      error: "ブックマークに失敗しました",
    });
  };

  //ブックマーク削除処理
  const DeleteBookMark = () => {
    toast.promise(deleteBookMark(movie, setBookMarkFlg), {
      loading: "Loading",
      success: "ブックマークから削除しました",
      error: "ブックマークの削除に失敗しました",
    });
  };

  const OpenModalReview = () => {
    setmodalReview(true);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Container>
      <Trim>
        <SIMG
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`
              : "/20200506_noimage.png"
          }
        />
      </Trim>
      <IcomContainer>
        <MovieButton onClick={bookMarkFlg ? DeleteBookMark : BookMark}>
          {bookMarkFlg ? (
            <IcomImg
              src={"/icons8-ブックマークリボン-100 (2).png"}
              alt="icon"
            />
          ) : (
            <IcomImg
              src={"/icons8-ブックマークリボン-100 (1).png"}
              alt="icon"
            />
          )}
          <Label>ブックマーク</Label>
        </MovieButton>
        <MovieButton onClick={OpenModalReview}>
          {watchedFlg ? (
            <IcomImg src={"/icons8-幸せな目-60-1黄色.png"} alt="icon" />
          ) : (
            <IcomImg src={"/icons8-幸せな目-60.png"} alt="icon" />
          )}
          <Label>レビュー</Label>
        </MovieButton>
      </IcomContainer>
    </Container>
  );
});

const Container = styled.div`
  margin-right: 2vw;
  @media (min-width: 561px) and (max-width: 1024px) {
    margin-right: 0.1vw;
  }
`;

const IcomContainer = styled.div`
  margin-top: 1vh;
  display: flex;
  flex-direction: column;
`;

const SIMG = styled.img`
  height: 40vh;
  @media (min-width: 561px) and (max-width: 1024px) {
    height: 20vh;
  }
  @media (max-width: 560px) {
    height: 20vh;
  }
`;

const IcomImg = styled.img`
  width: 2vw;
  margin-right: 1vw;
  @media (max-width: 560px) {
    width: 5vw;
  }
`;

const Trim = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  width: 240px;
  height: 360px;
  position: relative;
  @media (min-width: 561px) and (max-width: 1024px) {
    width: 180px;
    height: 270px;
  }
  @media (max-width: 560px) {
    width: 110px;
    height: 170px;
  }
`;

const MovieButton = styled.div`
  display: flex;
  align-items: center;
  background-color: #eeeeee;
  padding: 10px;
  padding-left: 20%;
  margin-bottom: 2px;
  :hover {
    cursor: pointer;
  }
  @media (min-width: 561px) and (max-width: 1024px) {
    padding: 10px;
    padding-left: 20%;
    margin-bottom: 2px;
  }
  @media (max-width: 560px) {
    padding: 10px;
    padding-left: 10%;
    margin-bottom: 2px;
  }
`;

const Label = styled.h4`
  margin: 0;
  @media (min-width: 561px) and (max-width: 1024px) {
    font-size: 1rem;
  }
  @media (max-width: 560px) {
    font-size: 0.4rem;
  }
`;
