import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../service/api';
import css from './MovieReviews.module.css';

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewData = await fetchMovieReviews(movieId);
        setReviews(reviewData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load reviews');
        setLoading(false);
      }
    };

    getReviews();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul className={css.reviewList}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <li key={review.id} className={css.reviewItem}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
            <p className={css.date}>
              Published on: {new Date(review.created_at).toLocaleDateString()}
            </p>
          </li>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </ul>
  );
};

export default MovieReviews;
