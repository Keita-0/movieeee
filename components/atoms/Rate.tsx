import { Dispatch } from "react";
import { SetStateAction } from "react";
import styled from "styled-components";
import { Review } from "../../types/Review";

type Props = {
  review: Review;
  setReview: Dispatch<SetStateAction<Review>>;
};

export const Rate = (props: Props) => {
  const { review, setReview } = props;

  const onChangeRate = (e: any) => {
    setReview((review) => ({ ...review, rate: e.target.value }));
  };
  return (
    <SDiv>
      <SInput value={review.rate} onChange={onChangeRate} />
      <Sp>{review.rate / 20}／5.0</Sp>
    </SDiv>
  );
};

const SDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const SInput = styled.input.attrs({
  type: "range",
  min: 0,
  max: 100,
  step: 2,
})<{ value: number }>`
  -webkit-appearance: none;
  height: 3px;
  width: 200px;
  background: #000000;
  display: inline-block;
  white-space: nowrap;
  color: #cccccc;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #ffcc00;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-top: -5px;
  }

  &::-webkit-slider-runnable-track {
    border-radius: 100px;
    height: 5px;
    width: 100%;
    background: linear-gradient(
      to right,
      #ffcc00 ${(props) => props.value}%,
      black ${(props) => props.value}% 100%
    );
  }
`;

const Sp = styled.label`
  font-size: 20px;
  margin-left: 20px;
  color: #ffcc00;
`;
