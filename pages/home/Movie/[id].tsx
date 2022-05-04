import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CloseButton } from "../../../components/atoms/button/CloseButton";
import { DetailInfo } from "../../../components/molecules/DetailInfo";
import { DetailImage } from "../../../components/molecules/DetailImage";
import { ModalReview } from "../../../components/organisms/ModalReview";
import { backfaceFixed } from "../../../utils/backfaceFixed";
import { getMovie } from "../../../hooks/useFetchArray";
import { Loading } from "../../../components/atoms/Loading";

const Movie: NextPage = () => {
  //Locationの取得
  const router = useRouter();

  //stateの管理
  const [refreshInterval, setRefreshInterval] = useState(1000);
  const [watchedFlg, setWatchedFlg] = useState<boolean>(false);
  const [modalReview, setmodalReview] = useState<boolean>(false);
  const [id, setId] = useState<number | undefined>();

  const { data, error, isLoading, isEmpty } = getMovie(id, refreshInterval);

  // この部分を追加
  useEffect(() => {
    // idがqueryで利用可能になったら処理される
    if (router.asPath !== router.route) {
      setId(Number(router.query.id));
    }
  }, [router]);

  // idが取得されてセットされたら処理される
  useEffect(() => {
    if (id) {
      setRefreshInterval(0);
    }
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (isEmpty) {
    return null;
  }

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
        movie={data}
        watchedFlg={watchedFlg}
        setWatchedFlg={setWatchedFlg}
      />
      <SBody>
        <DetailArea>
          <DetailImage
            movie={data}
            watchedFlg={watchedFlg}
            setWatchedFlg={setWatchedFlg}
            setmodalReview={setmodalReview}
          />
          <DetailInfo
            title={data.title}
            release_date={data.release_date}
            vote_average={data.vote_average}
            overview={data.overview}
            id={data.id}
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
  @media (min-width: 561px) and (max-width: 1024px) {
    width: 90%;
  }
  @media (max-width: 560px) {
    width: 95%;
  }
`;
export default Movie;
