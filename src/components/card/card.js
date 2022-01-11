import React, { useState } from "react";
import styled from "styled-components";
import Button from "../button/button";

const CardStyled = styled.div`
  width: 250px;
  max-width: 80%;
  margin: 10px auto;
  background: #fff;
  box-shadow: 4px 8px 10px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  .card-img-container {
    width: 100%;
  }

  .card-img-container img {
    width: 100%;
    height: 200px;
    max-width: 100%;
  }
  .card-text-container {
    padding: 10px;
  }
  .card-title {
    font-size: 1em;
    margin: 10px 0;
  }
  .card-time {
    font-size: 0.9em;
    margin: 10px 0;
  }
`;

const cardIsLiked = (id) => {
  const likedCards = JSON.parse(localStorage.getItem("likedCards"));
  if (likedCards) {
    return likedCards.find((card) => card.id === id);
  }
};

const Card = ({ roverImage }) => {
  const { id, img_src, earth_date, camera, rover } = roverImage;

  const [isLiked, setIsLiked] = useState(cardIsLiked(id));

  const handleLikeAndDislike = () => {
    const likedCards = JSON.parse(localStorage.getItem("likedCards"));

    if (cardIsLiked(id)) {
      // Filter out the card to be disliked
      const filteredCards = likedCards.filter(
        (likedCard) => likedCard.id !== id
      );
      handleLocalStorageUpdate(filteredCards);
      setIsLiked(false);
    } else {
      handleLocalStorageUpdate([...(likedCards ? likedCards : []), { id }]);
      setIsLiked(true);
    }
  };

  const handleLocalStorageUpdate = (data) => {
    localStorage.setItem("likedCards", JSON.stringify(data));
  };

  const cardTitle = `${rover.name} - from ${camera.full_name}`;

  return (
    <CardStyled className="card">
      <div className="card-img-container">
        <img src={img_src} alt={cardTitle} title={cardTitle} />
      </div>
      <div className="card-text-container">
        <h2 className="card-title">{cardTitle}</h2>
        <p className="card-time">{earth_date}</p>
        <Button
          onClick={handleLikeAndDislike}
          className={isLiked ? "danger-btn" : ""}
        >
          {isLiked ? "Dislike" : "Like"}
        </Button>
      </div>
    </CardStyled>
  );
};

export default Card;
