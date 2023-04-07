import React from "react";
import headerLogo from "../images/Mesto.png";
import { Link, useLocation } from "react-router-dom";

function Header({ email, onExit, loggedIn }) {
  const location = useLocation();

  return (
    <header className="header page__header">
      <div className="header__container">
        <img
          src={headerLogo}
          className="header__logo"
          alt="Логотип Место Россия"
        />
        {location.pathname === "/sign-in" && (
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        )}

        {location.pathname === "/sign-up" && (
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        )}
        {loggedIn && (
          <div className="header__account">
            <p className="header__email">{email}</p>
            <button className="header__exit" onClick={onExit}>
              Выйти
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
