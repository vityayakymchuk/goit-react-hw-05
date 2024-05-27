import css from './Navigation.module.css';
import clsx from 'clsx';
import { NavLink } from "react-router-dom";

export default function Navigation() {
      const navLink = ({ isActive }) => {
  return clsx(css.navLink, isActive && css.active);
};

  return (
    <nav className={css.nav}>
         <NavLink className={navLink} to="/">Home</NavLink>
        <NavLink className={navLink} to="/movies">Movies</NavLink>
      </nav>
  )
}
