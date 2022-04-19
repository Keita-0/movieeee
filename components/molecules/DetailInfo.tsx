import React from "react";
import { VFC } from "react";
import styled from "styled-components";
import { Star } from "../atoms/Star";
import { YoutubeVideo } from "../atoms/YoutubeVideo";
import { DateFormat } from "../../hooks/useDateFormat";

type Props = {
  title: string;
  release_date: string;
  vote_average: string;
  overview: string;
  id: string;
};

export const DetailInfo: VFC<Props> = React.memo((props) => {
  const { title, release_date, vote_average, overview, id } = props;
  return (
    <InfoArea>
      <Titile>{title}</Titile>
      <SDiv>
        <Sp>上映日：{DateFormat(release_date)}</Sp>
        <Star
          rating={Math.round((parseFloat(vote_average) / 2) * 10) / 10}
          size={160}
          isNumber={true}
        />
        <Sp>あらすじ</Sp>
        {overview === "" || overview === undefined || overview === null ? (
          <Sp>情報がありません。</Sp>
        ) : (
          <Sp>{overview}</Sp>
        )}
      </SDiv>
      <YoutubeVideo movieId={id} />
    </InfoArea>
  );
});

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 2vh;
  padding: 0 2vh;
  width: 100%;
`;

const Titile = styled.h2`
  margin-top: 0;
  margin-bottom: 0;
`;

const Sp = styled.p`
  font-size: 15px;
`;

const SDiv = styled.div`
  margin-left: 1%;
`;
