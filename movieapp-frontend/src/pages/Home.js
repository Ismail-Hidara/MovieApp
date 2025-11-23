import React, { useEffect, useState } from "react";
import {
  fetchTrendingMovies,
  fetchTrendingTVShows,
  fetchTrendingAnime,
  fetchTrendingManga,
} from "../api";
import MediaCard from "../components/MediaCard";
import RecommendationSection from "../components/RecommendationSection";


const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [anime, setAnime] = useState([]);
  const [manga, setManga] = useState([]);
  const [userId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchAll = async () => {
      setAnime(await fetchTrendingAnime());
      setManga(await fetchTrendingManga());
      setMovies(await fetchTrendingMovies());
      setTVShows(await fetchTrendingTVShows());
    };

    fetchAll();
  }, []);

  const renderSection = (title, items, type, isAniList = false) => (
    <div className="trending-block">
      <h2 className="section-title">{title}</h2>
      <div className="media-grid">
        {items.map((item, index) => (
          <MediaCard
            key={index}
            item={item}
            type={type}
            isAniList={isAniList}
          />
        ))}
      </div>
    </div>
  );

  return (
  <div className="homepage">
    <RecommendationSection userId={userId} />
    {renderSection("🔥 Trending Movies", movies, "movie")}
    {renderSection("📺 Trending TV Shows", tvShows, "tv")}
    {renderSection("🎌 Trending Anime", anime, "anime", true)}
    {renderSection("📚 Trending Manga", manga, "manga", true)}
  </div>
);

};

export default HomePage;
