import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div>
      {movies.length === 0 ? (
        <p role="alert">No movies available. Please search for a movie.</p>
      ) : (
        <ul className={css.list} aria-label="Movie list">
          {movies.map(movie => (
            <li key={movie.id} className={css.item}>
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: location }}
                className={css.link}
              >
                {/* {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className={css.poster}
                  />
                ) : (
                  <div className={css.placeholder}>No Image</div>
                )} */}
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieList;
