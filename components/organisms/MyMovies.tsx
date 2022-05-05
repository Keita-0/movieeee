import { useEffect, useState } from "react";
import styled from "styled-components";
import { Loading } from "../atoms/Loading";
import { getData } from "../../hooks/useFireStore";
import { MovieCard } from "../../components/molecules/MovieCard";

type Movie = {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
};

export const MyMovies = () => {
  const [isLoading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>();
  useEffect(() => {
    getData()
      .then((result) => {
        setMovies(result);
        setLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  console.log(movies?.length);

  return (
    <>
      {movies?.length !== 0 && typeof movies !== "undefined" ? (
        <MovieCardArea>
          {movies.map((movie: Movie) => {
            return <MovieCard key={movie.id} movie={movie} isSmall={true} />;
          })}
        </MovieCardArea>
      ) : (
        <p>ブックマークしている映画はありません。</p>
      )}
    </>
  );
};

const MovieCardArea = styled.div`
  padding-top: 10px;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: 2vw 0.5vw;
  @media (max-width: 560px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    grid-gap: 3vw 1vw;
  }
`;
