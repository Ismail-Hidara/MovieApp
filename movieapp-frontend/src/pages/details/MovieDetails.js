import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../api";
import axios from "axios";
import ReactModal from "react-modal";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [inWatchlist, setInWatchlist] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDataAndCheckWatchlist = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);

        const res = await axios.get(`http://localhost:8080/api/watchlist/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const exists = res.data.some(w => w.mediaId === data.id && w.mediaType === "movie");
        setInWatchlist(exists);

      } catch (error) {
        console.error("Error fetching movie or checking watchlist:", error);
      }
    };

    fetchDataAndCheckWatchlist();
  }, [id, userId, token]);

  const handleWatch = async () => {
    setShowPlayer(true);

    try {
      const res = await axios.get(`http://localhost:8080/api/watch/movie/${movie.imdb_id}`);
      setVideoUrl(res.data);

      if (userId) {
        await axios.post(`http://localhost:8080/api/history/${userId}`, {
        mediaId: movie.id,
        mediaType: "movie",
        title: movie.title,
        posterPath: movie.poster_path,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      }
    } catch (err) {
      console.warn("Error fetching video URL or saving history:", err.message);
    }
  };

  const handleFavorite = async () => {
    try {
      await axios.post(`http://localhost:8080/api/users/${userId}/favorites/${movie.id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Added to favorites!");
    } catch (err) {
      console.error("Failed to favorite movie:", err);
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      await axios.post(`http://localhost:8080/api/watchlist/${userId}`, {
        mediaId: movie.id,
        mediaType: "movie",
        title: movie.title,
        posterPath: movie.poster_path
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Movie added to Watchlist!");
      setInWatchlist(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("Already in watchlist!");
      } else {
        console.error("Error adding movie to watchlist:", err);
        alert("Failed to add to watchlist");
      }
    }
  };

  const handleRemoveFromWatchlist = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/watchlist/${userId}/${movie.id}/movie`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Movie removed from Watchlist!");
      setInWatchlist(false);
    } catch (err) {
      console.error("Error removing from watchlist:", err);
      alert("Failed to remove from watchlist");
    }
  };

  if (!movie) return <p style={{ padding: "2rem", color: "white" }}>Loading...</p>;

  return (
    <div className="details" style={{ color: "white", padding: "2rem" }}>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        style={{ borderRadius: "10px", maxWidth: "300px", marginBottom: "1rem" }}
      />
      <p><strong>Description:</strong> {movie.overview}</p>
      <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>

      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        <button onClick={handleWatch}>▶ Watch</button>
        <button onClick={handleFavorite}>❤️ Favorite</button>
        {inWatchlist ? (
          <button onClick={handleRemoveFromWatchlist}>❌ Remove from Watchlist</button>
        ) : (
          <button onClick={handleAddToWatchlist}>➕ Add to Watchlist</button>
        )}
      </div>

      <ReactModal
        isOpen={showPlayer}
        onRequestClose={() => setShowPlayer(false)}
        style={{
          content: {
            backgroundColor: "#000",
            border: "none",
            padding: 0,
            inset: "10% 10%",
          },
          overlay: { backgroundColor: "rgba(0,0,0,0.8)" }
        }}
        ariaHideApp={false}
      >
        <button
          onClick={() => setShowPlayer(false)}
          style={{
            position: "absolute",
            top: 10,
            right: 20,
            zIndex: 10,
            background: "red",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            border: "none"
          }}
        >
          Close
        </button>
        {videoUrl && (
          <iframe
            src={videoUrl}
            title="Watch Movie"
            scrolling="no"
            allowFullScreen
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        )}
      </ReactModal>
    </div>
  );
};

export default MovieDetails;
