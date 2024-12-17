import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  return (
    <div>
      {movies.length === 0 ? (
        <p>No movies available.</p>
      ) : (
        <ul className={css.list}>
          {movies.map(movie => (
            <li key={movie.id} className={css.item}>
              <Link to={`/movies/${movie.id}`} className={css.link}>
                {/* Додамо зображення, якщо воно є */}
                {/* {movie.poster_path && (
                  <img 
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                    alt={movie.title} 
                    className={css.poster} 
                  />
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
