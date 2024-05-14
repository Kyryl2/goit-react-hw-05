import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { fetchMoviesById } from "../../service/api";
import { useEffect, useRef, useState } from "react";
import { DNA } from "react-loader-spinner";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
const MovieDetailsPage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const photo = "https://image.tmdb.org/t/p/w500/";
  const location = useLocation();
  const locationRef = useRef(location.state || "/");

  useEffect(() => {
    const getFilms = async () => {
      try {
        setFilms([]);

        setError(false);

        setLoading(true);

        const data = await fetchMoviesById(movieId);
        setFilms(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getFilms();
  }, [movieId]);

  return (
    <div>
      {error && <NotFoundPage />}
      {loading ? (
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      ) : (
        <div className={css.bigContainer}>
          <div className={css.thumb}>
            <button type="button" onClick={() => navigate(locationRef.current)}>
              Go back
            </button>
            <div className={css.overlay}>
              <img
                src={
                  films.poster_path === null
                    ? "https://okdiario.com/img/2020/02/26/series-netflix-top-10-1-1.jpg"
                    : `${photo}${films.poster_path}`
                }
                alt="ok"
                width={350}
                height={430}
              />
            </div>
          </div>
          <div className={css.infoContainer}>
            <h2>{films.original_title}</h2>
            <p>User score: {Math.round(films.vote_average * 10)}%</p>
            <p>{films.overview}</p>
            <ul>
              {films.length !== 0 &&
                films.genres.map((item) => <li key={item.id}>{item.name} </li>)}
            </ul>
          </div>
        </div>
      )}
      <h3>Additional information</h3>
      <ul>
        <li>
          <NavLink
            to={`/movies/${movieId}/cast`}
            state={location}
            className={(isActive) => buildLinkClass(isActive)}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/movies/${movieId}/reviews`}
            state={location}
            className={(isActive) => buildLinkClass(isActive)}
          >
            Reviews
          </NavLink>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
