import styled, { css } from "styled-components";
import { memo } from "react";
import { sp, tab } from "../../utils/Media";
import { Star } from "../atoms/Star";

import { ReactNode } from "react";
import { useRouter } from "next/router";

type Props = {
  movie: {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
  };
  isSmall: boolean;
};

type TitleProps = {
  isDisplay: boolean;
  children: ReactNode;
};

type CardProps = {
  isSmall: boolean;
  children: ReactNode;
};

type ImgProps = {
  isSmall: boolean;
};

// eslint-disable-next-line react/display-name
export const MovieCard = memo((props: Props) => {
  const { movie, isSmall } = props;
  const router = useRouter();

  //カード押下時処理
  const onClickCard = () => {
    router.replace(`/home/movie/${movie.id}`);
  };

  return (
    <>
      <SCard onClick={onClickCard} key={movie.id} isSmall={isSmall}>
        <ImgDiv>
          <SIMG
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`
                : "/20200506_noimage.png"
            }
            isSmall={isSmall}
          />
        </ImgDiv>
        <STitle isDisplay={isSmall}>{movie.title}</STitle>
        <SDiv>
          <Star
            rating={Math.round((movie.vote_average / 2) * 10) / 10}
            size={120}
            isNumber={false}
          />
        </SDiv>
      </SCard>
    </>
  );
});

const SCard = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: ${(props) => (props.isSmall ? "start" : "space-between")};
  :hover {
    cursor: pointer;
    opacity: 80%;
  }
  background-color: #fff;
  box-shadow: #ddd 0px 0px 1px 1px;
  border-radius: 8px;
  width: ${(props) => (props.isSmall ? 8 : 15)}rem;
  height: ${(props) => (props.isSmall ? 15 : 25)}rem;
  padding: 1rem 1rem;

  @media (min-width: 561px) and (max-width: 1024px) {
    width: ${(props) => (props.isSmall ? 8 : 15)}rem;
    height: ${(props) => (props.isSmall ? 14 : 23)}rem;
    padding: 1rem 0.5rem;
  }
  @media (max-width: 560px) {
    width: 5rem;
    height: 8.5rem;
    padding: 0.4rem 0.2rem;
  }
`;

const SIMG = styled.img<ImgProps>`
  height: ${(props) => (props.isSmall ? 18 : 27)}vh;
  margin-bottom: 10px;
  @media (min-width: 561px) and (max-width: 1024px) {
    height: ${(props) => (props.isSmall ? 14 : 20)}vh;
  }
  @media (max-width: 560px) {
    height: 12vh;
    margin-bottom: 5px;
  }
`;

const STitle = styled.h2<TitleProps>`
  ${(props) =>
    props.isDisplay
      ? css`
          display: none;
        `
      : css`
          display: -webkit-box;
        `};
  margin-top: 1.2rem;
  font-size: 1.5vmin;
  text-align: center;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 10px;
  ${sp`
      display:none;
    `}
  @media (min-width: 561px) and (max-width: 1024px) {
    font-size: 0.8rem;
  }
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  top: 0;
`;
