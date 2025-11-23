import React, { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api";
import "../App.css";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data);
    };
    getMovies();
  }, []);

    return (
    <div>
      <h1>Trending Movies</h1>
      <div className="movies-container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <h3>{movie.title}</h3>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
    );
};

export default Home;
