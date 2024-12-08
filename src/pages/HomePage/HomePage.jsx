import css from './HomePage.module.css';
import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../api/api';
import MovieList from '../../components/MovieList/MovieList';


const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (err) {
        setError(err.message);
      }
    };
    getMovies();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
<div className={css.container}>
      <h1 className={css.title}>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
