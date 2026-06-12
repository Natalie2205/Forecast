import { useState, useEffect } from "react";
import "./ScrollToTop.css";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Відстежуємо скрол сторінки
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Очищаємо слухач подій при розмонтуванні компонента
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Функція плавного підняття вгору
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Плавний скрол
    });
  };

  return (
    <>
      {isVisible && (
        <button
          type="button"
          className="scroll-to-top-btn"
          onClick={scrollToTop}
          title="Вгору"
        >
          ↑
        </button>
      )}
    </>
  );
}

export default ScrollToTop;
