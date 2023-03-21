import React from "react";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  buttonText,
  onSubmit,
  ...props
}) {
  return (
    <section className={`popup popup__${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={`${name}`}
          noValidate
          onSubmit={onSubmit}
        >
          {props.children}
          <button type="submit" className="popup__button">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
