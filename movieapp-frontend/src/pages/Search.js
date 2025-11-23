import React, { useState } from "react";
import { searchMedia } from "../api";
import { Link } from "react-router-dom";
import "../App.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    const data = await searchMedia(query);
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="search-page">
      <h1>Search</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies, TV shows, or anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      <div className="search-results">
        {results.length > 0 ? (
          results.map((item) => (
            <div key={item.id} className="search-item">
              <Link to={`/details/${item.media_type}/${item.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title || item.name} />
                <h3>{item.title || item.name}</h3>
              </Link>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
