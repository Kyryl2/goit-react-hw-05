import { useEffect, useState } from "react";
import { fetchReviewsById } from "../../service/api";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const { movieId } = useParams();

  const [todo, setTodo] = useState("");
  useEffect(() => {
    const fetchReviews = async () => {
      const data = await fetchReviewsById(movieId);
      setTodo(data);
      console.log(data);
    };
    fetchReviews();
  }, [movieId]);

  return (
    <>
      {!todo && <p>Downoload</p>}

      {todo.length === 0 ? (
        <>
          <p>No reviews yet</p>
        </>
      ) : (
        <>
          <ul>
            {todo.map((item) => (
              <li key={item.id}>
                <h3>Author: {item.author}</h3>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default MovieReviews;
