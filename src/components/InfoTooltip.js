import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close" onClick={onClose} type="button"></button>
        <img className="popup__item" src={isSuccess ? success : fail} alt={""} />
        <h2 className="popup__text">
          {isSuccess 
            ? "Вы успешно зарегистрировались!" 
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
