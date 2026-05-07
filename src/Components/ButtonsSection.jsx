import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ButtonsSection() {
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="buttons-section py-5 bg-white cv-auto">
      <div className="container">
        <h2 className="text-center mb-4">Join us, make a difference!</h2>
        <motion.div
          className="d-flex justify-content-center flex-wrap gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={buttonVariants}>
            <Link to="/campus-ambassador" className="btn btn-success px-4 rounded-pill fw-bold">
              <i className="bi bi-star-fill me-2"></i>BECOME A CAMPUS AMBASSADOR
            </Link>
          </motion.div>
          <motion.div variants={buttonVariants}>
            <Link to="/volunteer" className="btn btn-success px-4 rounded-pill fw-bold">
              <i className="bi bi-person-plus-fill me-2"></i>BECOME A VOLUNTEER
            </Link>
          </motion.div>
          <motion.div variants={buttonVariants}>
            <a href="https://chat.whatsapp.com/DW5GhjiufMc5Ab78m3f41z" target="_blank" rel="noopener noreferrer" className="btn btn-success px-4 rounded-pill fw-bold">
              <i className="bi bi-whatsapp me-2"></i>Join Our WhatsApp Community
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default ButtonsSection;
