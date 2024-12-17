import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation/Navigation';
import MovieCast from './components/MovieCast/MovieCast';
import MovieReviews from './components/MovieReviews/MovieReviews';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  return (
    <div className="app-container">
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
  <Route path="cast" element={<MovieCast />} />
              <Route
              path="reviews"
              element={<MovieReviews />}
              // Додаємо лог для перевірки movieId
              onEnter={({ params }) => console.log('MovieId for reviews:', params.movieId)}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
