import { useEffect, useState } from "react";
import { fetchTrendMovies } from "../../service/api";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState("");

  useEffect(() => {
    const getTrendMovies = async () => {
      const data = await fetchTrendMovies();

      setMovies(data);
    };
    getTrendMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        {movies.length === 0 ? (
          <h2>Nothing</h2>
        ) : (
          movies.map((item) => (
            <li key={item.id}>
              <Link to={`/movies/${item.id}`}>{item.original_title}</Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MovieList;
