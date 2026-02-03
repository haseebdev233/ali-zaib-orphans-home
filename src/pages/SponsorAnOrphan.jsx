import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function SponsorAnOrphan() {
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Gallery images (using existing images from public/assets/images)
  const galleryImages = [
    '/assets/images/1.jpeg',
    '/assets/images/2.jpeg',
    '/assets/images/3.jpeg',
    '/assets/images/4.jpeg',
    '/assets/images/5.jpeg',
    '/assets/images/6.jpeg',
    '/assets/images/7.jpeg',
    '/assets/images/hero-image/1.png',
    '/assets/images/hero-image/2.png',
    '/assets/images/hero-image/3.png',
    '/assets/images/gallery/1.jpeg',
    '/assets/images/gallery/2.jpeg',
    '/assets/images/gallery/3.jpeg',
    '/assets/images/gallery/4.jpeg',
    '/assets/images/gallery/5.jpeg',
    '/assets/images/gallery/6.jpeg',
    '/assets/images/gallery/7.jpeg'
  ];

  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  return (
    <div className="sponsor-orphan-page">
      {/* Hero Section */}
      <motion.section
        className="hero-section bg-success text-white py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container text-center">
          <motion.h1
            className="display-4 fw-bold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Sponsor an Orphan
          </motion.h1>
          <motion.p
            className="lead mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Make a lasting impact on a child's life. Your sponsorship provides food, education, healthcare, and love to orphans in need.
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link to="/donate" className="btn btn-light btn-lg px-5 py-3">
              Start Sponsoring Today
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Islamic Perspective Section */}
      <motion.section
        className="islamic-perspective py-5 bg-light"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.h2
                className="fw-bold mb-4 text-success"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Islamic Perspective on Orphan Care
              </motion.h2>
              <motion.p
                className="mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                In Islam, caring for orphans is a highly rewarded act. The Prophet Muhammad (PBUH) said:
              </motion.p>
              <motion.blockquote
                className="blockquote"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="mb-0">"I and the one who sponsors an orphan will be in Paradise like this," and he indicated with his forefinger and middle finger.</p>
                <footer className="blockquote-footer">Sahih al-Bukhari</footer>
              </motion.blockquote>
            </div>
            <div className="col-lg-6 text-center">
              <motion.img
                src="/assets/images/hero-image/hadees.jpeg"
                alt="Hadith about orphan care"
                className="img-fluid rounded shadow"
                style={{ maxWidth: '300px', width: '100%' }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        className="gallery-section py-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.h2
            className="text-center fw-bold mb-5 text-success"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Children
          </motion.h2>
          <div className="row g-3">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="card border-0 shadow-sm">
                  <img
                    src={image}
                    alt={`Orphan child ${index + 1}`}
                    className={`card-img-top img-fluid gallery-image ${loadedImages.has(index) ? 'loaded' : ''}`}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onLoad={() => handleImageLoad(index)}
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="cta-section bg-success text-white py-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container text-center">
          <motion.h2
            className="fw-bold mb-4"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Make a Difference?
          </motion.h2>
          <motion.p
            className="lead mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join our sponsors in providing hope and opportunity to orphaned children.
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link to="/donate" className="btn btn-light btn-lg px-5 py-3">
              Become a Sponsor
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default SponsorAnOrphan;
