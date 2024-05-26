import { Routes, Route, NavLink } from "react-router-dom";
import { lazy, Suspense } from "react";
import css from './App.module.css';
import clsx from 'clsx';
import Loader from './components/Loader/ Loader';



const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('../src/components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../src/components/MovieReviews/MovieReviews'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));




function App() {
 
  const navLink = ({ isActive }) => {
  return clsx(css.navLink, isActive && css.active);
};

  return (
    <>
      <nav className={css.nav}>
         <NavLink className={navLink} to="/">Home</NavLink>
        <NavLink className={navLink} to="/movies">Movies</NavLink>
      </nav>

      <Suspense fallback={<Loader/>}>
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />}/>
              <Route path="reviews" element={<MovieReviews />}/>
          </Route>
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
    </>
  )
}

export default App
