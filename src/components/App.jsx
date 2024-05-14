import { Route, Routes } from "react-router-dom";

import Navigation from "./Navigation/Navigation";

import MovieReviews from "./MovieReviews/MovieReviews";
import MovieCast from "./MovieCast/MovieCast";
import { Suspense } from "react";

import { easyLazy } from "../service/easylazy";

const HomePage = easyLazy("HomePage");
const MoviesPage = easyLazy("MoviesPage");
const MovieDetailsPage = easyLazy("MovieDetailsPage");
const NotFoundPage = easyLazy("NotFoundPage");

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
