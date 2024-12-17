import { useParams, Link, Outlet, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../../service/api';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

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

      <div className={css.additional}>
        <h4>Additional information</h4>
        <ul>
          <li>
            <NavLink to="cast" className={({ isActive }) => (isActive ? css.activeLink : css.link)}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={({ isActive }) => (isActive ? css.activeLink : css.link)}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;

