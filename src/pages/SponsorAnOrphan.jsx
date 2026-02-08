import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Helper function to calculate total needs amount
const calculateTotalNeeds = (needs) => {
  return needs.reduce((total, need) => {
    const match = need.match(/Rs\s([\d,]+)\//);
    if (match) {
      const amount = parseInt(match[1].replace(/,/g, ''));
      return total + amount;
    }
    return total;
  }, 0);
};

// Child profiles data
const childrenProfiles = [
  {
    id: 1,
    name: "Amina Batool",
    age: 8,
    location: "Karachi, Pakistan",
    joinDate: "2023-03-15",
    story: "Amina's father passed away from COVID-19 complications when she was 6. Her mother works as a housemaid earning less than $50/month. Amina is a bright student who loves mathematics and dreams of becoming a doctor. She takes care of her two younger siblings while her mother works.",
    photoDescription: "Amina smiling in her school uniform, holding a mathematics textbook",
    needs: [
      "School tuition fees: Rs 2,500/month",
      "Uniform & books: Rs 1,500/term",
      "Nutritional support: Rs 3,000/month",
      "Medical checkups: Quarterly",
      "Extracurricular: Drawing classes"
    ],
    progress: {
      grade: "Class 3",
      performance: "Top of her class",
      health: "Good, needs dental care",
      sponsorshipProgress: "65% funded"
    },
    personality: "Quiet but determined. Loves helping younger children with homework. Favorite subject is Science.",
    islamicNote: "Amina memorizes 5 short surahs and prays regularly with her mother.",
    totalNeedsAmount: calculateTotalNeeds([
      "School tuition fees: Rs 2,500/month",
      "Uniform & books: Rs 1,500/term",
      "Nutritional support: Rs 3,000/month",
      "Medical checkups: Quarterly",
      "Extracurricular: Drawing classes"
    ])
  },
  {
    id: 2,
    name: "Yusuf Ahmed",
    age: 11,
    location: "Lahore, Pakistan",
    joinDate: "2022-11-10",
    story: "Yusuf lost both parents in a road accident. He lives with his elderly grandmother who suffers from diabetes. Despite the trauma, Yusuf shows remarkable resilience. He wakes up at 5 AM daily to deliver newspapers before school to help with household expenses.",
    photoDescription: "Yusuf in madrasah uniform, proudly holding a Quran",
    needs: [
      "Madrasah fees: Rs 3,000/month",
      "After-school tutoring: Rs 2,000/month",
      "Grandmother's medicine: Rs 1,500/month",
      "Winter clothing package",
      "School transportation"
    ],
    progress: {
      grade: "Hafiz-e-Quran (memorized 15 juz)",
      performance: "Excellent in Arabic studies",
      health: "Needs nutritional support",
      sponsorshipProgress: "40% funded"
    },
    personality: "Responsible beyond his years. Helps other children with Quran memorization. Wants to become an Islamic scholar.",
    islamicNote: "Yusuf leads Taraweeh prayers in local mosque during Ramadan. His dream is to memorize the entire Quran.",
    totalNeedsAmount: calculateTotalNeeds([
      "Madrasah fees: Rs 3,000/month",
      "After-school tutoring: Rs 2,000/month",
      "Grandmother's medicine: Rs 1,500/month",
      "Winter clothing package",
      "School transportation"
    ])
  },
  {
    id: 3,
    name: "Fatima Zahra",
    age: 9,
    location: "Faisalabad, Pakistan",
    joinDate: "2023-07-22",
    story: "Fatima's father abandoned the family, and her mother works in a garment factory. Fatima showed signs of malnutrition when she arrived but has made excellent progress. She's gifted in arts and crafts, creating beautiful Islamic calligraphy.",
    photoDescription: "Fatima smiling while holding her calligraphy artwork",
    needs: [
      "Art supplies: Rs 1,000/month",
      "Special nutrition plan: Rs 4,000/month",
      "Therapy sessions: Rs 2,000/month",
      "Educational trips",
      "Dental treatment needed"
    ],
    progress: {
      grade: "Class 4",
      performance: "Excellent in Arts, improving in other subjects",
      health: "Recovering well, gained 3kg in 6 months",
      sponsorshipProgress: "30% funded"
    },
    personality: "Creative and observant. Creates beautiful Islamic patterns. Shy but warms up quickly.",
    islamicNote: "Fatima decorates the orphanage with her Islamic art during Eid celebrations.",
    totalNeedsAmount: calculateTotalNeeds([
      "Art supplies: Rs 1,000/month",
      "Special nutrition plan: Rs 4,000/month",
      "Therapy sessions: Rs 2,000/month",
      "Educational trips",
      "Dental treatment needed"
    ])
  }
];

// Sponsor testimonials
const sponsorTestimonials = [
  {
    name: "Ahmed Raza",
    location: "Dubai, UAE",
    duration: "Sponsor for 3 years",
    text: "Sponsoring Yusuf has been the most rewarding experience of my life. When I received his first letter where he called me 'Uncle Ahmed,' I cried. Seeing his progress in Quran memorization gives me a sense of accomplishment no worldly success can match.",
    childSponsored: "Yusuf Ahmed",
    impact: "Yusuf is now in the top 5% of his madrasah"
  },
  {
    name: "Sarah Khan",
    location: "London, UK",
    duration: "Sponsor for 18 months",
    text: "As a single Muslim woman, I wanted to make a lasting impact. Sponsoring Amina through your organization has been seamless. The monthly updates, photos, and report cards make me feel connected despite the distance. It's my Sadaqah Jariyah.",
    childSponsored: "Amina Batool",
    impact: "Amina's grades improved from C to A average"
  },
  {
    name: "Dr. Mohammad Ali",
    location: "Islamabad, Pakistan",
    duration: "Sponsor for 5 years",
    text: "I've sponsored three children through this organization over five years. The transparency is exceptional - I know exactly where every rupee goes. The children write to me, send me Eid cards, and I've even visited them twice. This is true Islamic charity in action.",
    childSponsored: "Multiple children",
    impact: "Helped 3 children complete primary education"
  }
];



function SponsorAnOrphan() {
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Gallery images (using existing images from public/assets/images)
  const galleryImages = [
    '/assets/images/1.jpeg',
    '/assets/images/2.jpeg',
    '/assets/images/5.jpeg',
    '/assets/images/6.jpeg',
    '/assets/images/7.jpeg',
    // Prefer WebP hero images to reduce payload
    '/assets/images-webp/2.webp',
    '/assets/images-webp/3.webp'
  ];

  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  return (
    <div className="sponsor-orphan-page">
      {/* Hero Section */}
      <motion.section
        className="hero-section text-white d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/assets/images-webp/5.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '60vh'
        }}
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
            Change a Child's Life
          </motion.h1>
          <motion.p
            className="lead mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Every child deserves a chance at a brighter future. Meet Amina, an 8-year-old girl from Karachi who lost her father to COVID-19. Despite her hardships, she dreams of becoming a doctor and helps care for her younger siblings. Your sponsorship can transform her story from struggle to success.
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

      {/* Sponsor  An Orphan Section */}
      <motion.section
        className="meet-children py-5 bg-light"
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
            Sponsor  An Orphan
          </motion.h2>
          <div className="row g-4">
            {childrenProfiles.map((child, index) => (
              <motion.div
                key={child.id}
                className="col-lg-4 col-md-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="text-center mb-3">
                      <img
                        src={galleryImages[index % galleryImages.length]}
                        alt={child.photoDescription}
                        className="rounded-circle img-fluid"
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>
                    <h5 className="card-title text-center text-success">{child.name}</h5>
                    <p className="text-center text-muted mb-3">{child.age} years old • {child.location}</p>
                    <p className="card-text mb-3">{child.story}</p>
                    <div className="mb-3">
                      <strong>Needs:</strong>
                      <ul className="list-unstyled mt-2">
                        {child.needs.slice(0, 3).map((need, i) => (
                          <li key={i} className="small">• {need}</li>
                        ))}
                      </ul>
                      <div className="mt-2">
                        <strong className="text-primary">Total Needs: Rs {child.totalNeedsAmount.toLocaleString()}</strong>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-success">{child.progress.sponsorshipProgress}</span>
                      <Link
                        to="/donate"
                        state={{ aqiqaAmount: child.totalNeedsAmount }}
                        className="btn btn-success btn-sm"
                      >
                        Sponsor {child.name.split(' ')[0]}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Sponsorship Program Section */}
      <motion.section
        className="sponsorship-program py-5"
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
            The Sponsorship Program
          </motion.h2>
          <motion.p
            className="text-center lead mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Your monthly sponsorship provides comprehensive support to orphaned children, covering their essential needs and nurturing their potential.
          </motion.p>
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <motion.div
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="card-body">
                  <i className="bi bi-book-fill text-success fs-1 mb-3"></i>
                  <h5 className="card-title">Education</h5>
                  <p className="card-text">School fees, uniforms, books, and educational materials to ensure quality education.</p>
                </div>
              </motion.div>
            </div>
            <div className="col-md-4 text-center">
              <motion.div
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="card-body">
                  <i className="bi bi-heart-pulse-fill text-success fs-1 mb-3"></i>
                  <h5 className="card-title">Healthcare</h5>
                  <p className="card-text">Regular medical checkups, vaccinations, and treatment for illnesses.</p>
                </div>
              </motion.div>
            </div>
            <div className="col-md-4 text-center">
              <motion.div
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="card-body">
                  <i className="bi bi-house-door-fill text-success fs-1 mb-3"></i>
                  <h5 className="card-title">Food & Shelter</h5>
                  <p className="card-text">Nutritious meals, clothing, and safe housing in our care facilities.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="how-it-works py-5 bg-light"
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
            How It Works
          </motion.h2>
          <div className="row g-4">
            <div className="col-md-3 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                  <span className="fs-2 fw-bold">1</span>
                </div>
                <h5>Sign Up</h5>
                <p className="text-muted">Choose a child or let us match you with one in need.</p>
              </motion.div>
            </div>
            <div className="col-md-3 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                  <span className="fs-2 fw-bold">2</span>
                </div>
                <h5>Select Child</h5>
                <p className="text-muted">Review profiles and select the child you'd like to sponsor.</p>
              </motion.div>
            </div>
            <div className="col-md-3 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                  <span className="fs-2 fw-bold">3</span>
                </div>
                <h5>Payment</h5>
                <p className="text-muted">Secure online payment with automatic monthly billing.</p>
              </motion.div>
            </div>
            <div className="col-md-3 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                  <span className="fs-2 fw-bold">4</span>
                </div>
                <h5>Updates</h5>
                <p className="text-muted">Receive quarterly reports, photos, and letters from your sponsored child.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials & Impact Section */}
      <motion.section
        className="testimonials-impact py-5"
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
            Testimonials & Impact
          </motion.h2>
          <div className="row g-4">
            {sponsorTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="col-lg-4 col-md-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <blockquote className="blockquote mb-3">
                      <p className="mb-0">"{testimonial.text}"</p>
                    </blockquote>
                    <footer className="blockquote-footer">
                      <strong>{testimonial.name}</strong><br />
                      <small className="text-muted">{testimonial.location} • {testimonial.duration}</small><br />
                      <small className="text-success">Sponsoring: {testimonial.childSponsored}</small>
                    </footer>
                    <div className="mt-3 p-2 bg-light rounded">
                      <small className="text-success fw-bold">Impact: {testimonial.impact}</small>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
                    width="300"
                    height="200"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="cta-section text-white py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/assets/images-webp/4.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
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
            className="lead mb-4 text-center"
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
