import React, { useEffect, useState } from "react";
import { fetchTrendingAnime, fetchPopularAnime } from "../api";
import "../App.css";

const Anime = () => {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAnime = async () => {
      setTrendingAnime(await fetchTrendingAnime());
      setPopularAnime(await fetchPopularAnime());
      setLoading(false);
    };

    getAnime();
  }, []);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div>
      <h1>Anime</h1>

      {loading ? <p>Loading...</p> : (
        <>
          <section>
            <h2>Trending Anime</h2>
            <div className="movies-container">
              {trendingAnime.map((anime) => (
                <div key={anime.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500/${anime.poster_path}`} alt={anime.name} />
                  <h3>{anime.name}</h3>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>Popular Anime</h2>
            <div className="movies-container">
              {popularAnime.map((anime) => (
                <div key={anime.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500/${anime.poster_path}`} alt={anime.name} />
                  <h3>{anime.name}</h3>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Anime;
