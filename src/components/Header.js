import React from "react";
import headerLogo from '../images/Mesto.png';

function Header() {
  return (
    <header className="header page__header">
      <img src={headerLogo} className="header__logo" alt="Логотип Место Россия" />
    </header>
  )
};

export default Header;