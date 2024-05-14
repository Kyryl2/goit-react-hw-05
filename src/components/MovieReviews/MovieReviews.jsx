import { useEffect, useState } from "react";
import { fetchReviewsById } from "../../service/api";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const { movieId } = useParams();

  const [info, setInfo] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      const data = await fetchReviewsById(movieId);
      setInfo(data);
    };
    fetchReviews();
  }, [movieId]);

  return (
    <>
      {!info && <p>Downoload</p>}

      {info.length === 0 ? (
        <>
          <p>No reviews yet</p>
        </>
      ) : (
        <>
          <ul>
            {info.map((item) => (
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
