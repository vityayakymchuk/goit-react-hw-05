import { useEffect, useState } from 'react'
import css from './MoviesPage.module.css'
import { getMovie } from '../../FetchData'
import SearchMovie from '../../components/SearchMovie/SearchMovie';
import { useSearchParams } from "react-router-dom";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';

export default function MoviesPage() {

  const [searchQuery, setSearchQuery] = useSearchParams('');
  const query = searchQuery.get("search") ?? "";
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [check, setCheck] = useState(1)
  

  useEffect(() => {
    if (query === "" ) {
      return
    }
    async function fetchData(query) {
      try {setIsLoading(true);
              setIsError(false);
              const data = await getMovie(query);
              setMovies(data.results)
              setCheck(data.total_results)
            } catch (error) {setIsError(true)} finally {setIsLoading(false);}
            
        }
        fetchData(query)
  }, [query])
  
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.currentTarget.movieName.value;
    setSearchQuery({search: searchValue})
    e.currentTarget.reset()
  };
  

  return (
    <div>
      <SearchMovie handleSubmit={handleSubmit} />
      {check === 0 && <p className={css.check}>There is no movies with this request. Please, try again</p>}
      {isError && <ErrorMessage />}
      {isLoading && <Loader isLoading={isLoading} />}
      <MovieList movies={movies} />
    </div>
  )
}
