import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Hero() {
  const images = ["/assets/images/hero-image/1.png", "/assets/images/hero-image/2.png", "/assets/images/hero-image/3.png", "/assets/images/hero-image/hadees.jpeg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 20000); // Fixed interval of 20 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="hero-section text-white d-flex align-items-center" style={{ backgroundImage: `url(${images[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
      <div className="container text-center">
        <h1 className="fw-bold display-5">
          Make a Difference in a Child’s Life
        </h1>

        <p className="mt-3">
          Ali-Zaib Orphan Home  Foundation provides care, education and support
          for orphan children.
        </p>

        <div className="mt-4">
          <Link to="/donate" className="btn btn-success px-4 me-3 mb-2 rounded-pill fw-bold">
            <i className="bi bi-heart-fill me-2"></i>DONATE NOW
          </Link>

          <Link to="/volunteer" className="btn btn-outline-success px-4 me-3 mb-2 rounded-pill fw-bold">
            <i className="bi bi-person-plus-fill me-2"></i>BECOME A VOLUNTEER
          </Link>

          <a href="https://chat.whatsapp.com/DW5GhjiufMc5Ab78m3f41z" target="_blank" rel="noopener noreferrer" className="btn btn-outline-success px-4 rounded-pill fw-bold">
            <i className="bi bi-whatsapp me-2"></i>Join Our WhatsApp Community
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
