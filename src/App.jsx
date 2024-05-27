import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from '../src/components/Loader/ Loader';
import Navigation from "./components/Navigation/Navigation";



const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('../src/components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../src/components/MovieReviews/MovieReviews'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));




function App() {
  

  return (
    <>
      
     <Navigation/>
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
