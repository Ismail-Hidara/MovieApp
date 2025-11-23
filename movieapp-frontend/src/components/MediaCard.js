import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const MediaCard = ({ item, isAniList = false, type = "movie" }) => {
  const navigate = useNavigate();

  const image = isAniList
    ? item.coverImage?.large
    : `https://image.tmdb.org/t/p/w500${item.poster_path}`;

  const title = isAniList
    ? item.title?.english || item.title?.romaji
    : item.title || item.name;

  const handleClick = () => {
    const id = isAniList ? item.id : item.id;
    navigate(`/${type}/${id}`);
  };

  return (
    <div className="media-card" onClick={handleClick}>
      <img src={image} alt={title} />
    </div>
  );
};

export default MediaCard;
