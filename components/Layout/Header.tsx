// import { useCallback, useEffect } from "react";
import styled from "styled-components";

export const Header = () => {
  return (
    <SHeader>
      <STitile>Moiveeee</STitile>
      <>
        <SContainer></SContainer>
        <UserContainer>
          <SingOut>サインアウト</SingOut>
        </UserContainer>
      </>
    </SHeader>
  );
};

const SHeader = styled.nav`
  display: flex;
  background-color: #eeeeee;
  width: 100%;
  height: 8vh;
  align-items: center;
  font-weight: bold;
`;

const SContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5vw;
  width: 50%;
`;

const STitile = styled.div`
  font-size: 30px;
  margin-left: 4vw;
`;

const UserContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: end;
  margin-right: 1rem;
  align-items: center;
`;

const SingOut = styled.div`
  margin: 25px;
  :hover {
    cursor: pointer;
    color: #0066ff;
  }
`;
