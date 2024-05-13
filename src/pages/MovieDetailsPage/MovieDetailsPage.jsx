import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { fetchMoviesById } from "../../service/api";
import { useEffect, useRef, useState } from "react";

const MovieDetailsPage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [todo, setTodo] = useState("");
  const photo = "https://image.tmdb.org/t/p/w500/";
  const location = useLocation();
  // const locationRef = useRef(location.state || "/");
  const backLinkHref = location.state ?? "/";

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
      {!todo ? (
        <></>
      ) : (
        <>
          <div>
            {" "}
            <button type="button" onClick={() => navigate(backLinkHref)}>
              Go back
            </button>
          </div>

          <img
            src={
              todo.poster_path === null
                ? "https://okdiario.com/img/2020/02/26/series-netflix-top-10-1-1.jpg"
                : `${photo}${todo.poster_path}`
            }
            alt="ok"
            width={250}
            height={330}
          />
          <h2>{todo.original_title}</h2>
          <p>User score: {Math.ceil(todo.vote_average * 10)}%</p>
          <p>{todo.overview}</p>
          <ul>
            {todo.genres.map((item) => (
              <li key={item.id}>{item.name} </li>
            ))}
          </ul>
        </>
      )}
      <h3>Additional information</h3>
      <ul>
        <li>
          <Link to={`/movies/${movieId}/cast`} state={location}>
            Cast{" "}
          </Link>
        </li>
        <li>
          <Link to={`/movies/${movieId}/reviews`} state={location}>
            Reviews{" "}
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
