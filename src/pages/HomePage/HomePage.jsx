import { useEffect, useState } from 'react'
import { getPopular } from '../../FetchData'
import css from './HomePage.module.css'

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Loader from '../../components/Loader/ Loader';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {

    const [films, setFilms] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
   

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
            <MovieList movies={films} />
      </div>
      
  )
}
