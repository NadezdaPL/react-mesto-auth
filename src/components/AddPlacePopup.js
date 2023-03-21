import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";


function AddPlacePopup({ isOpen, onClose, onAddPlace, onChanging }) {

 const { values, handleChange, reset } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    
    onAddPlace({
      title: values.title,
      link: values.link
    });
  }

  useEffect(() => {
    reset()
  }, [isOpen, reset]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      name="add"
      title="Новое место"
      buttonText={onChanging ? "Создание..." : "Создать"}
    >
      <fieldset className="popup__fieldset">
        <input
          className="popup__input popup__input_type_nickname"
          onChange={handleChange}
          name="title"
          type="text"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          id="nickname"
          value={values.title || ''}
        />
        <span
          id="nickname-error"
          className="popup__error popup__error_visible"
        ></span>
      </fieldset>
      <fieldset className="popup__fieldset">
        <input
          className="popup__input popup__input_type_link"
          onChange={handleChange}
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          id="link"
          value={values.link || ''}
        />
        <span
          id="link-error"
          className="popup__error popup__error_visible"
        ></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
