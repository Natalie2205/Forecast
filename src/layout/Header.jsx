import { useState } from "react";
import { Link, NavLink } from "react-router";
import "./Header.css";

import logoImg from "../assets/logo.png";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="app-header">
      <div className="container">
        <div className="flex-container">
          <div className="app-logo">
            <Link to="/" className="logo-link" onClick={closeMenu}>
              <img src={logoImg} alt="Лого" className="logo-img" />
              <h1 className="logo-text">Гарна погода</h1>
            </Link>
          </div>

          
          <button 
            className={`burger-btn ${isOpen ? "open" : ""}`} 
            onClick={toggleMenu}
            aria-label="Перемикач меню"
          >
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>

          
          <nav className={`app-nav ${isOpen ? "active" : ""}`}>
            <NavLink
              to="/Forecast"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              onClick={closeMenu}
            >
              Головна
            </NavLink>
            <NavLink
              to="/selected"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              onClick={closeMenu}
            >
              Обране
            </NavLink>
            <NavLink
              to="/interesting"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              onClick={closeMenu}
            >
              Цікаве
            </NavLink>
            <a
              href="https://openweathermap.org"
              className="nav-item external-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              API Джерело
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
