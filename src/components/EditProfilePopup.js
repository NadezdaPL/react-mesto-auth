import { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onChanging }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, reset } = useForm();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about
    });
  }

  useEffect(() => {
    currentUser ? reset(currentUser) : reset()
  }, [currentUser, isOpen, reset]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="edit"
      title="Редактировать профиль"
      buttonText={onChanging ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          className="popup__input popup__input_type_name"
          name="name"
          type="text"
          minLength="2"
          maxLength="40"
          required
          id="name"
          placeholder="Имя"
          onChange={handleChange}
          value={values.name || ''}
        />
        <span
          id="name-error"
          className="popup__error popup__error_visible"
        ></span>
      </fieldset>
      <fieldset className="popup__fieldset">
        <input
          className="popup__input popup__input_type_job"
          name="about"
          type="text"
          minLength="2"
          maxLength="200"
          required
          id="about"
          placeholder="Вид деятельности"
          onChange={handleChange}
          value={values.about || ''}
        />
        <span
          id="job-error"
          className="popup__error popup__error_visible"
        ></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
