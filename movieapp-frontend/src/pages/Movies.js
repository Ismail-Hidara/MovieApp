import React, { useEffect, useState } from "react";
import { fetchPopularMovies, fetchTopRatedMovies, fetchNowPlayingMovies } from "../api";
import { Link } from "react-router-dom";
import "../App.css";

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      setPopularMovies(await fetchPopularMovies());
      setTopRatedMovies(await fetchTopRatedMovies());
      setNowPlayingMovies(await fetchNowPlayingMovies());
      setLoading(false);
    };
    getMovies();
  }, []);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div>
      <h1>Movies</h1>
        {loading ? <p>Loading...</p> : (
        <>
          {/* Popular Movies Section */}
          <section>
            <h2>Popular Movies</h2>
            <div className="movies-container">
              {popularMovies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <Link to={`/details/movie/${movie.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                    <h3>{movie.title}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Top-Rated Movies Section */}
          <section>
            <h2>Top-Rated Movies</h2>
            <div className="movies-container">
              {topRatedMovies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <Link to={`/details/movie/${movie.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                    <h3>{movie.title}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Now Playing Section */}
          <section>
            <h2>Now Playing</h2>
            <div className="movies-container">
              {nowPlayingMovies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <Link to={`/details/movie/${movie.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                    <h3>{movie.title}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Movies;