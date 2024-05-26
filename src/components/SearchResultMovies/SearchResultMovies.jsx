import { Link, useLocation } from 'react-router-dom'
import css from './SearchResultMovies.module.css'

export default function SearchResultMovies({ movies }) {
    const location = useLocation();

  return (
      <ul className={css.list}>
          {movies.map(({id, title, 
release_date}) => (
              <li key={id}>
                  <Link to={`/movies/${id}`} state={location}>{title} ({release_date.slice(0, 4)})</Link> 
              </li>
          ))}
    </ul>
  )
}
