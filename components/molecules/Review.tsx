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
          src={review.photo ? review.photo : "../../icon/20200506_noimage.png"}
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
  box-shadow: 0 4px 10px rgb(0 0 0 / 5%), 0 0 1px rgb(0 0 0 / 10%);

  width: 100%;
  background-color: #eeeeee;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3vh;
`;

const SIMG = styled.img`
  height: 30vh;
`;

const STitle = styled.h2`
  margin-top: 0;
`;

const SLabel = styled.p`
  font-weight: bold;
`;

const Sp = styled.p`
  margin: 0;
`;

const SDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin: 0;
  padding: 0;
`;
