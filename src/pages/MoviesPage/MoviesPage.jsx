import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchSearchMovies } from '../../service/api';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearched, setIsSearched] = useState(false);

  const searchMovies = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setError('Please enter a valid search term');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const searchResults = await fetchSearchMovies(searchQuery);
      if (!searchResults || searchResults.length === 0) {
        setError('No movies found for this search term');
        setMovies([]);
      } else {
        setMovies(searchResults);
        setSearchParams({ query: searchQuery });
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      searchMovies(query);
    }
  }, [query]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies(searchTerm);
    setIsSearched(true);
  };

  return (
    <main className={css.container}>
      <h2>Search Movies</h2>
      <form onSubmit={handleSearch} className={css.searchForm}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Enter movie name"
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && isSearched && <p className={css.error}>{error}</p>}
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
      {!loading && isSearched && movies.length === 0 && !error && (
        <p className={css.message}>No movies found for your search.</p>
      )}
    </main>
  );
};

export default MoviesPage;
