import React from "react";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";

function Register({ handleRegister, handleInfoToolOpen }) {
  const { values, handleChange } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <input
            className="auth__input auth__input_type_email"
            name="email"
            type="url"
            required
            id="email"
            placeholder="Email"
            onChange={handleChange}
            value={values.email || ""}
            autoComplete="on"
          />
          <span
            id="email-error"
            className="popup__error popup__error_visible"
          ></span>
        </fieldset>
        <fieldset className="auth__fieldset">
          <input
            className="auth__input auth__input_type_password"
            name="password"
            type="password"
            required
            id="password"
            placeholder="Пароль"
            onChange={handleChange}
            value={values.password || ""}
            autoComplete="on"
          />
          <span
            id="password-error"
            className="popup__error popup__error_visible"
          ></span>
        </fieldset>
      </form>
      <button
        type="submit"
        className="auth__button"
        onClick={handleInfoToolOpen}
      >
        Зарегистрироваться
      </button>
      <div className="auth__box">
        <p className="auth__box_title">
          Уже зарегистрированы?
          <Link to="/sign-in" className="auth__box_link">
            &nbsp;Войти
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
