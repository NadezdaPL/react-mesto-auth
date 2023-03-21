import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onChanging }) {
  const avatar = useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      buttonText={onChanging ? "Сохранение..." : "Сохранить"}
    >
      <fieldset className="popup__fieldset">
        <input
          className="popup__input popup__input_type_avatar"
          name="avatar"
          type="url"
          placeholder="Ссылка на картинку"
          required
          id="avatar"
          ref={avatar}
        />
        <span
          id="avatar-error"
          className="popup__error popup__error_visible"
        ></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
