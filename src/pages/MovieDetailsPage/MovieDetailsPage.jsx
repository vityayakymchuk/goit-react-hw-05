import { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { getMovieDetails } from '../../FetchData';
import Loader from '../../components/Loader/ Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './MovieDetailsPage.module.css';
import { RiArrowGoBackFill } from "react-icons/ri";

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const backLinkHref = useRef(location.state ?? "/movies");
        

    useEffect(() => {
        if (!movieId) { return };

        async function fetchData() {
            try {
                setIsLoading(true);
                setIsError(false);
                const data = await getMovieDetails(movieId);
                setMovieDetails(data);
            } catch (error) {
                setIsError(true);
            } finally { setIsLoading(false) }
            
        }
        fetchData()

    }, [movieId]);

    const {original_title, overview, genres, poster_path, vote_average, release_date
    } = movieDetails;
    const year = release_date ? release_date.slice(0, 4) : 'Unknown';
 
  return (
      <div>
        {isError && <ErrorMessage />}
          {isLoading && <Loader isLoading={isLoading} />}
          <Link to={backLinkHref.current}><p className={css.back}><RiArrowGoBackFill /> Go back</p></Link>
          <div className={css.container}>
              <img className={css.img} src={poster_path
                    ? `https://image.tmdb.org/t/p/w300${poster_path}`
                    : `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`} 
                  loading='lazy' alt='Movie poster'/>
              <div className={css.info}>
                  <h2>{original_title} ({year})</h2>
              <p>User score: {Number(vote_average).toFixed(2)}</p>
              <h3>Overview</h3>
              <p>{overview}</p>
              <h3>Genres</h3>
              <ul className={css.genreList}>
               {genres && genres.length && genres.map(({ id, name }) => <li key={id}>{name}</li>)}
                </ul>
              </div>
          </div>
          <div className={css.info}>
              <h2 className={css.title}>Additional information</h2>
              <ul className={css.list}>
                  <li className={css.link}><Link to='cast'>Cast</Link>
                  </li>
                  <li className={css.link}><Link to='reviews'>Reviews</Link>
                  </li>
              </ul>
              <Suspense fallback={<Loader/>}>
                  <Outlet />
              </Suspense> 
          </div>
          </div>
  )
}
