import type { NextPage } from "next";
import React from "react";
import styled from "styled-components";

const Patterns = [
  { key: "now_playing", word: "上映中" },
  { key: "popular", word: "人気" },
  { key: "top_rated", word: "評価が高い" },
  { key: "upcoming", word: "上映予定" },
];

const Home: NextPage = () => {
  return (
    <Body>
      {Patterns.map((pattern) => {
        // return <PicUpMovies pattern={pattern} />;
        return <div>test</div>;
      })}
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1.5rem 2rem;
  margin-bottom: 5vh;
`;

export default Home;
