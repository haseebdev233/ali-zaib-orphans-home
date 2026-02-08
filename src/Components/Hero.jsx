import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isTouch, setIsTouch] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isStatic, setIsStatic] = useState(false);
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

  // Detect touch devices
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Detect slow connection
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      setIsSlowConnection(connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    }
  }, []);

  // Image cycling with adjusted interval for slow connections
  useEffect(() => {
    const interval = isSlowConnection ? 5000 : 3000;
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, interval);
    return () => clearInterval(intervalId);
  }, [isSlowConnection]);

  // IntersectionObserver for lazy loading (preload next image when visible)
  useEffect(() => {
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
  }, [currentImageIndex]);

  // CSS custom properties for responsive values
  const parallaxIntensity = isMobile ? 0.5 : 1;
  const animationDuration = isMobile ? 1 : (isSlowConnection ? 3 : 2);

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
      <AnimatePresence>
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: animationDuration, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '0',
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            willChange: 'transform',
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
              className="hero-bg-img"
              style={{
                width: '100%',
                height: '100%',
                objectFit: isMobile ? 'cover' : 'cover',
                willChange: 'transform',
              }}
            />
          </picture>
        </motion.div>
      </AnimatePresence>
      <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
        <motion.h1
          className="fw-bold text-danger display-5"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ALi Zaib Orphan Home
        </motion.h1>
        <motion.p
          className="mt-3 text-center"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ali-Zaib Orphan Home provides care, education and support for orphan children.
        </motion.p>
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link to="/donate" className="btn btn-success px-4 me-3 mb-2 rounded-pill fw-bold">
            <i className="bi bi-heart-fill me-2"></i>DONATE NOW
          </Link>
        </motion.div>
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
