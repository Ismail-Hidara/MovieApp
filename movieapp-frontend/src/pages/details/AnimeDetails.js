import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactModal from "react-modal";

const AnimeDetails = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/anime/${id}`);
        setAnime(res.data.data.Media);
        console.log("Fetched anime details:", res.data.data.Media);
      } catch (err) {
        console.error("Failed to fetch anime details:", err);
      }
    };
    fetchAnime();
  }, [id]);

  const handleWatch = async (episodeNumber) => {
    setShowPlayer(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/watch/anime/${id}/${episodeNumber}/0/1`
      );
      setVideoUrl(res.data);

      if (userId) {
        await axios.post(
          `http://localhost:8080/api/history/${userId}`,
          {
            mediaId: anime.id,
            mediaType: "anime",
            title: anime.title?.english || anime.title?.romaji,
            posterPath: anime.coverImage?.large,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (err) {
      console.warn("Failed to load episode or save history:", err.message);
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/watchlist/${userId}`,
        {
          mediaId: id,
          mediaType: "anime",
          title: anime.title?.english || anime.title?.romaji,
          posterPath: anime.coverImage?.large,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Added to watchlist!");
    } catch (err) {
      alert("Already in watchlist or failed.");
    }
  };

  if (!anime) return <p style={{ color: "white", padding: "2rem" }}>Loading...</p>;

  return (
    <div style={{ color: "white", padding: "2rem" }}>
      <h1>{anime.title?.english || anime.title?.romaji}</h1>
      <img
        src={anime.coverImage?.large}
        alt={anime.title?.english}
        style={{ borderRadius: "10px", maxWidth: "300px", marginBottom: "1rem" }}
      />
      <p><strong>Description:</strong> {anime.description?.replace(/<br>/g, "\n").replace(/<\/?[^>]+(>|$)/g, "")}</p>
      <p><strong>Episodes:</strong> {anime.episodes || "?"}</p>
      <p><strong>Genres:</strong> {anime.genres?.join(", ")}</p>

      <button onClick={handleAddToWatchlist} style={{ marginTop: "1rem" }}>
        Add to Watchlist
      </button>

      {anime.episodes ? (
        <>
          <h2 style={{ marginTop: "2rem" }}>🎬 Episodes</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {Array.from({ length: anime.episodes }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handleWatch(i + 1)}
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
        </>
      ) : (
        <p style={{ fontStyle: "italic", marginTop: "2rem" }}>
          Episodes not available for this anime.
        </p>
      )}

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
            title="Anime Episode Player"
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

export default AnimeDetails;
