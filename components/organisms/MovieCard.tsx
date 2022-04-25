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

export const MovieCard = memo((props: Props) => {
  const { movie, isSmall } = props;
  const router = useRouter();

  //カード押下時処理
  const onClickCard = () => {
    router.push({
      pathname: `/home/Movie=${movie.id}`,
      query: movie,
    });
  };

  return (
    <>
      <SCard onClick={onClickCard} key={movie.id} isSmall={isSmall}>
        <ImgDiv>
          <SIMG
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`
                : "../../icon/20200506_noimage.png"
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
  background-color: #fff;
  box-shadow: #ddd 0px 0px 4px 2px;
  border-radius: 8px;
  width: ${(props) => (props.isSmall ? 6 : 13)}rem;
  height: ${(props) => (props.isSmall ? 12.6 : 22.5)}rem;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: ${(props) => (props.isSmall ? "start" : "space-between")};
  :hover {
    cursor: pointer;
    opacity: 80%;
  }
`;

const SIMG = styled.img<ImgProps>`
  height: ${(props) => (props.isSmall ? 18 : 25)}vh;
  margin-bottom: 10px;
`;

const STitle = styled.h2<TitleProps>`
  ${(props) =>
    props.isDisplay
      ? css`
          display: none;
        `
      : css``};
  margin-top: 1.2rem;
  font-size: 1.5vmin;
  text-align: center;

  ${sp`
      display:none;
    `}
  ${tab`
      font-size: 0.01vw;
    `}
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
