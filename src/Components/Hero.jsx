import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HERO_IMAGES = [
  "/assets/images-webp/1.webp",
  "/assets/images-webp/2.webp",
  "/assets/images-webp/3.webp",
  "/assets/images-webp/4.webp",
  "/assets/images-webp/5.webp",
  "/assets/images-webp/6.webp",
  "/assets/images-webp/7.webp",
];
const TRANSITION_MS = 3000;
const INTERVAL_MS = 2500;

function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

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

  useEffect(() => {
    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (event) => setPrefersReducedMotion(event.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      mediaQuery.addListener(handler);
    }
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, []);

  useEffect(() => {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      setIsSlowConnection(connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
      setSaveData(Boolean(connection.saveData));
    }
  }, []);

  const shouldAnimate = !prefersReducedMotion && !saveData && !isSlowConnection;
  const getNextIndex = (index) => (index + 1) % HERO_IMAGES.length;

  useEffect(() => {
    setNextIndex(getNextIndex(currentIndex));
  }, [currentIndex]);

  useEffect(() => {
    if (!shouldAnimate) return;
    let transitionTimeout;
    const intervalTimeout = setTimeout(() => {
      const upcoming = getNextIndex(currentIndex);
      setNextIndex(upcoming);
      setIsTransitioning(true);
      transitionTimeout = setTimeout(() => {
        setCurrentIndex(upcoming);
        setIsTransitioning(false);
      }, TRANSITION_MS);
    }, INTERVAL_MS);

    return () => {
      clearTimeout(intervalTimeout);
      if (transitionTimeout) clearTimeout(transitionTimeout);
    };
  }, [currentIndex, shouldAnimate]);

  useEffect(() => {
    if (!shouldAnimate) return;
    const img = new Image();
    img.src = HERO_IMAGES[nextIndex];
  }, [nextIndex, shouldAnimate]);

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
          src={HERO_IMAGES[currentIndex]}
          alt="Hero background"
          aria-hidden="true"
          decoding="async"
          fetchPriority="high"
          loading="eager"
          width="1920"
          height="1080"
          sizes="100vw"
          className={`hero-carousel-img ${!isTransitioning ? 'active' : ''}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <img
          src={HERO_IMAGES[nextIndex]}
          alt=""
          aria-hidden="true"
          decoding="async"
          fetchPriority="auto"
          loading="lazy"
          width="1920"
          height="1080"
          sizes="100vw"
          className={`hero-carousel-img ${isTransitioning ? 'active' : ''}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
        <h1
          className="fw-bold text-danger display-5 fade-up"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,0,0.8), 0 0 20px rgba(255,255,0,0.6)' }}
        >
          Ali Zaib Orphan Home
          (Aashiana)
        </h1>
        <p
          className="mt-3 text-center fs-3 fw-semibold fade-up delay-1"
          style={{ textShadow: '2px 2px 4px yellow'}}
        >
          Caring Orphans, Building Futures
        </p>
        <div className="mt-4 fade-up delay-2">
          <Link to="/donate" className="btn btn-success px-4 me-3 mb-2 rounded-pill fw-bold">
            <i className="bi bi-heart-fill me-2"></i>DONATE NOW
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
