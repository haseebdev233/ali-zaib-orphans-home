import React, { useState, useEffect, useRef } from "react";
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

function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isStatic, setIsStatic] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const heroRef = useRef(null);

  // Detect screen size for mobile adjustments
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsStatic(width < 480);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Detect slow connection
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      setIsSlowConnection(connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
      setSaveData(Boolean(connection.saveData));
    }
  }, []);

  // Detect reduced motion preference
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

  const shouldAnimate = !prefersReducedMotion && !isSlowConnection && !isStatic && !saveData;

  // Image cycling with adjusted interval for slow connections
  useEffect(() => {
    if (!shouldAnimate) return;
    const interval = 3000;
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, interval);
    return () => clearInterval(intervalId);
  }, [shouldAnimate]);

  // IntersectionObserver for lazy loading (preload next image when visible)
  useEffect(() => {
    if (!shouldAnimate) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const nextIndex = (currentImageIndex + 1) % HERO_IMAGES.length;
            const img = new Image();
            img.src = HERO_IMAGES[nextIndex];
          }
        });
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [currentImageIndex, shouldAnimate]);

  // CSS custom properties for responsive values
  const parallaxIntensity = isMobile ? 0.5 : 1;
  const fadeClass = prefersReducedMotion ? "" : "fade-in";

  return (
    <section
      ref={heroRef}
      className="hero-section text-white d-flex align-items-center"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        '--parallax-intensity': parallaxIntensity,
        paddingTop: isMobile ? '0px' : '90px', // 0 on mobile, 90px on desktop to account for navbar
      }}
    >
      {isSlowConnection && (
        <div
          className="loading-skeleton"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'loading 1.5s infinite',
            zIndex: -1,
          }}
        />
      )}
      {shouldAnimate ? (
        <div
          key={currentImageIndex}
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
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet={HERO_IMAGES[currentImageIndex]}
            />
            <source
              media="(max-width: 480px)"
              srcSet={HERO_IMAGES[currentImageIndex]}
            />
            <img
              src={HERO_IMAGES[currentImageIndex]}
              alt="Hero background"
              aria-hidden="true"
              decoding="async"
              fetchPriority={currentImageIndex === 0 ? "high" : "auto"}
              loading={currentImageIndex === 0 ? "eager" : "lazy"}
              width="1920"
              height="1080"
              sizes="100vw"
              className="hero-bg-img"
              style={{
                width: '100%',
                height: '100%',
                objectFit: isMobile ? 'cover' : 'cover',
              }}
            />
          </picture>
        </div>
      ) : (
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}
        >
          <picture>
            <source media="(max-width: 768px)" srcSet={HERO_IMAGES[0]} />
            <source media="(max-width: 480px)" srcSet={HERO_IMAGES[0]} />
            <img
              src={HERO_IMAGES[0]}
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
                objectFit: isMobile ? 'cover' : 'cover',
              }}
            />
          </picture>
        </div>
      )}
      <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
        <h1
          className={`fw-bold text-danger display-5 ${fadeClass}`}
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,0,0.8), 0 0 20px rgba(255,255,0,0.6)' }}
        >
          Ali Zaib Orphan Home
          (Aashiana)
        </h1>
        <p
          className={`mt-3 text-center fs-3 fw-semibold ${fadeClass}`}
          style={{ textShadow: '2px 2px 4px yellow'}}
        >
          Caring Orphans, Building Futures
        </p>
        <div className={`mt-4 ${fadeClass}`}>
          <Link to="/donate" className="btn btn-success px-4 me-3 mb-2 rounded-pill fw-bold">
            <i className="bi bi-heart-fill me-2"></i>DONATE NOW
          </Link>
        </div>
      </div>
      <style jsx>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}

export default Hero;
