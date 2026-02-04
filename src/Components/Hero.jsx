import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 3000); // Fixed interval of 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Preload next image for better performance
  useEffect(() => {
    const nextIndex = (currentImageIndex + 1) % HERO_IMAGES.length;
    const img = new Image();
    img.src = HERO_IMAGES[nextIndex];
  }, [currentImageIndex]);

  return (
    <section className="hero-section text-white d-flex align-items-center" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <AnimatePresence>
        <motion.img
          key={currentImageIndex}
          src={HERO_IMAGES[currentImageIndex]}
          alt=""
          aria-hidden="true"
          decoding="async"
          fetchPriority={currentImageIndex === 0 ? "high" : "auto"}
          loading={currentImageIndex === 0 ? "eager" : "lazy"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
        />
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
          Ali-Zaib Orphan Home  provides care, education and support
          for orphan children.
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
    </section>
  );
}

export default Hero;
