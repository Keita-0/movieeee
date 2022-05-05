import { memo } from "react";
import styled from "styled-components";
import { Star } from "../atoms/Star";

type TypeReview = {
  review: {
    title: string;
    id: string;
    rate: number;
    comment: string;
    photo: string;
  };
};
// eslint-disable-next-line react/display-name
export const Review = memo((props: TypeReview) => {
  const { review } = props;

  return (
    <SCard key={review.id}>
      <div>
        <SIMG
          src={review.photo ? review.photo : "/icon/20200506_noimage.png"}
        />
      </div>
      <InfoArea>
        <STitle key={review.id}>{review.title}</STitle>
        <SDiv>
          <Star rating={review.rate / 20} size={120} isNumber={true} />
        </SDiv>
        <SLabel>コメント</SLabel>
        {review.comment === "" ||
        review.comment === undefined ||
        review.comment === null ? (
          <Sp>コメントがありません。</Sp>
        ) : (
          <Sp>{review.comment}</Sp>
        )}
      </InfoArea>
    </SCard>
  );
});

const SCard = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: #ddd 0px 0px 1px 1px;
  width: 100%;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;
  @media (max-width: 560px) {
    padding: 10px;
  }
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5vh 2vh;
`;

const SIMG = styled.img`
  height: 30vh;
  @media (min-width: 561px) and (max-width: 1024px) {
    height: 20vh;
  }
  @media (max-width: 560px) {
    height: 15vh;
  }
`;

const STitle = styled.h2`
  margin-top: 0;
  @media (min-width: 561px) and (max-width: 1024px) {
    font-size: 1.3rem;
  }
  @media (max-width: 560px) {
    font-size: 0.8rem;
  }
`;

const SLabel = styled.p`
  font-weight: bold;
  margin-bottom: 3px;
  @media (max-width: 560px) {
    font-size: 0.4rem;
  }
`;

const Sp = styled.p`
  margin: 0;
  @media (max-width: 560px) {
    font-size: 0.4rem;
  }
`;

const SDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin: 0;
  padding: 0;
`;
