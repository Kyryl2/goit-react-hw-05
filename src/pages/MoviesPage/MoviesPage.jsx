import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../../service/api";
import { Blocks } from "react-loader-spinner";
import { ErrorMessage } from "formik";

const MoviesPage = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const film = searchParams.get("query");

  useEffect(() => {
    async function fetchUser() {
      if (film === "") return;
      try {
        setFilms([]);

        setIsError(false);

        setIsLoading(true);

        const films = await fetchMoviesByQuery(film);
        setFilms(films);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [film]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams({ query: form.elements.film.value });
    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="film" placeholder="search film" />
        <button type="submit">search</button>
      </form>
      {isLoading && (
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
      {films.length === 0 && <h1>Nothing here</h1>}
      {films.length !== 0 && <MovieList movies={films} />}
      {isError && <ErrorMessage />}
    </>
  );
};

export default MoviesPage;
