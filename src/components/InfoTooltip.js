import React from "react";

function InfoTooltip({ isOpen, onClose, image, title }) {
  return (
    <section className={`popup popup__infoTooltip ${isOpen ? "popup_opened" : ""}`}>
      <form className="popup__container">
        <button
          className="popup__close"
          onClick={onClose}
          type="button"
        ></button>
        <img className="popup__item" src={image} alt={title} />
        <h2 className="popup__text">{title}</h2>
      </form>
    </section>
  );
}

export default InfoTooltip;
