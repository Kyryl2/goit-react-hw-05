import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendMovies } from "../../service/api";
import { DNA } from "react-loader-spinner";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTrendMovies = async () => {
      try {
        setMovies([]);

        setError(false);

        setLoading(true);

        const data = await fetchTrendMovies();
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getTrendMovies();
  }, []);
  return (
    <>
      {loading && (
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      )}
      {!error && movies.length > 0 && (
        <>
          <h1>Trending today</h1>
          <MovieList movies={movies} />
        </>
      )}
    </>
  );
};

export default HomePage;
