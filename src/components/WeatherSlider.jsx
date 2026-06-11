import { useState, useEffect } from "react";
import SlickSliderComponent from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./WeatherSlider.css";

import brokenCloudsImg from "../assets/broken_clouds.webp";
import clearSkyImg from "../assets/clear_sky.webp";
import fewCloudsImg from "../assets/few_clouds.webp";
import overcastCloudsImg from "../assets/overcast_clouds.webp";
import rainImg from "../assets/rain.webp";
import scatteredCloudsImg from "../assets/scattered_clouds.webp";
import snowImg from "../assets/snow.webp";

const Slider =
  typeof SlickSliderComponent === "function"
    ? SlickSliderComponent
    : SlickSliderComponent.default ||
      SlickSliderComponent.Slider ||
      SlickSliderComponent;

const PHENOMENA_DATA = [
  {
    id: 1,
    title: "Рвані хмари",
    img: brokenCloudsImg,
  },
  {
    id: 2,
    title: "Чисте небо",
    img: clearSkyImg,
  },
  {
    id: 3,
    title: "Кілька хмар",
    img: fewCloudsImg,
  },
  {
    id: 4,
    title: "Хмарно",
    img: overcastCloudsImg,
  },
  {
    id: 5,
    title: "Дощ",
    img: rainImg,
  },
  {
    id: 6,
    title: "Уривчасті хмари",
    img: scatteredCloudsImg,
  },
  {
    id: 7,
    title: "Сніг",
    img: snowImg,
  },
];

function WeatherSlider() {
  const [activeModalImg, setActiveModalImg] = useState(null);

  useEffect(() => {
    if (activeModalImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Очищення при розмонтуванні компонента
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModalImg]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    adaptiveHeight: true,
    accessibility: true,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 550,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       arrows: false,
    //     },
    //   },
    // ],
  };

  return (
    <div className="slider-wrapper">
      <h2 className="slider-section-title">Погодні явища</h2>

      <Slider {...settings}>
        {PHENOMENA_DATA.map((item) => (
          <div key={item.id} className="slider-item">
            <div
              className="slider-card"
              onClick={() => setActiveModalImg(item)}
            >
              <div className="slider-img-container">
                <img src={item.img} alt={item.title} className="slider-img" />
              </div>
              <h3 className="slider-card-title">{item.title}</h3>
            </div>
          </div>
        ))}
      </Slider>

      {/* Модальне вікно (Лайтбокс) */}
      {activeModalImg && (
        <div
          className="lightbox-overlay"
          onClick={() => setActiveModalImg(null)}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={() => setActiveModalImg(null)}
            >
              ×
            </button>
            <img
              src={activeModalImg.img}
              alt={activeModalImg.title}
              className="lightbox-img"
            />
            <p className="lightbox-caption">{activeModalImg.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherSlider;
