import { useEffect, useState } from "react";
import styled from "styled-components";
import { Loading } from "../atoms/Loading";
import { getData } from "../../hooks/useFireStore";
import { MovieCard } from "./MovieCard";

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

  return (
    <MovieCardArea>
      {movies
        ? movies.map((movie: Movie) => {
            return <MovieCard movie={movie} isSmall={true} />;
          })
        : null}
    </MovieCardArea>
  );
};

const MovieCardArea = styled.div`
  padding-top: 10px;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: 30px 20px;
`;
