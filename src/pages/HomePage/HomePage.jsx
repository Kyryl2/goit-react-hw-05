import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendMovies } from "../../service/api";

const HomePage = () => {
  const [movies, setMovies] = useState("");

  useEffect(() => {
    const getTrendMovies = async () => {
      const data = await fetchTrendMovies();

      setMovies(data);
    };
    getTrendMovies();
  }, []);
  return (
    <>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
