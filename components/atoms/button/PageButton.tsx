import React from "react";
import styled from "styled-components";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
};

export const PageButton = (props: Props) => {
  const { children, onClick } = props;
  return <SButton onClick={onClick}>{children}</SButton>;
};

const SButton = styled.button`
  background-color: #444444;
  color: white;
  padding: 10px;
  width: 70px;
  font-size: 20px;
  margin: 1px;
  border: none;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
  @media (max-width: 560px) {
    font-size: 10px;
  }
`;
