import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Hero() {
  const images = ["/assets/images/hero-image/1.jpeg", "/assets/images/hero-image/2.png", "/assets/images/hero-image/3.png", "/assets/images/hero-image/4.jpeg", "/assets/images/hero-image/5.png", "/assets/images/hero-image/6.png", "/assets/images/hero-image/7.jpeg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Fixed interval of 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [images.length]);

  return (
    <section className="hero-section text-white d-flex align-items-center" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <AnimatePresence>
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          exit={{ scale: 1.2 }}
          transition={{ duration: 5, ease: 'easeOut' }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
        />
      </AnimatePresence>
      <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
        <motion.h1
          className="fw-bold display-5"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Make a Difference in a Child’s Life
        </motion.h1>

        <motion.p
          className="mt-3 text-center"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ali-Zaib Orphan Home  Foundation provides care, education and support
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

          <Link to="/campus-ambassador" className="btn btn-success px-4 me-3 mb-2 rounded-pill fw-bold">
            <i className="bi bi-star-fill me-2"></i>BECOME A CAMPUS AMBASSADOR
          </Link>

          <Link to="/volunteer" className="btn btn-success px-4 me-3 mb-2 rounded-pill fw-bold">
            <i className="bi bi-person-plus-fill me-2"></i>BECOME A VOLUNTEER
          </Link>

          <a href="https://chat.whatsapp.com/DW5GhjiufMc5Ab78m3f41z" target="_blank" rel="noopener noreferrer" className="btn btn-success px-4 rounded-pill fw-bold">
            <i className="bi bi-whatsapp me-2"></i>Join Our WhatsApp Community
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
