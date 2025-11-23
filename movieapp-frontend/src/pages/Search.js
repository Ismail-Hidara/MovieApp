import React, { useState } from "react";
import { searchMedia } from "../api";
import { Link } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [mediaType, setMediaType] = useState(""); // "", "movie", "tv", "anime", "manga"
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await searchMedia(query, mediaType);
      // TMDB returns `results`; AniList returns `data.Page.media`
      const items = data.results || data.data?.Page?.media || [];
      setResults(Array.isArray(items) ? items : []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = (item) =>
    item.title?.english || item.title?.romaji || item.title || item.name;

  const getPoster = (item) => {
    if (item.poster_path) return `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    if (item.coverImage?.large) return item.coverImage.large;
    return "/fallback.jpg";
  };

  const getLink = (item) => {
    if (item.media_type === "movie" || mediaType === "movie") return `/movie/${item.id}`;
    if (item.media_type === "tv" || mediaType === "tv") return `/tv/${item.id}`;
    if (mediaType === "anime") return `/anime/${item.id}`;
    if (mediaType === "manga") return `/manga/${item.id}`;
    return `/details/${item.media_type || mediaType}/${item.id}`;
  };

  return (
    <div style={{ color: "white", padding: "2rem" }}>
      <h1>🔍 Search</h1>
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
      >
        <input
          type="text"
          placeholder="Search for movies, TV shows, anime, manga..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: "10px" }}
        />
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          style={{ padding: "10px" }}
        >
          <option value="">All</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
          <option value="anime">Anime</option>
          <option value="manga">Manga</option>
        </select>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Search
        </button>
      </form>

      {loading && <p>Loading results...</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {results.length > 0 ? (
          results.map((item) => (
            <Link
              to={getLink(item)}
              key={item.id}
              style={{
                textDecoration: "none",
                color: "white",
                width: "150px",
                textAlign: "center",
              }}
            >
              <img
                src={getPoster(item)}
                alt={getTitle(item)}
                style={{
                  width: "100%",
                  height: "225px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
              <p style={{ marginTop: "0.5rem" }}>{getTitle(item)}</p>
            </Link>
          ))
        ) : (
          !loading && <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
