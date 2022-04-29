import React, { memo, useEffect } from "react";
import YouTube from "react-youtube";
import styled from "styled-components";
import { getVideo } from "../../hooks/useFetchArray";
import { Loading } from "./Loading";

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
      <YouTube videoId={data.results[0].key} />
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
