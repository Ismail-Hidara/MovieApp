import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/watchlist/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWatchlist(res.data);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };

    fetchWatchlist();
  }, [userId, token]);

  const getPosterUrl = (posterPath) => {
    if (!posterPath) return "/fallback.jpg";
    return posterPath.startsWith("/")
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : posterPath;
  };

  const getLink = (item) => {
    return `/${item.mediaType}/${item.mediaId}`;
  };

  const groupByType = (type) => {
    return watchlist.filter(item => item.mediaType === type);
  };

  const renderGroup = (title, type) => {
    const items = groupByType(type);
    if (items.length === 0) return null;

    return (
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#0cf" }}>{title}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          {items.map(item => (
            <Link to={getLink(item)} key={item.id} style={{ textDecoration: "none", color: "white" }}>
              <div style={{ width: "140px", background: "#222", borderRadius: "6px", overflow: "hidden" }}>
                <img src={getPosterUrl(item.posterPath)} alt={item.title}
                  style={{ width: "100%", height: "210px", objectFit: "cover" }} />
                <p style={{ textAlign: "center", padding: "0.5rem", fontSize: "0.9rem" }}>
                  {item.title.length > 20 ? item.title.substring(0, 20) + "..." : item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h1>Your Watchlist</h1>
      {watchlist.length === 0
        ? <p>No items yet.</p>
        : (
          <>
            {renderGroup("🎬 Movies", "movie")}
            {renderGroup("📺 TV Shows", "tv")}
            {renderGroup("🎌 Anime", "anime")}
            {renderGroup("📚 Manga", "manga")}
          </>
        )}
    </div>
  );
};

export default Watchlist;
