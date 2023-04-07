import React from "react";
import headerLogo from "../images/Mesto.png";
import { Route, Routes, Link } from "react-router-dom";

function Header({ email, onExit }) {
  return (
    <header className="header page__header">
      <div className="header__container">
        <img
          src={headerLogo}
          className="header__logo"
          alt="Логотип Место Россия"
        />
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link className="header__link" to="/sign-in">
                Войти
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <div className="header__account">
                <p className="header__email">{email}</p>
                <Link className="header__exit" to="/sign-in" onClick={onExit}>
                  Выйти
                </Link>
              </div>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
