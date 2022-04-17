import React from "react";
import styled from "styled-components";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
};

export const SearchButton = (props: Props) => {
  const { onClick, children } = props;
  return <SButton onClick={onClick}>{children}</SButton>;
};

const SButton = styled.button`
  background-color: #444444;
  padding: 5px 10px;
  margin: 10px;
  color: white;
  border-radius: 10%;
  border: none;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
`;
