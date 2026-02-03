import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
        <motion.h1
          className="fw-bold display-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Make a Difference in a Child’s Life
        </motion.h1>

        <motion.p
          className="mt-3"
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

          <Link to="/volunteer" className="btn btn-outline-success px-4 me-3 mb-2 rounded-pill fw-bold">
            <i className="bi bi-person-plus-fill me-2"></i>BECOME A VOLUNTEER
          </Link>

          <a href="https://chat.whatsapp.com/DW5GhjiufMc5Ab78m3f41z" target="_blank" rel="noopener noreferrer" className="btn btn-outline-success px-4 rounded-pill fw-bold">
            <i className="bi bi-whatsapp me-2"></i>Join Our WhatsApp Community
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
