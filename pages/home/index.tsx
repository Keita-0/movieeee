import type { NextPage } from "next";
import React from "react";
import styled from "styled-components";
import { PicUpMovies } from "../../components/organisms/PicUpMovies";

const Patterns = [
  { key: "now_playing", word: "上映中" },
  { key: "top_rated", word: "評価が高い" },
  { key: "upcoming", word: "上映予定" },
];

const Home: NextPage = () => {
  return (
    <Body>
      {Patterns.map((pattern) => {
        return <PicUpMovies key={pattern.key} pattern={pattern} />;
      })}
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1.5rem 2rem;
  @media (max-width: 560px) {
    padding: 1.5rem 1.5rem;
  }
`;

export default Home;
