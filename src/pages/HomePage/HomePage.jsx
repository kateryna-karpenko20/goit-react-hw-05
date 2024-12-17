import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../service/api';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  if (loading) {
    return <p>Loading trending movies...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={css.container}>
      <h1 className={css.title}>Trending today</h1>
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p className={css.noMovies}>No trending movies available at the moment.</p>
      )}
    </div>
  );
};

export default HomePage;
