import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/images-webp/1.webp";

function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for mobile adjustments
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // CSS custom properties for responsive values
  const parallaxIntensity = isMobile ? 0.5 : 1;

  return (
    <section
      className="hero-section text-white d-flex align-items-center"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        '--parallax-intensity': parallaxIntensity,
        paddingTop: isMobile ? '0px' : '90px', // 0 on mobile, 90px on desktop to account for navbar
      }}
    >
      <div
        className="hero-bg-fade"
        style={{
          position: 'absolute',
          top: '0',
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      >
        <img
          src={heroImage}
          alt="Hero background"
          aria-hidden="true"
          decoding="async"
          fetchPriority="high"
          loading="eager"
          width="1920"
          height="1080"
          sizes="100vw"
          className="hero-bg-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
        <h1
          className="fw-bold text-danger display-5 fade-in"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,0,0.8), 0 0 20px rgba(255,255,0,0.6)' }}
        >
          Ali Zaib Orphan Home
          (Aashiana)
        </h1>
        <p
          className="mt-3 text-center fs-3 fw-semibold fade-in"
          style={{ textShadow: '2px 2px 4px yellow'}}
        >
          Caring Orphans, Building Futures
        </p>
        <div className="mt-4 fade-in">
          <Link to="/donate" className="btn btn-success px-4 me-3 mb-2 rounded-pill fw-bold">
            <i className="bi bi-heart-fill me-2"></i>DONATE NOW
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
