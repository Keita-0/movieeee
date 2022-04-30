import React, { memo, useEffect } from "react";
import YouTube from "react-youtube";
import styled from "styled-components";
import { getVideo } from "../../hooks/useFetchArray";
import { Loading } from "./Loading";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

// eslint-disable-next-line react/display-name
export const YoutubeVideo = memo((props: any) => {
  const { movieId } = props;

  console.log(movieId);

  const { data, error, isLoading, isEmpty } = getVideo(movieId);

  if (isLoading) {
    return <Loading />;
  } else {
    if (data.results.length === 0 || data.results[0].site !== "YouTube") {
      return null;
    }
  }

  return (
    <VideoArea>
      <VideoLabel>予告</VideoLabel>
      <LiteYouTubeEmbed id={data.results[0].key} title={""} />
    </VideoArea>
  );
});

const VideoLabel = styled.h3`
  border-bottom: 1px solid #cccccc;
`;

const VideoArea = styled.div`
  width: 100%;
  margin-top: 6vh;
`;
