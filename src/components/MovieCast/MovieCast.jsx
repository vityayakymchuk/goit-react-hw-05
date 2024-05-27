import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieCredits } from '../../FetchData';
import css from './MovieCast.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';


export default function MovieCast() {
    const { movieId } = useParams();
    const [castList, setCastList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

     useEffect(() => {

        async function fetchData(movieId) {
            try {
                setIsLoading(true);
                setIsError(false);
                const data = await getMovieCredits(movieId);
                setCastList(data);
            } catch (error) {
                setIsError(true);
            } finally { setIsLoading(false) }
            
        }
        fetchData(movieId)

     }, [movieId]);
    
  return (
      <div>
           {isError && <ErrorMessage />}
          {isLoading && <Loader isLoading={isLoading} />}
          <ul className={css.castList}>
      {castList.length > 0 
        ? castList.map(({ id, name, profile_path, character }) => (
          <li key={id} className={css.listItem}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w200${profile_path}`
                  : `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
              }
              alt="actor"
              loading="lazy"
              width='140'
                />
                <div className={css.info}>
                    <h3 className={css.name}>{name}</h3>
            <p className={css.character}> Character: {character}</p>
                </div>
          </li>
        ))
        : "No info"
      }
    </ul>
    </div>
  )
}
