import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="elements__container">
      <img
        className="elements__item"
        alt={card.name}
        src={card.link}
        onClick={handleClick}
      />
      <div className="elements__context">
        <h2 className="elements__title">{card.name}</h2>
        <div className="element__like">
          <button
            type="button"
            className={`elements__button-like ${
              isLiked && "elements__button-like_active"
            }`}
            onClick={handleLikeClick}
          ></button>
          <span className="element__number">{card.likes.length}</span>
        </div>
        {isOwn && (
          <button
            type="button"
            className="elements__button-delete"
            onClick={handleDeleteClick}
          />
        )}
      </div>
    </div>
  );
}

export default Card;
