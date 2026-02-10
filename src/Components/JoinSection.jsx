import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import image1 from "../assets/images-webp/2.webp";

function JoinSection() {
  return (
    <section className="py-5 bg-light">
      <div className="container py-5">
        <div className="row align-items-center g-5">

          {/* Left Image Column */}
          <div className="col-lg-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="position-relative"
            >
              <div style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
              }}>
                <img
                  src={image1}
                  className="img-fluid w-100"
                  alt="Children at Ali Zaib Orphan Home"
                  style={{
                    height: '500px',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  loading="lazy"
                />

                {/* Image Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
                  padding: '30px',
                  color: 'white'
                }}>
                  <h4 className="mb-2" style={{ fontWeight: '600' }}>
                    Building Brighter Futures
                  </h4>
                  <p className="mb-0" style={{ fontSize: '0.9rem', opacity: '0.9' }}>
                    Support us in creating lasting impact
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '150px',
                height: '150px',
                background: 'linear-gradient(45deg, rgba(30, 58, 138, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)',
                borderRadius: '50%',
                zIndex: -1
              }}></div>

              <div style={{
                position: 'absolute',
                bottom: '-15px',
                left: '-15px',
                width: '100px',
                height: '100px',
                background: 'linear-gradient(45deg, rgba(30, 58, 138, 0.05) 0%, rgba(251, 191, 36, 0.05) 100%)',
                borderRadius: '50%',
                zIndex: -1
              }}></div>
            </motion.div>
          </div>

          {/* Right Content Column */}
          <div className="col-lg-7">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Main Heading */}
              <h1 className="display-5 fw-bold mb-4" style={{
                color: '#1e3a8a',
                lineHeight: '1.2'
              }}>
                We Have Power Today To Change Tomorrow!
              </h1>

              {/* Description Text */}
              <p className="lead mb-4" style={{
                color: 'black',
                fontSize: '1.1rem',
                fontWeight: '400',
                lineHeight: '1.8'
              }}>
                Ali Zaib Orphan Home believes that every child deserves a secure childhood and a hopeful future. Our foster care system ensures emotional stability while our educational and spiritual guidance builds confidence and discipline.
              </p>

              {/* Feature Boxes */}
              <div className="row mt-5">
                <div className="col-lg-3 col-md-6 mb-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-center p-4 h-100"
                    style={{
                      backgroundColor: '#f8f9fa',
                      borderRadius: '15px',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #e9ecef'
                    }}
                  >
                    <div style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#fbbf24',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '15px'
                    }}>
                      <i className="bi bi-book text-white" style={{ fontSize: '20px' }}></i>
                    </div>
                    <h5 style={{ color: '#333', fontSize: '1.1rem', fontWeight: '600' }}>
                      Free Education
                    </h5>
                  </motion.div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-center p-4 h-100"
                    style={{
                      backgroundColor: '#f8f9fa',
                      borderRadius: '15px',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #e9ecef'
                    }}
                  >
                    <div style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#fbbf24',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '15px'
                    }}>
                      <i className="bi bi-heart-pulse text-white" style={{ fontSize: '20px' }}></i>
                    </div>
                    <h5 style={{ color: '#333', fontSize: '1.1rem', fontWeight: '600' }}>
                      Healthcare Support
                    </h5>
                  </motion.div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-center p-4 h-100"
                    style={{
                      backgroundColor: '#f8f9fa',
                      borderRadius: '15px',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #e9ecef'
                    }}
                  >
                    <div style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#fbbf24',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '15px'
                    }}>
                      <i className="bi bi-tools text-white" style={{ fontSize: '20px' }}></i>
                    </div>
                    <h5 style={{ color: '#333', fontSize: '1.1rem', fontWeight: '600' }}>
                      Skill Development
                    </h5>
                  </motion.div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-center p-4 h-100"
                    style={{
                      backgroundColor: '#f8f9fa',
                      borderRadius: '15px',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #e9ecef'
                    }}
                  >
                    <div style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#fbbf24',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '15px'
                    }}>
                      <i className="bi bi-house text-white" style={{ fontSize: '20px' }}></i>
                    </div>
                    <h5 style={{ color: '#333', fontSize: '1.1rem', fontWeight: '600' }}>
                      Food & Shelter
                    </h5>
                  </motion.div>
                </div>
              </div>

              {/* About Us Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-5"
              >
                <Link to="/about" style={{ textDecoration: 'none' }}>
                  <button className="btn btn-lg px-5 py-3 rounded-pill fw-bold"
                    style={{
                      backgroundColor: '#20c997',
                      color: 'white',
                      border: 'none',
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(32, 201, 151, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#198754';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(32, 201, 151, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#20c997';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(32, 201, 151, 0.3)';
                    }}
                  >
                    About Us
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

// CSS Styles for JoinSection
const JoinSectionStyles = () => (
  <style>{`
    /* Responsive styles */
    @media (max-width: 1199.98px) {
      .display-5 {
        font-size: calc(1.425rem + 2.1vw);
      }
    }
    
    @media (max-width: 991.98px) {
      section {
        padding: 3rem 0 !important;
      }
      
      .col-lg-5, .col-lg-7 {
        text-align: center;
      }
      
      .btn-lg {
        font-size: 1rem !important;
        padding: 0.75rem 2rem !important;
      }
      
      .lead {
        font-size: 1rem !important;
      }
    }
    
    @media (max-width: 767.98px) {
      .display-5 {
        font-size: 2rem;
      }
      
      .col-md-6 {
        margin-bottom: 1rem;
      }
      
      .col-md-6:last-child {
        margin-bottom: 0;
      }
      
      .list-unstyled li {
        justify-content: center;
      }
      
      .list-unstyled li span {
        text-align: left;
        max-width: 200px;
      }
    }
    
    @media (max-width: 575.98px) {
      .display-5 {
        font-size: 1.75rem;
      }
      
      .lead {
        font-size: 0.95rem !important;
      }
      
      .btn-lg {
        width: 100%;
        max-width: 250px;
      }
      
      .list-unstyled li {
        justify-content: flex-start;
      }
    }
    
    /* Animation for bullet points */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .list-unstyled li {
      animation: fadeInUp 0.5s ease forwards;
      opacity: 0;
    }
    
    .list-unstyled li:nth-child(1) { animation-delay: 0.2s; }
    .list-unstyled li:nth-child(2) { animation-delay: 0.4s; }
    .list-unstyled li:nth-child(3) { animation-delay: 0.6s; }
    .list-unstyled li:nth-child(4) { animation-delay: 0.8s; }
    
    /* Image hover effect */
    .position-relative:hover .img-fluid {
      transform: scale(1.05);
    }
  `}</style>
);

export default function PremiumJoinSection() {
  return (
    <>
      <JoinSectionStyles />
      <JoinSection />
    </>
  );
}