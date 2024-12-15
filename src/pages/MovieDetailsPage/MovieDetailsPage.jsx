import { useParams, Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../../service/api';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [showCast, setShowCast] = useState(false); // состояние для отображения кастов
  const [showReviews, setShowReviews] = useState(false); // состояние для отображения отзывов

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
      } catch (err) {
        setError('Failed to fetch movie details');
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  // Функции для переключения состояния видимости
  const toggleCast = () => setShowCast((prev) => !prev);
  const toggleReviews = () => setShowReviews((prev) => !prev);

  return (
    <div className={css.container}>
      <button className={css.goBack}>
        <Link to="/">Go back</Link>
      </button>
      <div className={css.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={css.poster}
        />
        <div>
          <h2 className={css.title}>{movie.title} ({movie.release_date.split('-')[0]})</h2>
          <p className={css.score}>User Score: {movie.vote_average * 10}%</p>
          <h3 className={css.subtitle}>Overview</h3>
          <p className={css.overview}>{movie.overview}</p>
          <h3 className={css.subtitle}>Genres</h3>
          <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>

      {/* Кнопки для переключения отображения Cast и Reviews */}
      <div className={css.additional}>
        <h4>Additional information</h4>
        <ul>
          <li>
            <button onClick={toggleCast} className={css.link}>
              {showCast ? 'Hide Cast' : 'Show Cast'}
            </button>
          </li>
          <li>
            <button onClick={toggleReviews} className={css.link}>
              {showReviews ? 'Hide Reviews' : 'Show Reviews'}
            </button>
          </li>
        </ul>
      </div>

      {/* Отображаем компоненты только если состояние true */}
      {showCast && (
        <div className={css.cast}>
          <h4>Cast</h4>
          <MovieCast movieId={movieId} />
        </div>
      )}

      {showReviews && (
        <div className={css.reviews}>
          <h4>Reviews</h4>
          <MovieReviews movieId={movieId} />
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
