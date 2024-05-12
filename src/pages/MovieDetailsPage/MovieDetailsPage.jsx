import { Link, Outlet, useParams } from "react-router-dom";
import { fetchMoviesById } from "../../service/api";
import { useEffect, useState } from "react";
// import MovieCast from "../../components/MovieCast/MovieCast";
// import MovieReviews from "../../components/MovieReviews/MovieReviews";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [todo, setTodo] = useState("");
  const photo = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    const getTodo = async () => {
      const data = await fetchMoviesById(movieId);
      setTodo(data);
      console.log(data);
    };

    getTodo();
  }, [movieId]);

  return (
    <div>
      <img src={`${photo}${todo.poster_path}`} alt="ok" />
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
