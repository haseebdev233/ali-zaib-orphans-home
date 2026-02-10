import { memo } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Your support has made a real difference in the lives of these children.",
    author: "Muhammad Umar",
    delay: 0.1
  },
  {
    quote: "I'm proud to contribute to such a worthy cause.",
    author: "Ayesha Khan",
    delay: 0.2
  },
  {
    quote: "Seeing the smiles on the children's faces is priceless.",
    author: "Ahmed Ali",
    delay: 0.3
  },
  {
    quote: "Thank you for giving these kids a chance at a better future.",
    author: "Fatima Noor",
    delay: 0.4
  }
];

const TestimonialCard = memo(({ quote, author, delay }) => {
  return (
    <motion.div
      className="col-md-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="card border-0 shadow-lg rounded-4 h-100 testimonial-card">
        <div className="card-body p-4 text-center">
          <i className="bi bi-quote fs-1 text-primary mb-3"></i>
          <p className="card-text fst-italic">{quote}</p>
          <footer className="blockquote-footer fw-bold">{author}</footer>
        </div>
      </div>
      <style>{`
        .testimonial-card {
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }
        .testimonial-card:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
        }
      `}</style>
    </motion.div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

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
          {testimonials.map((testimonial) => (
            <TestimonialCard 
              key={testimonial.author} 
              quote={testimonial.quote} 
              author={testimonial.author} 
              delay={testimonial.delay} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PowerSection;
