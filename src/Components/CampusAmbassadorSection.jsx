import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function CampusAmbassadorSection() {
  return (
    <motion.section
      className="py-5 bg-light"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <div className="row align-items-center">
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <img
                src="/assets/images/hero-image/3.png"
                alt="Campus Ambassador"
                className="img-fluid rounded shadow"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </motion.div>
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-success mb-4">Become a Campus Ambassador</h2>
            <p className="lead mb-4">
              Join our elite team of student leaders who spread awareness, organize events, and make a real difference on their campuses and in the community.
            </p>
            <div className="row g-3 mb-4">
              <motion.div
                className="col-md-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="d-flex align-items-center">
                  <i className="bi bi-megaphone-fill text-primary me-3 fs-4"></i>
                  <span>Spread Awareness</span>
                </div>
              </motion.div>
              <motion.div
                className="col-md-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="d-flex align-items-center">
                  <i className="bi bi-heart-fill text-danger me-3 fs-4"></i>
                  <span>Organize Events</span>
                </div>
              </motion.div>
              <motion.div
                className="col-md-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="d-flex align-items-center">
                  <i className="bi bi-trophy-fill text-warning me-3 fs-4"></i>
                  <span>Get Rewarded</span>
                </div>
              </motion.div>
              <motion.div
                className="col-md-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <div className="d-flex align-items-center">
                  <i className="bi bi-award-fill text-success me-3 fs-4"></i>
                  <span>Earn Certificates</span>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <Link to="/campus-ambassador" className="btn btn-success btn-lg px-4">
                <i className="bi bi-person-plus-fill me-2"></i>Apply Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default CampusAmbassadorSection;
