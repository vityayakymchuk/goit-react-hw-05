import css from './MovieList.module.css';
import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
     const location = useLocation();
  return (
    <ul className={css.container}>
                {movies.map((movie) => (
                    <li key={movie.id} className={css.item}><Link to={`/movies/${movie.id}`} state={location}><img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
                    <p className={css.name}>{movie.title}</p>
                    </Link>            
</li>
         ))}
      </ul>
  )
}
