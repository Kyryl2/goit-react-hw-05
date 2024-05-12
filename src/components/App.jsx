import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Navigation from "./Navigation/Navigation";
import MovieList from "./MovieList/MovieList";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";
import MovieReviews from "./MovieReviews/MovieReviews";
import MovieCast from "./MovieCast/MovieCast";

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="/movies/:movieId/cast" element={<MovieCast />} />
          <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
