import { useEffect, useState } from "react";
import styled from "styled-components";
import { Loading } from "../atoms/Loading";
import { getReviewLists } from "../../hooks/useFireStore";
import { Review } from "../molecules/Review";

type TypeReview = {
  title: string;
  id: string;
  rate: number;
  comment: string;
  photo: string;
};

export const ReviewLists = () => {
  const [isLoading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<TypeReview[]>();
  useEffect(() => {
    getReviewLists()
      .then((result) => {
        setReviews(result);
        setLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MovieCardArea>
      {reviews
        ? reviews.map((review: TypeReview) => {
            return <Review review={review} />;
          })
        : null}
    </MovieCardArea>
  );
};

const MovieCardArea = styled.div`
  padding-top: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  place-items: center;
`;
