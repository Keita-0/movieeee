import { getAuth } from "@firebase/auth";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styled, { css } from "styled-components";
import { MyMovies } from "../../components/organisms/MyMovies";
import { ReviewLists } from "../../components/organisms/ReviewLists";
import styles from "../../styles/Home.module.css";

type Props = {
  focus: boolean;
  onClick: () => void;
};

const MyPage: NextPage = () => {
  const auth = getAuth();
  const [isBookMarkFocus, setBookMarkFocus] = useState(true);

  const onClickBookMarkFocus = () => {
    setBookMarkFocus(true);
  };

  const onClickReviewFocus = () => {
    setBookMarkFocus(false);
  };

  return (
    <Body>
      <ProfileArea>
        <Icon src={`${auth.currentUser?.photoURL}`} />
        <h3>{auth.currentUser?.displayName}</h3>
        <Sp>ブックマーク：件</Sp>
        <Sp>レビュー：件</Sp>
      </ProfileArea>
      <Container>
        <TabArea>
          <Tab focus={isBookMarkFocus} onClick={onClickBookMarkFocus}>
            <IcomImg
              src={"/icons8-ブックマークリボン-100 (2).png"}
              alt="icon"
            />
            <Label>ブックマーク</Label>
          </Tab>
          <Tab focus={!isBookMarkFocus} onClick={onClickReviewFocus}>
            <IcomImg src={"/icons8-幸せな目-60-1黄色.png"} alt="icon" />
            <Label>レビュー</Label>
          </Tab>
        </TabArea>
        <MovieArea>
          {isBookMarkFocus ? <MyMovies /> : <ReviewLists />}
        </MovieArea>
      </Container>
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 60%;
  height: 100%;
  margin: 2%;
`;

const TabArea = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: rgba(230, 230, 230, 0.5); */
  padding: 10px;
`;

const ProfileArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2%;
  height: 20%;
  padding: 25px 40px;
  border-radius: 10%;
  box-shadow: #ddd 0px 0px 4px 2px;
`;

const MovieArea = styled.div`
  height: 100%;
`;

const Icon = styled.img`
  height: 7vh;
  margin-right: 2%;
  border-radius: 100%;
`;

const Sp = styled.p`
  margin-top: 2px;
  margin-bottom: 2px;
`;

const Label = styled.h4`
  margin: 0;
  display: inline-block;
`;

const IcomImg = styled.img`
  /* height: 2vh; */
  margin-right: 5%;
  width: 2vw;
`;

const Tab = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 3px 10px;
  margin-right: 3vw;

  ${(props) =>
    props.focus
      ? css`
          color: #0066ff;
          border-bottom: 2px solid #0066ff;
        `
      : css``};
`;

export default MyPage;
