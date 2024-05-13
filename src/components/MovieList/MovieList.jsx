import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <div>
      <ul>
        {movies.length === 0 ? (
          <></>
        ) : (
          movies.map((item) => (
            <li key={item.id}>
              <Link to={`/movies/${item.id}`} state={location}>
                {item.original_title}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MovieList;
