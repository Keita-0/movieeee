import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { NavBar } from "../../organisms/NavBar";
import "../../../Firebase/firebase";
import { signOut } from "firebase/auth";
import { Search } from "../../molecules/Search";
import { useRouter } from "next/router";
import { sp } from "../../../utils/Media";
import { auth } from "../../../Firebase/firebase";
import toast from "react-hot-toast";

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
      setMyPageAvtive(false);
    } else if (router.pathname === "/mypage") {
      setHomeActive(false);
      setMyPageAvtive(true);
    }
  }, [router.pathname]);

  const onClickSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        toast.error("サインアウトに失敗しました。");
      });
  };

  return (
    <SHeader>
      <STitile>Moiveeee</STitile>
      <SContainer>
        <SLink
          onClick={() => {
            router.push("/home");
          }}
          active={homeActive}
        >
          Home
        </SLink>
        <SLink
          onClick={() => {
            router.push("/mypage");
          }}
          active={myPageAvtive}
        >
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
  @media (max-width: 560px) {
    display: none;
  }
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
  @media (max-width: 560px) {
    display: none;
  }
`;

const SingOut = styled.div`
  margin: 25px;
  :hover {
    cursor: pointer;
    color: #0066ff;
  }
  @media (min-width: 561px) and (max-width: 1024px) {
    font-size: 0.8rem;
  }
`;
