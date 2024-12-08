import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../api/api';
import css from './MovieCast.module.css';

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        const castData = await fetchMovieCast(movieId);
        setCast(castData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load cast information');
        setLoading(false);
      }
    };

    getCast();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul className={css.castList}>
      {cast.length > 0 ? (
        cast.map((actor) => (
          <li key={actor.id} className={css.castItem}>
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
                className={css.castImage}
              />
            ) : (
              <div className={css.noImage}>No Image</div>
            )}
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))
      ) : (
        <p>No cast information available.</p>
      )}
    </ul>
  );
};

export default MovieCast;
