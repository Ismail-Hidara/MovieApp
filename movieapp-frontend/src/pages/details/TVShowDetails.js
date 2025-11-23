import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTVShowDetails } from "../../api";
import axios from "axios";
import ReactModal from "react-modal";

const TVShowDetails = () => {
  const { id } = useParams();
  const [tv, setTV] = useState(null);
  const [expandedSeason, setExpandedSeason] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [inWatchlist, setInWatchlist] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadAndCheckWatchlist = async () => {
      try {
        const data = await fetchTVShowDetails(id);
        setTV(data);

        const res = await axios.get(`http://localhost:8080/api/watchlist/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const exists = res.data.some(w => w.mediaId === data.id && w.mediaType === "tv");
        setInWatchlist(exists);

      } catch (error) {
        console.error("Error loading TV show or checking watchlist:", error);
      }
    };

    loadAndCheckWatchlist();
  }, [id, userId, token]);

  const handleAddToWatchlist = async () => {
    try {
      await axios.post(`http://localhost:8080/api/watchlist/${userId}`, {
        mediaId: tv.id,
        mediaType: "tv",
        title: tv.name,
        posterPath: tv.poster_path
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("TV Show added to Watchlist!");
      setInWatchlist(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("Already in watchlist!");
      } else {
        console.error("Error adding TV show to watchlist:", err);
        alert("Failed to add to watchlist");
      }
    }
  };

  const handleRemoveFromWatchlist = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/watchlist/${userId}/${tv.id}/tv`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("TV Show removed from Watchlist!");
      setInWatchlist(false);
    } catch (err) {
      console.error("Error removing from watchlist:", err);
      alert("Failed to remove from watchlist");
    }
  };

  const handleEpisodeClick = async (seasonNumber, episodeNumber) => {
    setShowPlayer(true);

    try {
      const res = await axios.get(
        `http://localhost:8080/api/watch/tv/${tv.id}/${seasonNumber}/${episodeNumber}`
      );
      setVideoUrl(res.data);

      if (userId) {
        await axios.post(`http://localhost:8080/api/history/${userId}`, {
          mediaId: tv.id,
          mediaType: "tv",
          title: tv.name,
          posterPath: tv.poster_path,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (err) {
      console.warn("Failed to load episode or save history:", err.message);
    }
  };

  const toggleSeason = (seasonNumber) => {
    setExpandedSeason(prev => (prev === seasonNumber ? null : seasonNumber));
  };

  if (!tv)
    return <p style={{ color: "white", padding: "2rem" }}>Loading...</p>;

  return (
    <div style={{ color: "white", padding: "2rem" }}>
      <h1>{tv.name}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
        alt={tv.name}
        style={{ borderRadius: "10px", maxWidth: "300px", marginBottom: "1rem" }}
      />
      <p><strong>Description:</strong> {tv.overview}</p>
      <p><strong>Rating:</strong> ⭐ {tv.vote_average}</p>
      <p><strong>First Air Date:</strong> {tv.first_air_date}</p>

      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        {inWatchlist ? (
          <button onClick={handleRemoveFromWatchlist}>❌ Remove from Watchlist</button>
        ) : (
          <button onClick={handleAddToWatchlist}>➕ Add to Watchlist</button>
        )}
      </div>

      <h2 style={{ marginTop: "2rem" }}>📚 Seasons</h2>
      {tv.seasons.map((season) => (
        <div
          key={season.season_number}
          style={{
            marginBottom: "1rem",
            background: "#1f1f1f",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <h3
            onClick={() => toggleSeason(season.season_number)}
            style={{ cursor: "pointer", margin: 0 }}
          >
            {season.name} ({season.episode_count} episodes)
          </h3>

          {expandedSeason === season.season_number && (
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {Array.from({ length: season.episode_count }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handleEpisodeClick(season.season_number, i + 1)}
                  style={{
                    background: "#333",
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: "4px",
                  }}
                >
                  ▶ Episode {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Video Player Modal */}
      <ReactModal
        isOpen={showPlayer}
        onRequestClose={() => {
          setShowPlayer(false);
          setVideoUrl(null);
        }}
        style={{
          content: {
            backgroundColor: "#000",
            border: "none",
            padding: 0,
            inset: "10% 10%",
          },
          overlay: { backgroundColor: "rgba(0,0,0,0.8)" },
        }}
        ariaHideApp={false}
      >
        <button
          onClick={() => {
            setShowPlayer(false);
            setVideoUrl(null);
          }}
          style={{
            position: "absolute",
            top: 10,
            right: 20,
            zIndex: 10,
            background: "red",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            border: "none",
          }}
        >
          Close
        </button>

        {videoUrl && (
          <iframe
            src={videoUrl}
            title="TV Episode Player"
            allowFullScreen
            scrolling="no"
            width="100%"
            height="100%"
            frameBorder="0"
          />
        )}
      </ReactModal>
    </div>
  );
};

export default TVShowDetails;
