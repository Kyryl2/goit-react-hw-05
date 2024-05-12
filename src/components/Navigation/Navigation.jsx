import { NavLink } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";

import css from "./Navigation.module.css";

import clsx from "clsx";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <div>
      <header className={css.header}>
        <NavLink
          className={(isActive) => buildLinkClass(isActive)}
          to="/"
          element={<HomePage />}
        >
          Home
        </NavLink>
        <NavLink
          className={(isActive) => buildLinkClass(isActive)}
          to="/movies"
          element={<MoviesPage />}
        >
          Movies
        </NavLink>
      </header>
    </div>
  );
};

export default Navigation;
