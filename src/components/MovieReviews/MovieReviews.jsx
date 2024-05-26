import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieReviews } from '../../FetchData';
import css from './MovieReviews.module.css';
import Loader from '../../components/Loader/ Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { FaRegUser } from "react-icons/fa";

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        async function fetchData(movieId) {
            try {
                setIsLoading(true);
                setIsError(false);
                const data = await getMovieReviews(movieId);
                setReviews(data);
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
          <ul className={css.list}>
                { reviews.length > 0 
                    ? reviews.map(({author, content, id}) => (
                            <li key={id} className={css.item}>
                                <p className={css.name}><FaRegUser className={css.icon}/>{author}</p>
                                <p className={css.content}>{content}</p>
                            </li>
                        ))
                    : <p>Any reviews here</p>
                }
            </ul>
    </div>
  )
}
