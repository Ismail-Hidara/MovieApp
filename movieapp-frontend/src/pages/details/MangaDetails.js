import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactModal from "react-modal";
import axios from "axios";

const MangaDetails = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [error, setError] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const res = await axios.post(
          "https://graphql.anilist.co",
          {
            query: `
              query ($id: Int) {
                Media(id: $id, type: MANGA) {
                  id
                  title {
                    romaji
                    english
                  }
                  description
                  coverImage {
                    large
                  }
                  chapters
                  genres
                }
              }
            `,
            variables: { id: parseInt(id) },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const mangaData = res.data.data.Media;
        setManga(mangaData);
      } catch (err) {
        console.error("Failed to load manga:", err.message);
        setError("Failed to fetch manga details");
      }
    };

    fetchManga();
  }, [id]);

  const handleReadChapter = async (chapterNumber) => {
    setShowPlayer(true);

    try {
      const res = await axios.get(
        `http://localhost:8080/api/watch/manga/${manga.id}/${chapterNumber}`
      );
      setVideoUrl(res.data);

      if (userId) {
        await axios.post(
          `http://localhost:8080/api/history/${userId}`,
          {
            mediaId: manga.id,
            mediaType: "manga",
            title: manga.title?.english || manga.title?.romaji,
            posterPath: manga.coverImage?.large,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (err) {
      console.warn("Error reading chapter or saving history:", err.message);
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/watchlist/${userId}`,
        {
          mediaId: manga.id,
          mediaType: "manga",
          title: manga.title?.english || manga.title?.romaji,
          posterPath: manga.coverImage?.large,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Manga added to Watchlist!");
    } catch (err) {
      console.error("Failed to add manga to watchlist:", err);
      alert("Error adding manga to watchlist.");
    }
  };

  if (error) return <p style={{ color: "crimson", padding: "2rem" }}>❌ {error}</p>;
  if (!manga) return <p style={{ color: "white", padding: "2rem" }}>Loading...</p>;

  return (
    <div style={{ color: "white", padding: "2rem" }}>
      <h1>{manga.title.english || manga.title.romaji}</h1>
      <img
        src={manga.coverImage.large}
        alt={manga.title.english || manga.title.romaji}
        style={{
          borderRadius: "10px",
          maxWidth: "300px",
          marginBottom: "1rem",
        }}
      />
      <p>
        <strong>Description:</strong>{" "}
        <span
          dangerouslySetInnerHTML={{ __html: manga.description || "N/A" }}
        />
      </p>
      <p>
        <strong>Chapters:</strong> {manga.chapters || "N/A"}
      </p>
      <p>
        <strong>Genres:</strong> {manga.genres?.join(", ") || "N/A"}
      </p>

      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
      </div>

      {manga.chapters && (
        <>
          <h2 style={{ marginTop: "2rem" }}>📖 Chapters</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {Array.from({ length: manga.chapters }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handleReadChapter(i + 1)}
                style={{
                  background: "#333",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "4px",
                }}
              >
                📖 Chapter {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      <ReactModal
        isOpen={showPlayer}
        onRequestClose={() => {
          setShowPlayer(false);
          setVideoUrl("");
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
            setVideoUrl("");
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
            title="Manga Reader"
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

export default MangaDetails;
