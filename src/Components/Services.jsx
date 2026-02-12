import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Services() {
  const [selectedAmount, setSelectedAmount] = useState(500);

  return (
    <section className="py-5 cv-auto" style={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh'
    }}>
      <div className="container py-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h1 className="display-4 fw-bold mb-3" style={{ 
            color: '#2c3e50',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            <span style={{ color: '#3498db' }}>DONATE</span> & MAKE A DIFFERENCE
          </h1>
          <p className="lead text-muted text-center mb-4">
            Every contribution helps us provide better care, education, and support for orphaned children
          </p>
        </motion.div>

        <div className="row g-5">
          {/* Right Column - What Your Donation Provides */}
          <div className="col-lg-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* What Your Donation Provides Section */}
              <div className="card border-0 shadow-lg rounded-4">
                <div className="card-body p-5">
                  <h4 className="fw-bold mb-4 text-center" style={{ color: '#2c3e50', fontSize: '2rem' }}>
                    What Your Donation Provides to the Orphans
                  </h4>
                  <div className="row g-4">
                    {[
                      { 
                        icon: 'bi-house-heart', 
                        title: 'Shelter', 
                        desc: 'Safe living space',
                        color: '#FF9800',
                        bgColor: '#fff3e0'
                      },
                      { 
                        icon: 'bi-egg-fried', 
                        title: 'Food', 
                        desc: 'Healthy meals daily',
                        color: '#4CAF50',
                        bgColor: '#e8f5e9'
                      },
                      { 
                        icon: 'bi-tags', 
                        title: 'Clothing', 
                        desc: 'Seasonal outfits',
                        color: '#9C27B0',
                        bgColor: '#f3e5f5'
                      },
                      { 
                        icon: 'bi-book', 
                        title: 'Education & Character Building', 
                        desc: 'School fees & supplies',
                        color: '#3498db',
                        bgColor: '#e3f2fd'
                      },
                      { 
                        icon: 'bi-heart-pulse', 
                        title: 'Healthcare', 
                        desc: 'Medical checkups',
                        color: '#E91E63',
                        bgColor: '#fce4ec'
                      },
                      { 
                        icon: 'bi-emoji-smile', 
                        title: 'Mentoring & Career Building', 
                        desc: 'Recreational activities',
                        color: '#00BCD4',
                        bgColor: '#e0f7fa'
                      }
                    ].map((item, index) => (
                      <div key={index} className="col-12 col-md-6 col-lg-4">
                        <motion.div
                          whileHover={{ y: -10, scale: 1.02 }}
                          className="text-center p-4 rounded-4 h-100"
                          style={{ 
                            backgroundColor: item.bgColor,
                            border: `2px solid ${item.color}`,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <div 
                            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                            style={{ 
                              width: '80px', 
                              height: '80px',
                              backgroundColor: item.color,
                              color: 'white',
                              fontSize: '2rem'
                            }}
                          >
                            <i className={`bi ${item.icon}`}></i>
                          </div>
                          <h5 className="fw-bold mb-2" style={{ color: item.color }}>
                            {item.title}
                          </h5>
                          <p className="text-muted text-center mb-0" style={{ fontSize: '1.1rem' }}>
                            {item.desc}
                          </p>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-4"
            >
              <Link
                to="/donate"
                className="btn btn-lg d-inline-flex align-items-center justify-content-center"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '15px 30px',
                  borderRadius: '50px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.3s ease',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <i className="bi bi-heart-fill me-2"></i>
                One Time Donation
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CSS Styles for Services
const ServicesStyles = () => (
  <style>{`
    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(135deg, #2980b9 0%, #1a252f 100%);
    }
    
    /* Responsive styles */
    @media (max-width: 991.98px) {
      .display-4 {
        font-size: 2.5rem;
      }
      
      .card-body {
        padding: 2rem !important;
      }
    }
    
    @media (max-width: 767.98px) {
      .display-4 {
        font-size: 2rem;
      }
      
      .card-body {
        padding: 1.5rem !important;
      }
      
      .col-6 {
        margin-bottom: 1rem;
      }
    }
    
    @media (max-width: 575.98px) {
      .display-4 {
        font-size: 1.75rem;
      }
      
      .row.g-4 > div {
        flex: 0 0 100%;
        max-width: 100%;
      }
    }
    
    /* Floating animation for impact cards */
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    .col-12:hover > div {
      animation: float 3s ease-in-out infinite;
    }
  `}</style>
);

export default function PremiumDonationServices() {
  return (
    <>
      <ServicesStyles />
      <Services />
    </>
  );
}