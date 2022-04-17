import styled from "styled-components";

export const Footer = () => {
  return (
    <SFooter>
      Copyright © {new Date().getFullYear()} All Rights Reserved.
    </SFooter>
  );
};

const SFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  width: 100%;
  height: 7vh;
  margin-top: auto;
`;
