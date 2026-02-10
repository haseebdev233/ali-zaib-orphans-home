import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Support programs data
const supportPrograms = [
  {
    id: 1,
    title: "Sponsor an Orphan",
    description: "Provide comprehensive support to orphaned children including education, healthcare, and nutrition.",
    icon: "bi bi-person-bounding-box  ",
    path: "/sponsor-an-orphan",
    features: [
      "Monthly sponsorship: Rs 5,000/child",
      "Education support",
      "Healthcare coverage",
      "Nutritional meals"
    ]
  },
  {
    id: 2,
    title: "Zakat for Orphans",
    description: "Contribute your Zakat to help orphaned children and families in need.",
    icon: "bi bi-currency-exchange",
    path: "/zakat",
    features: [
      "Zakat-eligible donations",
      "Direct impact on orphans",
      "Transparent distribution",
      "Islamic charity fulfillment"
    ]
  },
  {
    id: 3,
    title: "General Donations",
    description: "Support our ongoing programs and initiatives for orphaned children.",
    icon: "bi bi-heart-fill",
    path: "/donate",
    features: [
      "Flexible donation amounts",
      "Support multiple programs",
      "Emergency relief",
      "Infrastructure development"
    ]
  }
];

// Support testimonials
const supportTestimonials = [
  {
    name: "Ahmed Raza",
    location: "Dubai, UAE",
    duration: "Supporting for 3 years",
    text: "Supporting this organization has been incredibly rewarding. Seeing the direct impact of my contributions on children's lives makes every donation worthwhile. The transparency and regular updates keep me motivated to continue supporting.",
    program: "Sponsor an Orphan",
    impact: "Helped 3 children complete primary education"
  },
  {
    name: "Sarah Khan",
    location: "London, UK",
    duration: "Monthly donor for 2 years",
    text: "I started with Zakat donations and now contribute monthly. The organization's commitment to Islamic principles and their detailed reporting on how funds are used gives me complete confidence in my contributions.",
    program: "Zakat & General Donations",
    impact: "Supported 50+ children through various programs"
  },
  {
    name: "Dr. Mohammad Ali",
    location: "Islamabad, Pakistan",
    duration: "Corporate sponsor for 5 years",
    text: "Our company has been supporting this orphanage through corporate Zakat and general donations. The professionalism, transparency, and tangible results have made this our preferred charity partner.",
    program: "Corporate Zakat & Sponsorship",
    impact: "Built a new educational wing and sponsored 100+ children"
  }
];

function SupportUs() {
  const [loadedImages, setLoadedImages] = useState(new Set());

  return (
    <div className="support-us-page">
      {/* Hero Section */}
      <motion.section
        className="hero-section text-white d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/assets/supportus/support.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center py-5">
              <motion.h1
                className="display-10 fw-bold mb-4 "
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                A Small Donation Here, A Great Reward in Akhirah — Donate Generously
              </motion.h1>
              <motion.p
                className="lead mb-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Your generosity can transform the lives of orphaned children. Join us in making a difference through various support programs.
              </motion.p>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Link to="/donate" className="btn btn-success btn-lg me-3">
                  Donate Now
                </Link>
                <Link to="/sponsor-an-orphan" className="btn btn-outline-light btn-lg">
                  Sponsor An Orphan
                </Link>
              </motion.div>
            </div>
          </div>
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
                <footer className="blockquote-footer p-2">Sahih al-Bukhari</footer>
              </motion.blockquote>
            </div>
            <div className="col-lg-6 text-center">
              <motion.img
                src="/assets/images-webp/hadees.webp"
                alt="Hadith about orphan care"
                className="img-fluid rounded shadow"
                style={{ maxWidth: '300px', width: '100%' }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Support Programs Section */}
      <section className="support-programs">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-1">
              <h2 className="display-5 fw-bold text-success">Why Your Support Matters</h2>
              <ul className="lead text-black fs-2text-muted pt-4">
                <li>Your support gives orphans more than help — it gives them hope for life.</li>
                <li>It provides secure accommodation, clothing, food on the table, education for their future, and care for their hearts.</li>
                <li>It turns insecurity into safety, fear into confidence, and orphanhood into opportunity.</li>
                <li>With your trust and generosity, every child feels valued, protected, and loved.</li>
                <li>Together, we help orphans grow with dignity, confidence, and hope.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* In-Kind Donations Section */}
      <motion.section
        className="in-kind-donations py-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="display-5 fw-bold text-success">In-Kind Donations</h2>
              <p className="lead text-muted text-center">Support our orphans by donating essential items. Every contribution makes a difference.</p>
            </div>
          </div>
          <div className="row g-4">
            <motion.div
              className="col-lg-4 col-md-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-wrapper mb-3">
                    <i className="bi bi-book text-success" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="card-title fw-bold mb-3">Educational Materials</h5>
                  <p className="card-text text-muted mb-4">School bags, uniforms, books, stationery items, and learning supplies.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-lg-4 col-md-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-wrapper mb-3">
                    <i className="bi bi-basket text-success" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="card-title fw-bold mb-3">Food Items</h5>
                  <p className="card-text text-muted mb-4">Wheat, rice, pulses, cooking oil, milk, and other essential groceries.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-lg-4 col-md-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-wrapper mb-3">
                    <i className="bi bi-cup-hot text-success" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="card-title fw-bold mb-3">Cooked Food & Meat</h5>
                  <p className="card-text text-muted mb-4">Fresh cooked meals, meat donations, or contributions for special events.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-lg-4 col-md-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-wrapper mb-3">
                    <i className="bi bi-heart text-success" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="card-title fw-bold mb-3">Sadqah & Aqeeqa</h5>
                  <p className="card-text text-muted mb-4">Goats or other animals for Qurbani/Aqeeqa; we manage the purchase and provide videos of every step.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-lg-4 col-md-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-wrapper mb-3">
                    <i className="bi bi-house text-success" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="card-title fw-bold mb-3">Bedding & Clothing</h5>
                  <p className="card-text text-muted mb-4">Bedsheets, blankets, clothing, and shoes for children of all ages.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-lg-4 col-md-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-wrapper mb-3">
                    <i className="bi bi-star text-success" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="card-title fw-bold mb-3">Other Essentials</h5>
                  <p className="card-text text-muted mb-4">Any items that can improve the daily lives of orphans.</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-8 mx-auto">
              <div className="p-4 bg-light rounded">
                <h5 className="fw-bold text-success mb-3">🚛 Send your donations to Ali Zaib Orphan Home :</h5>
                 <i className="bi bi-geo-alt-fill text-success me-3 fs-5"></i>
                <a href="https://maps.app.goo.gl/95RzoGVnVPZBbJbw9?g_st=aw" target="_blank" rel="noopener noreferrer" className="text-black hover-green text-decoration-none ">P-68 New Civil Lines Ayesha Road Near Sindbad , Faisalabad Pakistan</a>
                <h5 className="fw-bold text-success  py-2">🚛 Contact for Pickup:</h5>
                <p className="mb-0">Our representative will pick your donation and provide the receipt of the same at your doorstep.</p>
                <Link to="/contact" className="btn btn-success mt-3">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default SupportUs;
