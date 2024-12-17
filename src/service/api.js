const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWQzMGRjZThmZmU3ODkyNTkzNmIwOTIwMTY2YmM0MyIsIm5iZiI6MTczMzY1MDk5Ni4yODMsInN1YiI6IjY3NTU2YTM0MDk4MmI0NjI2NzhhMDViMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZHd6r0GPOx9sgwWPlrXzObFko6e7uJfFtVnnpD4qHPk';
const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Общая функция для выполнения запросов к API TMDB.
 */
const fetchWithToken = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,  // використовується ваш токен
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('There was an issue fetching the data');
  }
};

// Запрос на получение трендовых фильмов
export const fetchTrendingMovies = async () => {
  const url = `${BASE_URL}/trending/movie/day`;
  const data = await fetchWithToken(url);
  return data.results;
};

// Запрос на получение деталей фильма
export const fetchMovieDetails = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}`;
  return await fetchWithToken(url);
};

// Запрос на получение актеров фильма
export const fetchMovieCast = async (movieId) => {
  if (!movieId) {
    throw new Error('movieId is required');
  }

  const url = `${BASE_URL}/movie/${movieId}/credits`;
  console.log('Fetching cast for movieId:', movieId);  // Лог для перевірки
  try {
    const data = await fetchWithToken(url);
    return data.cast || [];
  } catch (error) {
    console.error('Error fetching movie cast:', error);
    throw new Error('Failed to fetch cast');
  }
};


// Запрос на получение отзывов фильма

// Додаємо функцію для отримання відгуків
export const fetchMovieReviews = async (movieId) => {
  if (!movieId) {
    throw new Error('Movie ID is required');
  }

  const url = `${BASE_URL}/movie/${movieId}/reviews`;
  try {
    const data = await fetchWithToken(url);
    return data.results || [];
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw new Error('Failed to fetch reviews');
  }
};



// Запрос на поиск фильмов
export const fetchSearchMovies = async (searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    throw new Error('Search term cannot be empty');
  }

  const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}`;
  console.log(`Fetching movies with query: ${searchTerm}`);
  const data = await fetchWithToken(url); // Или используйте fetchData
  if (!data.results || data.results.length === 0) {
    console.warn('No results found for query:', searchTerm);
  }
  return data.results;
};
