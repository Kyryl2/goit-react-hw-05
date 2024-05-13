import { useEffect, useState } from "react";
import { fetchCreditsById } from "../../service/api";
import { useParams } from "react-router-dom";
import { BiFontSize } from "react-icons/bi";

const MovieCast = () => {
  const { movieId } = useParams();
  const photo = "https://image.tmdb.org/t/p/w500/";

  const [todo, setTodo] = useState("");
  useEffect(() => {
    const fetchReviews = async () => {
      const data = await fetchCreditsById(movieId);
      setTodo(data.cast);
      console.log(data.cast);
    };
    fetchReviews();
  }, [movieId]);

  return (
    <>
      {!todo && <p>Downoload</p>}

      {todo.length === 0 ? (
        <>
          <p>No casts yet</p>
        </>
      ) : (
        <>
          <ul
            style={{
              width: 1000,
              flexWrap: "wrap",
              display: "flex",
              flexDirection: "row",
              gap: 20,
            }}
          >
            {todo.map((item) => (
              <li key={item.id}>
                <h3 style={{ fontSize: 13, fontWeight: 500 }}>{item.name}</h3>
                <p>{item.character}</p>
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
