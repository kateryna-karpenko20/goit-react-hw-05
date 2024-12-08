const API_KEY = '59d30dce8ffe78925936b0920166bc43';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error('There was an issue fetching the data');
  }
};

export const fetchTrendingMovies = async () => {
  const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
  const data = await fetchData(url);
  return data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
  return await fetchData(url);
};

export const fetchMovieCast = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
  const data = await fetchData(url);
  return data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`;
  const data = await fetchData(url);
  return data.results;
};

export const fetchSearchMovies = async (searchTerm) => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`;
  const data = await fetchData(url);
  return data.results;
};
