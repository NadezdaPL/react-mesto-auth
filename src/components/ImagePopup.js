import React from "react";

function ImagePopup({ card, onClose, isOpen }) {
  return (
    <section className={`popup popup_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <button className="popup__close" onClick={onClose}></button>
        <img className="popup__image-item" src={card?.link} alt={card?.name} />
        <h2 className="popup__image-title">{card?.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
