import { motion } from 'framer-motion';

function PowerSection() {
  return (
    <section className="py-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <div className="container">
        <motion.h2
          className="fw-bold text-primary text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Donors Say
        </motion.h2>

        <div className="row mt-4 g-4">
          <motion.div
            className="col-md-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="card border-0 shadow-lg rounded-4 h-100"
              style={{ transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
              }}
            >
              <div className="card-body p-4 text-center">
                <i className="bi bi-quote fs-1 text-primary mb-3"></i>
                <p className="card-text fst-italic">"Your support has made a real difference in the lives of these children."</p>
                <footer className="blockquote-footer fw-bold">Muhammad Umar</footer>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="col-md-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="card border-0 shadow-lg rounded-4 h-100"
              style={{ transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
              }}
            >
              <div className="card-body p-4 text-center">
                <i className="bi bi-quote fs-1 text-primary mb-3"></i>
                <p className="card-text fst-italic">"I'm proud to contribute to such a worthy cause."</p>
                <footer className="blockquote-footer fw-bold">Ayesha Khan</footer>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="col-md-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              className="card border-0 shadow-lg rounded-4 h-100"
              style={{ transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
              }}
            >
              <div className="card-body p-4 text-center">
                <i className="bi bi-quote fs-1 text-primary mb-3"></i>
                <p className="card-text fst-italic">"Seeing the smiles on the children's faces is priceless."</p>
                <footer className="blockquote-footer fw-bold">Ahmed Ali</footer>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="col-md-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div
              className="card border-0 shadow-lg rounded-4 h-100"
              style={{ transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
              }}
            >
              <div className="card-body p-4 text-center">
                <i className="bi bi-quote fs-1 text-primary mb-3"></i>
                <p className="card-text fst-italic">"Thank you for giving these kids a chance at a better future."</p>
                <footer className="blockquote-footer fw-bold">Fatima Noor</footer>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PowerSection;
