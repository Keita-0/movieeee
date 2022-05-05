import { getAuth } from "@firebase/auth";
import type { NextPage } from "next";
import { useState } from "react";
import styled, { css } from "styled-components";
import { MyMovies } from "../../components/organisms/MyMovies";
import { ReviewLists } from "../../components/organisms/ReviewLists";

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
  width: 95%;
  height: 100%;
  margin: 2%;
  padding: 0 3vw;
  @media (max-width: 560px) {
    padding: 0 0.1vw;
  }
`;

const TabArea = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const MovieArea = styled.div`
  height: 100%;
`;

const Label = styled.h4`
  margin: 0;
  display: inline-block;
  @media (max-width: 560px) {
    font-size: 0.7rem;
  }
`;

const IcomImg = styled.img`
  /* height: 2vh; */
  margin-right: 5%;
  width: 2vw;
  @media (max-width: 560px) {
    width: 4vw;
  }
`;

const Tab = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 3px 10px;
  margin-right: 3vw;

  @media (min-width: 561px) and (max-width: 1024px) {
    width: 30%;
  }

  @media (max-width: 560px) {
    width: 40%;
  }

  ${(props) =>
    props.focus
      ? css`
          color: #0066ff;
          border-bottom: 2px solid #0066ff;
        `
      : css``};
`;

export default MyPage;
