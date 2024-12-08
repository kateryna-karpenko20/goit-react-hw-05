import { Link, Outlet } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = ({ movie }) => {
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
          <li><Link to="cast" className={css.link}>Cast</Link></li>
          <li><Link to="reviews" className={css.link}>Reviews</Link></li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
