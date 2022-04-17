import React from "react";
import styled from "styled-components";

type Props = {
  onClick: () => void;
};

export const CloseButton = (props: Props) => {
  const { onClick } = props;
  return <SSpan onClick={onClick} />;
};

const SSpan = styled.span`
  display: block;
  position: relative;
  width: 30px;
  height: 30px;
  background: #fff; /* ボタンの背景色 */
  ::before,
  ::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3px; /* 棒の幅（太さ） */
    height: 27px; /* 棒の高さ */
    background: #333; /* バツ印の色 */
  }
  ::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  ::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  :hover {
    cursor: pointer;
  }
`;
