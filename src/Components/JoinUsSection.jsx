import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinUsSection() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="py-5" style={{
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #1a1a2e 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Premium Background Pattern */}
      <div className="position-absolute top-0 start-0 w-100 h-100 opacity-5">
        <div style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
          `,
          backgroundSize: '100% 100%',
          height: '100%'
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="position-absolute top-0 start-0 w-100 h-100">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="position-absolute"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`,
              borderRadius: '50%',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%'
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Animated Geometric Shapes */}
      <div className="position-absolute top-0 end-0 w-50 h-100 opacity-5">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: '600px',
            height: '600px',
            background: 'conic-gradient(from 0deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05), rgba(255,255,255,0.1))',
            position: 'absolute',
            top: '-300px',
            right: '-300px',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
          }}
        />
      </div>

      {/* Premium Border Effect */}
      <div className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none">
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
        }}></div>
      </div>

      <div className="container position-relative z-1 py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="display-3 fw-bold text-white mb-4" style={{
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                background: 'linear-gradient(135deg, #ffffff 0%, #bbdefb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Join Us Now And Become A Supporter!
              </h1>
              
              <p className="lead text-success mb-5 text-center" style={{ 
                fontSize: '1.25rem',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: '1.8'
              }}>
                Together, we can make a lasting difference in the lives of orphaned children. 
                Your support provides education, healthcare, and hope for a brighter future.
              </p>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="row g-4 mb-5"
            >
              {[
                { number: "500+", label: "Children Helped", icon: "bi-people-fill", color: "#4FC3F7" },
                { number: "50+", label: "Active Volunteers", icon: "bi-heart-fill", color: "#FF6B9D" },
                { number: "1000+", label: "Meals Provided", icon: "bi-egg-fried", color: "#FFD93D" },
                { number: "24/7", label: "Care & Support", icon: "bi-house-heart", color: "#6BCF7F" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="col-6 col-md-3"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <div className="p-4 rounded-4 position-relative overflow-hidden h-100" style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}>
                    {/* Animated background gradient */}
                    <div className="position-absolute top-0 start-0 w-100 h-100 opacity-20" style={{
                      background: `linear-gradient(45deg, ${stat.color}20, transparent, ${stat.color}10)`,
                      animation: 'gradientShift 3s ease-in-out infinite'
                    }}></div>

                    {/* Icon with glow effect */}
                    <motion.div
                      className="mb-3 position-relative"
                      style={{ fontSize: '2.5rem', color: stat.color }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <i className={`bi ${stat.icon}`}></i>
                      <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                        background: `radial-gradient(circle, ${stat.color}40 0%, transparent 70%)`,
                        borderRadius: '50%',
                        animation: 'pulse 2s ease-in-out infinite'
                      }}></div>
                    </motion.div>

                    <h3 className="fw-bold text-white mb-2 position-relative z-1">{stat.number}</h3>
                    <p className="text-white-75 mb-0 small position-relative z-1">{stat.label}</p>

                    {/* Decorative corner */}
                    <div className="position-absolute top-0 end-0 w-20 h-20 opacity-30" style={{
                      background: `linear-gradient(135deg, transparent 0%, ${stat.color}20 100%)`,
                      clipPath: 'polygon(100% 0%, 0% 100%, 100% 100%)'
                    }}></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Volunteer Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                type: "spring",
                stiffness: 100
              }}
            >
              <motion.button
                className="btn btn-lg px-5 py-4 fw-bold"
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                  color: 'white',
                  border: 'none',
                  fontSize: '1.25rem',
                  letterSpacing: '1px',
                  borderRadius: '50px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(255, 107, 107, 0.4)',
                  minWidth: '300px'
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 15px 40px rgba(255, 107, 107, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => navigate('/volunteer')}
              >
                {/* Button Glow Effect */}
                <motion.div
                  animate={isHovered ? { x: '100%' } : { x: '-100%' }}
                  transition={{ duration: 0.8 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)'
                  }}
                />
                
                {/* Button Content */}
                <span className="position-relative z-1">
                  <i className="bi bi-heart-fill me-3"></i>
                  BECOME A VOLUNTEER
                  <i className="bi bi-arrow-right ms-3"></i>
                </span>
                
                {/* Pulse Effect */}
                <motion.span
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity 
                  }}
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    right: '-10px',
                    bottom: '-10px',
                    borderRadius: '60px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    zIndex: 0
                  }}
                />
              </motion.button>
            </motion.div>

            {/* Campus Ambassador Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                type: "spring",
                stiffness: 100
              }}
              className="mt-4"
            >
              <motion.button
                className="btn btn-lg px-5 py-4 fw-bold"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  fontSize: '1.25rem',
                  letterSpacing: '1px',
                  borderRadius: '50px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                  minWidth: '350px'
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 15px 40px rgba(102, 126, 234, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => navigate('/campus-ambassador')}
              >
                {/* Button Glow Effect */}
                <motion.div
                  animate={isHovered ? { x: '100%' } : { x: '-100%' }}
                  transition={{ duration: 0.8 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)'
                  }}
                />

                {/* Button Content */}
                <span className="position-relative z-1">
                  <i className="bi bi-mortarboard-fill me-3"></i>
                  BECOME A CAMPUS AMBASSADOR
                  <i className="bi bi-arrow-right ms-3"></i>
                </span>

                {/* Pulse Effect */}
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    right: '-10px',
                    bottom: '-10px',
                    borderRadius: '60px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    zIndex: 0
                  }}
                />
              </motion.button>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-5"
            >
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="d-flex align-items-center justify-content-center text-white">
                    <div className="me-3">
                      <i className="bi bi-clock-fill fs-4 text-warning"></i>
                    </div>
                    <div className="text-start">
                      <small className="text-white-75 d-block">Flexible Hours</small>
                      <span className="fw-medium">Choose your schedule</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center justify-content-center text-white">
                    <div className="me-3">
                      <i className="bi bi-award-fill fs-4 text-info"></i>
                    </div>
                    <div className="text-start">
                      <small className="text-white-75 d-block">Get Certified</small>
                      <span className="fw-medium">Volunteer certificate</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center justify-content-center text-white">
                    <div className="me-3">
                      <i className="bi bi-people-fill fs-4 text-success"></i>
                    </div>
                    <div className="text-start">
                      <small className="text-white-75 d-block">Join Community</small>
                      <span className="fw-medium">Meet like-minded people</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Call to Action Text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-white-50 mt-5 pt-4 border-top border-white border-opacity-10"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              <i className="bi bi-info-circle me-2"></i>
              No experience required. We provide training and ongoing support to all our volunteers.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

// CSS Styles for JoinUsSection
const JoinUsSectionStyles = () => (
  <style>{`
    /* Button hover effects */
    .btn:hover {
      transform: translateY(-3px);
      transition: all 0.3s ease;
    }
    
    /* Responsive styles */
    @media (max-width: 991.98px) {
      .display-3 {
        font-size: calc(1.525rem + 3.3vw);
      }
      
      .btn-lg {
        font-size: 1.1rem !important;
        padding: 1rem 2rem !important;
        min-width: 250px !important;
      }
      
      .row.g-4 > .col-6.col-md-3 {
        margin-bottom: 1rem;
      }
    }
    
    @media (max-width: 767.98px) {
      .display-3 {
        font-size: 2.5rem;
      }
      
      .lead {
        font-size: 1.1rem !important;
      }
      
      .col-6.col-md-3 {
        flex: 0 0 50%;
        max-width: 50%;
      }
      
      .btn-lg {
        width: 100%;
        max-width: 300px;
      }
    }
    
    @media (max-width: 575.98px) {
      .display-3 {
        font-size: 2rem;
      }
      
      .lead {
        font-size: 1rem !important;
      }
      
      .col-6.col-md-3 {
        flex: 0 0 100%;
        max-width: 100%;
      }
      
      .row.g-4 > div {
        margin-bottom: 1rem;
      }
    }
    
    /* Animation for stats */
    @keyframes countUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .col-6.col-md-3:nth-child(1) { animation: countUp 0.5s ease 0.1s both; }
    .col-6.col-md-3:nth-child(2) { animation: countUp 0.5s ease 0.2s both; }
    .col-6.col-md-3:nth-child(3) { animation: countUp 0.5s ease 0.3s both; }
    .col-6.col-md-3:nth-child(4) { animation: countUp 0.5s ease 0.4s both; }
    
    /* Glow effect for button */
    @keyframes buttonGlow {
      0%, 100% { box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4); }
      50% { box-shadow: 0 15px 40px rgba(255, 107, 107, 0.6); }
    }
    
    .btn {
      animation: buttonGlow 3s infinite;
    }
    
    /* Floating animation */
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .bi-heart-fill {
      animation: float 3s ease-in-out infinite;
    }

    /* Premium animations */
    @keyframes gradientShift {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 0.4;
        transform: scale(1);
      }
      50% {
        opacity: 0.8;
        transform: scale(1.1);
      }
    }

    /* Enhanced glassmorphism effect */
    .premium-card {
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      background-color: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.125);
    }

    /* Smooth transitions for all interactive elements */
    * {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `}</style>
);

export default function PremiumJoinUsSection() {
  return (
    <>
      <JoinUsSectionStyles />
      <JoinUsSection />
    </>
  );
}