import React from 'react';
import { motion } from 'framer-motion';

function ExecutiveDirectorMessage() {
  return (
    <motion.section
      className="py-5 cv-auto"
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '80vh'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-fluid px-5">
        <div className="row align-items-center justify-content-center min-vh-80">
          <div className="col-lg-10">
            <div className="row align-items-center">
              {/* Large CEO Image */}
              <motion.div
                className="col-lg-5 text-center mb-5 mb-lg-0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="position-relative">
                  <img
                    src="/assets/images-webp/ceo.webp"
                    alt="Syed Shahid Ali Zaidi - Chairman"
                    className="img-fluid shadow-lg rounded-circle"
                    style={{
                      width: '400px',
                      height: '400px',
                      objectFit: 'cover',
                      border: '8px solid #28a745',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="400"
                  />
                  <div
                    className="position-absolute"
                    style={{
                      bottom: '20px',
                      right: '20px',
                      backgroundColor: '#28a745',
                      borderRadius: '50%',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                    }}
                  >
                    <i className="bi bi-quote text-white fs-4"></i>
                  </div>
                </div>
              </motion.div>

              {/* Message Content */}
              <motion.div
                className="col-lg-7"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="display-4 fw-bold mb-4" style={{ color: '#2c3e50' }}>
                  Message from the <span style={{ color: '#28a745' }}>Chairman</span>
                </h2>
                <div className="mb-4" style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#34495e' }}>
                  <p className="mb-4">
                    At Ali Zaib Orphan Home, we shelter children who have lost their families and childhoods and now carry silent pain and grief no child should endure. Each child arrives with a story of heartbreak, loneliness, and dreams stolen before they could even take root.
                  </p>
                  <p className="mb-4">
                    Through education, nutritious meals, healthcare, and emotional support, we strive to turn their tears into smiles and their pain into strength. Every child deserves a chance to grow with dignity and love, and we are committed to giving them that chance.
                  </p>
                  <p className="mb-4">
                    We invite all compassionate hearts, donors, and volunteers to join us in transforming lives and building a future filled with hope for those who need it most.
                  </p>
                  <p className="mb-4">
                    Our efforts have already touched the lives of hundreds of children, providing them with education and hope. Looking ahead, we envision a world where every orphan finds a loving home and a bright future.
                  </p>
                </div>
                <div className="border-start border-success border-4 ps-4">
                  <p className="mb-1 fw-bold text-success fs-4">Syed Shahid Ali Zaidi</p>
                  <p className="mb-0 text-muted fs-6 fw-semibold">Chairman, Ali Zaib Orphan Home</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default ExecutiveDirectorMessage;
