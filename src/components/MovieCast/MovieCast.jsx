import { useEffect, useState } from "react";
import { fetchCreditsById } from "../../service/api";
import { useParams } from "react-router-dom";

import { DNA } from "react-loader-spinner";
import css from "./Moviecast.module.css";
const MovieCast = () => {
  const { movieId } = useParams();

  const photo = "https://image.tmdb.org/t/p/w500/";
  const [loading, setLoading] = useState(false);
  const [cost, setCost] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchCreditsById(movieId);
        setCost(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <>
      {!error && loading && (
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      )}

      {cost.length === 0 ? (
        <>
          <p>No casts yet</p>
        </>
      ) : (
        <>
          <ul className={css.ul}>
            {cost.map((item) => (
              <li key={item.id}>
                <h3 className={css.header}>{item.name}</h3>
                <p className={css.text}>{item.character}</p>
                <img
                  src={
                    item.profile_path === null
                      ? "https://okdiario.com/img/2020/02/26/series-netflix-top-10-1-1.jpg"
                      : `${photo}${item.profile_path}`
                  }
                  alt=""
                  width={100}
                  height={130}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default MovieCast;
