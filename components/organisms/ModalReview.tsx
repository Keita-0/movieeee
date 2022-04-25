import styled from "styled-components";
import { VFC, Dispatch, SetStateAction, useState, useEffect } from "react";
import { pc, sp, tab } from "../../utils/Media";
import { Rate } from "../atoms/Rate";
import {
  deleteReview,
  getReviewData,
  insertReview,
} from "../../hooks/useFireStore";
import { Review } from "../../types/Review";
import React from "react";
import toast from "react-hot-toast";

type Props = {
  closeButton: JSX.Element;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  movie: any;
  watchedFlg: boolean;
  setWatchedFlg: Dispatch<SetStateAction<boolean>>;
};

export const ModalReview = React.memo((props: Props) => {
  const {
    closeButton,
    modalOpen,
    setModalOpen,
    movie,
    watchedFlg,
    setWatchedFlg,
  } = props;
  const [review, setReview] = useState<Review>({ comment: "", rate: 0 });

  useEffect(() => {
    getReviewData(movie.id).then((result: any) => {
      setReview(result);
    });
  }, [modalOpen]);

  const onChangeComment = (e: any) => {
    setReview((review) => ({ ...review, comment: e.target.value }));
  };

  const ocClickAddReview = () => {
    toast.promise(insertReview(movie, review), {
      loading: "Loading",
      success: "レビューを登録しました",
      error: "レビューの登録に失敗しました",
    });
    setModalOpen(false);
    setWatchedFlg(true);
  };

  const ocClickDeleteReview = () => {
    toast.promise(deleteReview(movie.id), {
      loading: "Loading",
      success: "レビューを削除しました",
      error: "レビューの削除に失敗しました",
    });
    setModalOpen(false);
    setWatchedFlg(false);
  };

  return (
    <>
      {modalOpen && (
        <ModalArea>
          <SContainer>
            <ModalHeader>{closeButton}</ModalHeader>
            <ModalBody>
              <Title>レビュー</Title>
              <Rate review={review} setReview={setReview} />
              <InputArea>
                <Comment
                  maxLength={200}
                  rows={10}
                  placeholder={"レビュー無記入でも登録できます。"}
                  value={review.comment}
                  onChange={onChangeComment}
                ></Comment>
              </InputArea>
              <ButtonArea>
                <SButton onClick={ocClickAddReview}>登録</SButton>
                {watchedFlg ? (
                  <SButton onClick={ocClickDeleteReview}>削除</SButton>
                ) : null}
              </ButtonArea>
            </ModalBody>
          </SContainer>
        </ModalArea>
      )}
    </>
  );
});

const ModalArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SContainer = styled.div`
  width: 40%;
  margin: 5em;
  padding: 0;
  border-radius: 8px;
  opacity: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  ${sp`
        width: 90%;
    `}
  ${tab`
        width: 90%;
    `}
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-top: 0;
  padding-bottom: 3rem;
`;

const SButton = styled.button`
  background-color: #444444;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 10px;
  margin: auto;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 15px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  margin: 0 10px;
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-top: 2%;
`;

const Comment = styled.textarea`
  resize: none;
  padding: 10px;
  font-size: 20px;
  color: #666666;
  :focus {
    outline: 0;
  }
`;
