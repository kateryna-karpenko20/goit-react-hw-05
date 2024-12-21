import { useParams, Link, Outlet, useLocation } from 'react-router-dom'; // без NavLink
import { useEffect, useState, useRef } from 'react';
import { fetchMovieDetails } from '../../service/api';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const prevLocation = useRef(location);

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

  const handleGoBack = () => {
    if (prevLocation.current.pathname === location.pathname) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div className={css.container}>
      <button className={css.goBack} onClick={handleGoBack}>
        <span>Go back</span>
      </button>

      <div className={css.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={css.poster}
        />
        <div>
          <h2 className={css.title}>
            {movie.title} ({movie.release_date.split('-')[0]})
          </h2>
          <p className={css.score}>User Score: {movie.vote_average * 10}%</p>
          <h3 className={css.subtitle}>Overview</h3>
          <p className={css.overview}>{movie.overview}</p>
          <h3 className={css.subtitle}>Genres</h3>
          <p>{movie.genres.map((genre) => genre.name).join(', ')}</p>
        </div>
      </div>

      <div className={css.additional}>
        <h4>Additional information</h4>
        <ul>
          <li>
            <Link to="cast" className={css.link}>Cast</Link>
          </li>
          <li>
            <Link to="reviews" className={css.link}>Reviews</Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;

