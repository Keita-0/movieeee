import React from "react";
import styled from "styled-components";

type Props = {
  onClick: () => void;
};

export const MoreButton = (props: Props) => {
  const { onClick } = props;
  return (
    <SButton onClick={onClick}>
      もっと見る
      <MoreIcon />
    </SButton>
  );
};

const SButton = styled.div`
  background-color: #ffffff;
  color: #444444;
  font-size: 15px;
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const MoreIcon = styled.div`
  border-top: solid 3px #444444;
  border-right: solid 3px #444444;
  margin-left: 5px;
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
`;
