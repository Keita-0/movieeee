import { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { NavBar } from "../../organisms/NavBar";
import "../../../Firebase/firebase";
import { getAuth, signOut } from "firebase/auth";
import { Search } from "../../molecules/Search";
import { useRouter } from "next/router";
import { sp } from "../../../utils/Media";
import { useRecoilState } from "recoil";
import { loginFlg } from "../../../store/movieSearchState";

type Props = {
  active: boolean;
  onClick: () => void;
};

export const Header = () => {
  const router = useRouter();

  const [homeActive, setHomeActive] = useState(false);
  const [myPageAvtive, setMyPageAvtive] = useState(false);

  useEffect(() => {
    if (router.pathname === "/home") {
      setHomeActive(true);
    } else if (router.pathname === "/home/mypage") {
      setMyPageAvtive(true);
    }
  }, []);

  const [isSignedIn, setIsSignedIn] = useRecoilState(loginFlg);
  const onClickHome = useCallback(() => {
    router.push("/home");
  }, []);
  const onClickMypage = useCallback(() => router.push("/mypage"), []);

  const auth = getAuth();
  const onClickSignOut = () => {
    signOut(auth)
      .then(() => {
        setIsSignedIn(false);
        router.push("/");
      })
      .catch((error) => {
        console.log("Sign-out error.");
      });
  };

  return (
    <SHeader>
      <STitile>Moiveeee</STitile>
      <SContainer>
        <SLink onClick={onClickHome} active={homeActive}>
          Home
        </SLink>
        <SLink onClick={onClickMypage} active={myPageAvtive}>
          MyPage
        </SLink>
      </SContainer>
      <UserContainer>
        <Search />
        <SingOut onClick={onClickSignOut}>サインアウト</SingOut>
      </UserContainer>

      <NavBar />
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

const SLink = styled.div<Props>`
  margin: 25px;
  :hover {
    cursor: pointer;
    color: #0066ff;
  }

  ${(props) =>
    props.active
      ? css`
          color: #0066ff;
          border-bottom: 2px solid #0066ff;
        `
      : css``};
  ${sp`
        display:none;
    `}
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
