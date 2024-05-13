import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../../service/api";

const MoviesPage = () => {
  const [films, setFilms] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const film = searchParams.get("query");

  useEffect(() => {
    if (film === "") return;

    async function fetchUser() {
      const films = await fetchMoviesByQuery(film);
      setFilms(films);
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
      {films && <MovieList movies={films} />}
    </>
  );
};

export default MoviesPage;
