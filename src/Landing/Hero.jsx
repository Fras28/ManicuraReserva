import React, { useEffect } from "react";
import "./Landing.css"; // Asegúrate de ajustar esta importación según la ubicación correcta de tu archivo CSS
import carne from "../assets/carne.png"

const Hero = () => {
  useEffect(() => {
    const handleScroll = () => {
      const parallax = document.querySelector('.hero-container');
      if (parallax && window.innerWidth > 768) {
        let offset = window.pageYOffset;
        parallax.style.backgroundPositionY = offset * 0.7 + 'px';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Bienvenido a Nuestra Página</h1>
        <button onClick={() => window.location.href = '/'}>Explorar</button>
      </div>
      {/* Aquí añades la imagen */}
      <img className="hero-image" src={carne} alt="Hero Background" />
    </div>
  );
};

export default Hero;
