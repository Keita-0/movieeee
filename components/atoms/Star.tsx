import { VFC } from "react";
import styled from "styled-components";
import { sp, tab } from "../../utils/Media";

type Props = {
  rating?: number;
  size?: number;
  isNumber?: boolean;
};

export const Star = (props: Props) => {
  const { rating, size, isNumber } = props;
  return (
    <SDiv>
      <StarRating rating={rating} size={size} />
      {isNumber ? <Sp size={size}>{rating?.toFixed(1)}／5.0</Sp> : null}
    </SDiv>
  );
};

const SDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StarRating = styled.div<Props>`
  position: relative;
  z-index: 0;
  display: inline-block;
  white-space: nowrap;
  color: #cccccc;
  font-size: ${(props) => (props.size ? props.size : 0)}%;

  ::before,
  ::after {
    content: "★★★★★";
  }

  ::after {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    overflow: hidden;
    white-space: nowrap;
    color: #ffcf32;
    width: ${(props) => (props.rating ? props.rating * 20 : 0)}%;
  }
`;

StarRating.defaultProps = {
  rating: 0,
};

const Sp = styled.label<Props>`
  font-size: ${(props) => (props.size ? props.size : 0)}%;
  margin-left: 20px;
  color: #ffcc00;
  ${sp`
        display:none;
    `}
  ${tab`
        display:none;
    `}
`;
