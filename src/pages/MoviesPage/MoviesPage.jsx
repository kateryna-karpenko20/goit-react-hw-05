import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchMovies } from '../../api/api';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const searchResults = await fetchSearchMovies(searchTerm);
      setMovies(searchResults);
      setSearchParams({ query: searchTerm });
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <h2>Search Movies</h2>
      <form onSubmit={handleSearch} className={css.searchForm}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Enter movie name"
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}
      {movies.length > 0 && (
        <ul className={css.movieList}>
          {movies.map((movie) => (
            <li key={movie.id} className={css.movieItem}>
              <Link to={`/movies/${movie.id}`} className={css.movieLink}>
                {movie.title || movie.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
