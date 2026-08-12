import "./App.css";
import NavBar from "./components/NavBar";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import { useEffect, useState } from "react";
import { getPopularMovies, searchingMovies } from "./components/api calls/apis";
import Loader from "./components/Loader";
import MovieDetails from "./pages/MovieDetails";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  function Layout() {
  return (
    <>
      <NavBar loadPopularMovies={loadPopularMovies} />
      {loading ? <Loader /> : <Routes>
        <Route path="/" element={<Home movies={movies} setSearch={setSearch} />} />
        <Route path="/Home" element={<Home movies={movies} setSearch={setSearch} />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
      </Routes>}
    </>
  );
}

  

  async function loadPopularMovies() {
    setLoading(true);
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPopularMovies();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      return;
    }
    const searchMovies = async () => {
      setLoading(true);
      try {
        const search_movies = await searchingMovies(search);
        setMovies(search_movies);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    searchMovies();
  }, [search]);

  return (
  <HashRouter>
    <Layout />
  </HashRouter>
);
}

export default App;
