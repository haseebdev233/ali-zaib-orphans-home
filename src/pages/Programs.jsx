import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Programs() {
  const navigate = useNavigate();

  const programs = [
    {
      title: "Free Education",
      icon: "bi-book",
      description: "Providing quality education to orphaned children, including school fees, books, and learning materials.",
      color: "#3498db",
      gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)"
    },
    {
      title: "Healthcare Support",
      icon: "bi-heart-pulse",
      description: "Comprehensive medical care, regular health checkups, and access to necessary medications.",
      color: "#e74c3c",
      gradient: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)"
    },
    {
      title: "Skill Development",
      icon: "bi-tools",
      description: "Vocational training and skill-building programs to prepare children for future careers.",
      color: "#f39c12",
      gradient: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)"
    },
    {
      title: "Food & Shelter",
      icon: "bi-house-heart",
      description: "Nutritious meals and safe, comfortable living environments for all our children.",
      color: "#27ae60",
      gradient: "linear-gradient(135deg, #27ae60 0%, #229954 100%)"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-5" style={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh'
    }}>
      <div className="container py-5">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h1 className="display-4 fw-bold mb-3" style={{
            color: '#2c3e50',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            Our <span style={{ color: '#3498db' }}>Programs</span>
          </h1>
          <p className="lead text-muted mb-4">
            Comprehensive support programs designed to nurture, educate, and empower orphaned children
          </p>
          <motion.div
            className="d-inline-block px-4 py-2 rounded-pill mb-4"
            style={{
              backgroundColor: '#3498db20',
              border: '2px solid #3498db',
              color: '#3498db'
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <span className="fw-bold">Transforming Lives Daily</span>
          </motion.div>
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="row g-4"
        >
          {programs.map((program, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-3">
              <motion.div
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden"
                style={{
                  background: 'white',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Card Header with Gradient */}
                <div
                  className="card-header text-white text-center py-4"
                  style={{
                    background: program.gradient,
                    border: 'none'
                  }}
                >
                  <motion.div
                    className="mb-3"
                    style={{ fontSize: '3rem' }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <i className={`bi ${program.icon}`}></i>
                  </motion.div>
                  <h5 className="card-title fw-bold mb-0">{program.title}</h5>
                </div>

                {/* Card Body */}
                <div className="card-body p-4">
                  <p className="card-text text-muted mb-4" style={{ lineHeight: '1.6' }}>
                    {program.description}
                  </p>

                  {/* Impact Stats */}
                  <div className="row text-center g-3 mb-4">
                    <div className="col-6">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-2 rounded-3"
                        style={{ backgroundColor: '#f8f9fa' }}
                      >
                        <div className="fw-bold fs-5" style={{ color: program.color }}>
                          500+
                        </div>
                        <small className="text-muted">Children Helped</small>
                      </motion.div>
                    </div>
                    <div className="col-6">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-2 rounded-3"
                        style={{ backgroundColor: '#f8f9fa' }}
                      >
                        <div className="fw-bold fs-5" style={{ color: program.color }}>
                          95%
                        </div>
                        <small className="text-muted">Success Rate</small>
                      </motion.div>
                    </div>
                  </div>

                  {/* Learn More Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn w-100 rounded-pill fw-bold"
                    style={{
                      background: program.gradient,
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => navigate('/')}
                  >
                    Learn More
                    <i className="bi bi-arrow-right ms-2"></i>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-5 pt-5"
        >
          <div className="card border-0 shadow-lg rounded-4 p-5" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            <h3 className="fw-bold mb-3">Ready to Make a Difference?</h3>
            <p className="lead mb-4">
              Join us in our mission to provide comprehensive care and support to orphaned children
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-light btn-lg rounded-pill px-4"
                onClick={() => navigate('/donate')}
              >
                <i className="bi bi-heart-fill me-2"></i>
                Donate Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline-light btn-lg rounded-pill px-4"
                onClick={() => navigate('/volunteer')}
              >
                <i className="bi bi-person-plus me-2"></i>
                Volunteer
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style>{`
        /* Card hover effects */
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }

        /* Gradient text animation */
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .display-4 span {
          background: linear-gradient(45deg, #3498db, #2980b9, #1f4e79);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease infinite;
        }

        /* Responsive adjustments */
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

          .col-12.col-md-6.col-lg-3 {
            margin-bottom: 2rem;
          }
        }

        @media (max-width: 575.98px) {
          .display-4 {
            font-size: 1.75rem;
          }

          .btn-lg {
            font-size: 1rem !important;
            padding: 0.75rem 1.5rem !important;
          }
        }

        /* Floating animation for icons */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .card-header i {
          animation: float 3s ease-in-out infinite;
        }

        /* Pulse effect for buttons */
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }

        .btn:hover {
          animation: pulse 1s infinite;
        }
      `}</style>
    </section>
  );
}

export default Programs;
