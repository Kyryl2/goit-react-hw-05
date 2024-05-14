import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendMovies } from "../../service/api";
import { Blocks } from "react-loader-spinner";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendMovies = async () => {
      const data = await fetchTrendMovies();

      setMovies(data);
    };
    getTrendMovies();
  }, []);
  return (
    <>
      {!movies && (
        <Blocks
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
      )}
      {movies.length > 0 && (
        <>
          <h1>Trending today</h1>
          <MovieList movies={movies} />
        </>
      )}
    </>
  );
};

export default HomePage;
