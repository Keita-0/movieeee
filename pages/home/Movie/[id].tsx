import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CloseButton } from "../../../components/atoms/button/CloseButton";
import { DetailInfo } from "../../../components/molecules/DetailInfo";
import { DetailImage } from "../../../components/organisms/DetailImage";
import { ModalReview } from "../../../components/organisms/ModalReview";
import { backfaceFixed } from "../../../utils/backfaceFixed";
import YouTube from "react-youtube";

const Movie: NextPage = () => {
  //Locationの取得
  const router = useRouter();

  //stateの管理
  const [movie] = useState<any>(router.query);
  const [watchedFlg, setWatchedFlg] = useState<boolean>(false);
  const [modalReview, setmodalReview] = useState<boolean>(false);

  console.log(router.query.id);

  //レビュー押下時処理
  const onClickModal = () => {
    setmodalReview(false);
    backfaceFixed(false);
  };

  return (
    <>
      <ModalReview
        closeButton={<CloseButton onClick={onClickModal} />}
        modalOpen={modalReview}
        setModalOpen={setmodalReview}
        movie={movie}
        watchedFlg={watchedFlg}
        setWatchedFlg={setWatchedFlg}
      />
      <SBody>
        <DetailArea>
          <DetailImage
            movie={movie}
            watchedFlg={watchedFlg}
            setWatchedFlg={setWatchedFlg}
            setmodalReview={setmodalReview}
          />
          <DetailInfo
            title={movie.title}
            release_date={movie.release_date}
            vote_average={movie.vote_average}
            overview={movie.overview}
            id={movie.id}
          />
        </DetailArea>
      </SBody>
    </>
  );
};

const SBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5vh;
`;

const DetailArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  padding-top: 3vh;
`;
export default Movie;
