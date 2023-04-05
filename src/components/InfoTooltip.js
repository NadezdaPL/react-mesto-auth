import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip({ isOpen, onClose, isStatus }) {
  return (
    <section className={`popup popup__infoToolTip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close" onClick={onClose} type="button"></button>
        <img className="popup__item" src={isStatus ? fail : success} alt={""} />
        <h2 className="popup__text">
          {isStatus
            ? "Что-то пошло не так! Попробуйте ещё раз."
            : "Вы успешно зарегистрировались!"}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
