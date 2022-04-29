import styled from "styled-components";
import { getPicUpMovies } from "../../hooks/useFetchArray";
import { MovieCard } from "../molecules/MovieCard";
import { MoreButton } from "../atoms/button/MoreButton";
import { Loading } from "../atoms/Loading";
import { useRouter } from "next/router";
import { memo } from "react";

type Props = { pattern: { key: string; word: string } };

// eslint-disable-next-line react/display-name
export const PicUpMovies = memo((props: Props) => {
  const { pattern } = props;
  const router = useRouter();
  const { data, error, isLoading, isEmpty } = getPicUpMovies(pattern.key);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>取得に失敗しました。</div>;
  }

  if (isEmpty) {
    return <div>該当するデータが見つかりません。</div>;
  }

  const onClickMore = () => {
    router.push({
      pathname: `/home/${pattern.key}&page=1`,
      query: pattern.key,
    });
  };

  return (
    <MovieListArea>
      <LabelContainer>
        <SLabel>{pattern.word}の映画</SLabel>
        {data.results.length > 8 ? <MoreButton onClick={onClickMore} /> : null}
      </LabelContainer>
      <MovieContainer>
        <MovieCardArea>
          {data.results.map((movie: any, i: Number) => {
            //8つの映画を表示
            if (i < 8) {
              return <MovieCard key={movie.id} movie={movie} isSmall={true} />;
            }
          })}
        </MovieCardArea>
      </MovieContainer>
    </MovieListArea>
  );
});

const LabelContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
  width: 100%;
`;

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  width: 100%;
`;

const SLabel = styled.label`
  /* margin-left: 4vw; */
  font-size: 20px;
  padding-left: 2%;
  padding-right: 2%;
  border-bottom: 2px solid #cccccc;
  font-weight: bold;
`;

const MovieCardArea = styled.div`
  padding-top: 10px;
  width: 100%;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: 10px 20px;
`;

const MovieListArea = styled.div`
  width: 70%;
  margin-bottom: 4%;
`;
