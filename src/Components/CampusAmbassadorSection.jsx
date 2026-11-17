import SiteImage from './SiteImage';
import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function CampusAmbassadorSection({ content }) {
  return (
    <Motion.section
      className="py-5 bg-light"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <div className="row align-items-center">
          <Motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <SiteImage
                source={content.ambassadorImage} fallback="/assets/images-webp/3.webp"
                alt="Campus Ambassador"
                className="img-fluid rounded shadow"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </Motion.div>
          <Motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-success mb-4">{content.ambassadorTitle}</h2>
            <p className="lead mb-4">
              {content.ambassadorIntro}
            </p>
            <div className="row g-3 mb-4">
              <Motion.div
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
              </Motion.div>
              <Motion.div
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
              </Motion.div>
              <Motion.div
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
              </Motion.div>
              <Motion.div
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
              </Motion.div>
            </div>
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <Link to="/campus-ambassador" className="btn btn-success btn-lg px-4">
                <i className="bi bi-person-plus-fill me-2"></i>Apply Now
              </Link>
            </Motion.div>
          </Motion.div>
        </div>
      </div>
    </Motion.section>
  );
}

export default CampusAmbassadorSection;
