import SiteImage from './SiteImage';
import { motion as Motion } from 'framer-motion';

function ExecutiveDirectorMessage({ content }) {
  return (
    <Motion.section
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
              <Motion.div
                className="col-lg-5 text-center mb-5 mb-lg-0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="position-relative">
                  <SiteImage
                    source={content.chairmanPhoto}
                    fallback="/assets/images-webp/ceo.webp"
                    alt={content.chairmanName}
                    className="img-fluid shadow-lg rounded-circle"
                    style={{
                      width: 'min(100%, 400px)',
                      height: 'auto',
                      aspectRatio: '1',
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
              </Motion.div>

              {/* Message Content */}
              <Motion.div
                className="col-lg-7"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="display-4 fw-bold mb-4" style={{ color: '#2c3e50' }}>
                  {content.chairmanTitle}
                </h2>
                <div className="mb-4" style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#34495e' }}>
                  {content.chairmanMessage.split(/\n\s*\n/).map((paragraph, index) => <p className="mb-4" key={index}>{paragraph}</p>)}
                </div>
                <div className="border-start border-success border-4 ps-4">
                  <p className="mb-1 fw-bold text-success fs-4">{content.chairmanName}</p>
                  <p className="mb-0 text-muted fs-6 fw-semibold">{content.chairmanRole}</p>
                </div>
              </Motion.div>
            </div>
          </div>
        </div>
      </div>
    </Motion.section>
  );
}

export default ExecutiveDirectorMessage;
