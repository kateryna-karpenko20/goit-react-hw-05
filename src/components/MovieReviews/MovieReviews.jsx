import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Для отримання movieId з параметрів URL
import { fetchMovieReviews } from '../../service/api';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();  // Отримуємо movieId
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      if (!movieId) {
        setError('Movie ID is not available');
        setLoading(false);
        return;
      }
      console.log('Fetching reviews for movieId:', movieId);  // Лог для перевірки movieId
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        console.log('Fetched reviews data:', reviewsData);  // Лог для перевірки отриманих даних
        setReviews(reviewsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reviews:', err);  // Лог помилки
        setError('Failed to load reviews');
        setLoading(false);
      }
    };

    getReviews();
  }, [movieId]);  // Додаємо movieId як залежність, щоб викликати fetch при його зміні

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={css.reviewsContainer}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className={css.review}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default MovieReviews;
