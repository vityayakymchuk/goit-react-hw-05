import { useEffect, useState } from 'react'
import { getPopular } from '../../FetchData'
import css from './HomePage.module.css'
import { Link, useLocation } from "react-router-dom";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Loader from '../../components/Loader/ Loader';

export default function HomePage() {

    const [films, setFilms] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                setIsError(false);
                const data = await getPopular();
                setFilms(data)
            } catch (error) {
                 setIsError(true);
            } finally {setIsLoading(false)}
            
        }
        fetchData()
    }, []);
    
    return (
        <div>
            <h2 className={css.title}>Trending today</h2>
            {isError && <ErrorMessage />}
            {isLoading && <Loader isLoading={isLoading} />}
            <ul className={css.container}>
                {films.map((movie) => (
                    <li key={movie.id} className={css.item}><Link to={`/movies/${movie.id}`} state={location}><img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
                    <p className={css.name}>{movie.title}</p>
                    </Link>            
</li>
         ))}
      </ul>
      </div>
      
  )
}
