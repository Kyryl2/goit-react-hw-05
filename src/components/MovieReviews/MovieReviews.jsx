import { useEffect, useState } from "react";
import { fetchReviewsById } from "../../service/api";
import { useParams } from "react-router-dom";
import { DNA } from "react-loader-spinner";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [info, setInfo] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchReviewsById(movieId);
        setInfo(data);
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
      {loading && (
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      )}

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
