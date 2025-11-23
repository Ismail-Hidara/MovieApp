import React, { useEffect, useState } from "react";
import { fetchTrendingTVShows, fetchPopularTVShows, fetchTopRatedTVShows } from "../api";
import { Link } from "react-router-dom";
import "../App.css";

const TVShows = () => {
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [topRatedTVShows, setTopRatedTVShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTVShows = async () => {
      setTrendingTVShows(await fetchTrendingTVShows());
      setPopularTVShows(await fetchPopularTVShows());
      setTopRatedTVShows(await fetchTopRatedTVShows());
      setLoading(false);
    };

    getTVShows();
  }, []);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div>
      <h1>TV Shows</h1>

      {loading ? <p>Loading...</p> : (
        <>
          <section>
            <h2>Trending TV Shows</h2>
            <div className="movies-container">
              {trendingTVShows.map((show) => (
                <div key={show.id} className="movie-card">
                  <Link to={`/details/tv/${show.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt={show.name} />
                    <h3>{show.name}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </section>


          <section>
            <h2>Popular TV Shows</h2>
            <div className="movies-container">
              {popularTVShows.map((show) => (
                <div key={show.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt={show.name} />
                  <h3>{show.name}</h3>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>Top-Rated TV Shows</h2>
            <div className="movies-container">
              {topRatedTVShows.map((show) => (
                <div key={show.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt={show.name} />
                  <h3>{show.name}</h3>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default TVShows;
