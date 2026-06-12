
import { Link } from "react-router";
import "./Footer.css";

import logoImg from "../assets/logo.png";


const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="flex-container">
          <div className="app-logo">
            <Link to="/" className="logo-link">
              <img src={logoImg} alt="Лого" className="logo-img" />
              <h1 className="logo-text">Гарна погода</h1>
            </Link>
          </div>

          <ul className="social">
            <li className="socail-item">
              <a
                href="https://www.facebook.com/?locale=uk_UA"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="13" height="24">
                  <use href="/sprite.svg#facebook" className="social-icon" />
                </svg>
              </a>
            </li>
            <li className="socail-item">
              <a
                href="https://www.instagram.com/"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="24" height="24">
                  <use href="/sprite.svg#instagram" className="social-icon" />
                </svg>
              </a>
            </li>
            <li className="socail-item">
              <a
                href="https://ua.linkedin.com/"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="24" height="24">
                  <use href="/sprite.svg#linkedin" className="social-icon" />
                </svg>
              </a>
            </li>
          </ul>
          <p className="footer-rights">Copyrights © 2026 Гарна погода</p>
        </div>
        <p className="footer-text">
          Нехай у Вашому житті завжди буде гарна погода!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
