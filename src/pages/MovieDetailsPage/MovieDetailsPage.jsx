import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { fetchMoviesById } from "../../service/api";
import { useEffect, useRef, useState } from "react";
import { Blocks } from "react-loader-spinner";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
const MovieDetailsPage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [todo, setTodo] = useState("");
  const photo = "https://image.tmdb.org/t/p/w500/";
  const location = useLocation();
  const locationRef = useRef(location.state || "/");

  useEffect(() => {
    const getTodo = async () => {
      const data = await fetchMoviesById(movieId);
      setTodo(data);
    };

    getTodo();
  }, [movieId]);

  return (
    <div>
      {!todo ? (
        <>
          <Blocks
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
        </>
      ) : (
        <>
          <div>
            <button type="button" onClick={() => navigate(locationRef.current)}>
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
          <NavLink
            to={`/movies/${movieId}/cast`}
            state={location}
            className={(isActive) => buildLinkClass(isActive)}
          >
            Cast{" "}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/movies/${movieId}/reviews`}
            state={location}
            className={(isActive) => buildLinkClass(isActive)}
          >
            Reviews{" "}
          </NavLink>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
