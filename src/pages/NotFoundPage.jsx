import React, { useState } from "react";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  const [searchCity, setSearchCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      
      window.location.href = `/weather?city=${encodeURIComponent(searchCity)}`;
    }
  };

  return (
    <div className="container">
      {/* Інтерактивна SVG-хмаринка з табличкою */}
      <div className="cloudWrapper">
        <svg
          className="cloudSvg"
          viewBox="0 0 200 150"
          xmlns="http://w3.org"
        >
          {/* Тіло хмаринки */}
          <path
            d="M50 130 A 30 30 0 0 1 40 70 A 40 40 0 0 1 110 40 A 45 45 0 0 1 170 80 A 30 30 0 0 1 150 130 Z"
            fill="#e0f2fe"
          />
          {/* Сумні очі */}
          <circle cx="85" cy="80" r="3" fill="#334155" />
          <circle cx="125" cy="80" r="3" fill="#334155" />
          {/* Сумний ротик */}
          <path
            d="M100 100 Q 105 95 110 100"
            stroke="#334155"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* Мотузочки для таблички */}
          <line
            x1="75"
            y1="110"
            x2="75"
            y2="135"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <line
            x1="135"
            y1="110"
            x2="135"
            y2="135"
            stroke="#94a3b8"
            strokeWidth="2"
          />

          {/* Табличка "404" */}
          <rect x="55" y="130" width="100" height="35" rx="5" fill="#f87171" />
          <text
            x="105"
            y="152"
            fill="white"
            fontSize="18"
            fontWeight="bold"
            textAnchor="middle"
          >
            404
          </text>
        </svg>
      </div>

      <h1 className="title">Сторінку віднесло вітром</h1>
      <p className="description">
        Ми обшукали все Бюро знахідок хмаринок, але ця сторінка, здається,
        полетіла на південь разом із перелітними птахами.
      </p>

      {/* Пошук міста прямо зі сторінки помилки */}
      <form onSubmit={handleSearch} className="searchForm">
        <input
          type="text"
          placeholder="Введіть ваше місто..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="searchInput"
        />
        <button type="submit" className="searchButton">
          Знайти погоду
        </button>
      </form>

      <div className="actions">
        <a href="/" className="homeLink">
          Повернутися до прогнозу
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
