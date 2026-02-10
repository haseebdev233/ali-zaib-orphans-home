import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

// Child profiles data (cleaned and removed IDs 18,19,20)
const childrenProfiles = [
  {
    id: 1,
    name: "Muhammad Suleman",
    age: 12,
    story: "Muhammad Suleman, a bright 12-year-old boy, lost his father due to a severe illness. Despite this hardship, he dreams of becoming a doctor and is determined to build a better future.",
    photoDescription: "Muhammad Suleman smiling in his school uniform",
    photo: "/assets/sponsar/Pictures/1. Muhammad Suleman.jpeg"
  },
  {
    id: 2,
    name: "Fahad Ahmad",
    age: 10,
    story: "Fahad Ahmad, a bright 10-year-old boy, lost his father due to hepatitis. Despite this hardship, he dreams of becoming an army officer and is determined to serve his country.",
    photoDescription: "Fahad Ahmad posing confidently in casual clothes",
    photo: "/assets/sponsar/Pictures/2. Fahad Ahmad.jpeg",
  },
  {
    id: 3,
    name: "Ghazi Abbas",
    age: 8,
    story: "Ghazi Abbas lost his father and lives with his mother who works multiple jobs. He is a bright student who loves reading Islamic stories and wants to become a hafiz. Despite his young age, he shows maturity beyond his years.",
    photoDescription: "Ghazi Abbas reading a book with concentration",
    photo: "/assets/sponsar/Pictures/3 Ghazi Abbas.jpeg",
  },
  {
    id: 4,
    name: "Muhammad Rehan Haider",
    age: 11,
    story: "Muhammad Rehan Haider's father passed away, leaving his mother to raise him alone. He helps with household chores and studies diligently. Rehan is interested in science and conducts simple experiments at home.",
    photoDescription: "Muhammad Rehan Haider experimenting with science materials",
    photo: "/assets/sponsar/Pictures/4 Muhammad Rehan Haider.jpeg",
  },
  {
    id: 5,
    name: "Muhammad Kareen",
    age: 9,
    story: "Muhammad Kareen lost his parents in difficult circumstances and now lives in the orphanage. He is a talented artist who expresses himself through drawing and painting Islamic motifs.",
    photoDescription: "Muhammad Kareen holding his artwork proudly",
    photo: "/assets/sponsar/Pictures/5. Muhammad Kareen.jpeg"
  },
  {
    id: 6,
    name: "Muhammad Suffian Ali",
    age: 13,
    story: "Muhammad Suffian Ali became an orphan at a young age and has shown remarkable resilience. He excels in sports and academics, serving as a role model for younger children in the orphanage.",
    photoDescription: "Muhammad Suffian Ali in sports uniform after a game",
    photo: "/assets/sponsar/Pictures/6. Muhammad Suffian Ali.jpeg",
  },
  {
    id: 7,
    name: "Muhammad Ammar",
    age: 7,
    story: "Muhammad Ammar is a cheerful boy who lost his family in challenging circumstances. Despite his young age, he brings joy to everyone around him and loves participating in orphanage activities.",
    photoDescription: "Muhammad Ammar laughing during playtime",
    photo: "/assets/sponsar/Pictures/7. Muhammad Ammar.jpeg",
  },
  {
    id: 8,
    name: "Muhammad Ahmad",
    age: 14,
    story: "Muhammad Ahmad lost his parents and has taken on responsibilities beyond his age. He helps care for younger siblings while pursuing his education and shows great potential in computer skills.",
    photoDescription: "Muhammad Ahmad working on a computer",
    photo: "/assets/sponsar/Pictures/8. Muhammad Ahmad.jpeg",
  },
  {
    id: 9,
    name: "Aliyan Raza",
    age: 10,
    story: "Aliyan Raza's father passed away, and his mother works hard to support the family. Aliyan is a gifted musician who plays traditional Islamic instruments and brings melody to orphanage gatherings.",
    id: 11,
    name: "Bilawal Hussain",
    photoDescription: "Bilawal Hussain writing in his notebook",
    photo: "/assets/sponsar/Pictures/11. Bilawal Hussain.jpeg",
  },
  {
    id: 10,
    name: "Saleem Raza",
    age: 12,
    story: "Saleem Raza lost his parents and has become a quiet but determined young man. He excels in mathematics and helps tutor other children while managing his own studies.",
    photoDescription: "Saleem Raza solving math problems",
    photo: "/assets/sponsar/Pictures/10. Saleem Raza.jpeg",
  },
  {
    id: 11,
    name: "Bilawal Hussain",
    age: 11,
    story: "Bilawal Hussain's family faced tragedy, leaving him in the care of the orphanage. He is a talented writer who expresses his thoughts through poetry and Islamic calligraphy.",
    photoDescription: "Bilawal Hussain writing in his notebook",
    photo: "/assets/sponsar/Pictures/11. Bilawal Hussain.jpeg",
  },
  {
    id: 12,
    name: "Ali Sultan",
    age: 9,
    story: "Ali Sultan is a brave boy who lost his family in difficult times. He loves outdoor activities and shows leadership in group games, helping to organize sports for younger children.",
    photoDescription: "Ali Sultan playing outdoor sports",
    photo: "/assets/sponsar/Pictures/12. Ali Sultan.jpeg",
  },
  {
    id: 13,
    name: "Muhammad Ali",
    age: 13,
    story: "Muhammad Ali has faced many challenges in life but remains optimistic. He is passionate about environmental causes and educates others about caring for Allah's creation.",
    photoDescription: "Muhammad Ali planting trees in the orphanage garden",
    photo: "/assets/sponsar/Pictures/13. Muhammad Ali.jpeg",
  },
  {
    id: 14,
    name: "Gull Shair",
    age: 8,
    story: "Gull Shair is a sweet girl who brings light to the orphanage with her smile. She loves animals and helps care for the orphanage pets while learning about compassion and mercy.",
    photoDescription: "Gull Shair feeding animals at the orphanage",
    photo: "/assets/sponsar/Pictures/14. Gull Shair.png",
  },
  {
    id: 15,
    name: "Muhammad Husnain",
    age: 11,
    story: "Muhammad Husnain lost his parents and has become a responsible young man. He helps with orphanage maintenance and shows interest in carpentry and building skills.",
    photoDescription: "Muhammad Husnain working with tools",
    photo: "/assets/sponsar/Pictures/15. Muhammad Husnain.jpeg",
  },
  {
    id: 16,
    name: "Shahzain Haider",
    age: 10,
    story: "Shahzain Haider is a curious boy who asks many questions and loves exploring science. He conducts simple experiments and shares his discoveries with other children.",
    photoDescription: "Shahzain Haider conducting a science experiment",
    photo: "/assets/sponsar/Pictures/16. Shahzain Haider.jpeg",
  },
  {
    id: 17,
    name: "Ali Hassan",
    age: 12,
    story: "Ali Hassan is a kind-hearted boy who loves helping others. He is skilled in arts and crafts and often creates beautiful drawings for the orphanage.",
    photoDescription: "Ali Hassan drawing in his notebook",
    photo: "/assets/sponsar/Pictures/18. Muhammad Qasim.jpeg",
     
  },
        {
          id: 18,
          name: "Muhammad Qasim",
          age: 12,
          story: "Muhammad Qasim has shown great leadership qualities despite his young age. He organizes study groups and helps weaker students, showing the compassion taught in Islam.",
          photoDescription: "Muhammad Qasim helping other children study",
          photo: "/assets/sponsar/Pictures/18. Muhammad Qasim.jpeg",
          
        }
];

// Enhanced Sponsorship Options Component with Premium Styling
const SponsorshipOptions = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState({
    education: false,
    accommodation: false,
    food: false,
    complete: false
  });


  const handleSelectOption = (option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleSponsorFully = () => {
    setSelectedOptions({
      education: false,
      accommodation: false,
      food: false,
      complete: true
    });
    
    // In a real app, you would redirect to a payment/confirmation page
    toast.success('Thank you for choosing to fully sponsor a child! You will be redirected to the sponsorship form.');
  };

  const calculateTotal = () => {
    let total = 0;
    if (selectedOptions.education) total += 5000;
    if (selectedOptions.accommodation) total += 5000;
    if (selectedOptions.food) total += 10000;
    if (selectedOptions.complete) total = 20000;
    return total;
  };

  const partialOptions = [
    {
      id: 'education',
      title: 'Education',
      price: 'PKR 5,000 / mo',
      features: ['School fees', 'Books & stationery', 'Tuition & learning support'],
      icon: 'fas fa-graduation-cap',
      color: 'primary',
      gradient: 'linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)'
    },
    {
      id: 'accommodation',
      title: 'Accommodation & Clothing',
      price: 'PKR 5,000 / mo',
      features: ['Safe accommodation', 'Seasonal clothing', 'Shoes & basic needs'],
      icon: 'fas fa-home',
      color: 'success',
      gradient: 'linear-gradient(135deg, #198754 0%, #157347 100%)'
    },
    {
      id: 'food',
      title: 'Food & Care',
      price: 'PKR 10,000 / mo',
      features: ['Nutritious meals', 'Milk & daily food', 'Basic healthcare'],
      icon: 'fas fa-utensils',
      color: 'warning',
      gradient: 'linear-gradient(135deg, #ffc107 0%, #e0a800 100%)'
    }
  ];

  return (
    <section id="sponsorship-options" className="sponsorship-section position-relative py-5" style={{ backgroundColor: '#f8f9fa' }}>

      {/* Background decorative elements */}
      <div className="position-absolute top-0 end-0 w-50 h-100" style={{ 
        background: 'linear-gradient(135deg, rgba(13, 110, 253, 0.03) 0%, rgba(25, 135, 84, 0.03) 100%)',
        clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)',
        zIndex: 0
      }}></div>
      
      <Container className="position-relative" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <Row className="mb-5 text-center">
            <Col>
              <Badge bg="success" className="mb-3 px-3 py-2 rounded-pill fs-6">FLEXIBLE SPONSORSHIP</Badge>
              <h2 className="display-5 fw-bold text-dark mb-3">Choose Your Sponsorship Path</h2>
              <p className="lead mb-4" style={{ maxWidth: '700px', margin: '0 auto' }}>
                Select from our flexible sponsorship options or choose to fully support an orphan's journey to a brighter future
              </p>
            </Col>
          </Row>

          <Row className="mb-5 g-4">
            {partialOptions.map((option, index) => (
              <Col key={option.id} lg={4} md={6} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <Card 
                    className={`h-100 shadow-lg border-0 rounded-4 overflow-hidden ${selectedOptions[option.id] ? 'border-3 border-primary' : ''}`}
                    style={{ 
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleSelectOption(option.id)}
                  >
                    {/* Card Header with Gradient */}
                    <div 
                      className="py-4 text-center text-white"
                      style={{ 
                        background: selectedOptions[option.id] 
                          ? option.gradient 
                          : `linear-gradient(135deg, var(--bs-${option.color}) 0%, var(--bs-${option.color}-dark) 100%)`
                      }}
                    >
                      <div className="position-relative">
                        <i className={`${option.icon} fa-3x mb-3`}></i>
                        {selectedOptions[option.id] && (
                          <div className="position-absolute top-0 end-0 translate-middle">
                            <Badge bg="light" text="dark" className="rounded-circle p-2">
                              <i className="fas fa-check"></i>
                            </Badge>
                          </div>
                        )}
                      </div>
                      <Card.Title className="h4 fw-bold text-dark mb-2">{option.title}</Card.Title>
                      <Card.Subtitle className="h3 text-dark fw-bold">PKR 5,000<span className="fs-6">/month</span></Card.Subtitle>
                    </div>
                    
                    <Card.Body className="d-flex flex-column p-4">
                      <ul className="list-unstyled mt-2 mb-4 flex-grow-1">
                        {option.features.map((feature, idx) => (
                          <li key={idx} className="mb-3 d-flex align-items-center ">
                            <div className="me-3">
                              <div className="bg-light rounded-circle p-2 text-dark">
                                <i className="fas fa-check text-success"></i>
                              </div>
                            </div>
                            <span className="text-dark">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-auto">
                        <Button 
                          variant={selectedOptions[option.id] ? "primary" : "outline-primary"}
                          size="lg"
                          className="w-100 py-3 fw-bold rounded-pill"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectOption(option.id);
                          }}
                        >
                          {selectedOptions[option.id] ? (
                            <>
                              <i className="fas fa-check me-2"></i>
                              Selected
                            </>
                          ) : 'Select This Option'}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Complete Sponsorship Premium Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="border-0 shadow-lg rounded-4 overflow-hidden mb-5" style={{ 
              background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
              border: selectedOptions.complete ? '4px solid #198754' : '4px solid transparent'
            }}>
              <Card.Body className="p-5">
                <Row className="align-items-center">
                  <Col lg={8}>
                    <Badge bg="danger" className="mb-3 px-3 py-2 rounded-pill fs-6">
                      <i className="fas fa-crown me-2"></i>
                      MOST POPULAR
                    </Badge>
                    <h3 className="text-white fw-bold mb-3">Complete Orphan Sponsorship</h3>
                    <div className="d-flex align-items-center mb-4">
                      <h2 className="text-white fw-bold display-6 me-3">PKR 20,000</h2>
                      <span className="text-light">/month</span>
                    </div>
                    <p className="text-light mb-4">Comprehensive care covering all essential needs for a child's complete development</p>
                    
                    <Row className="g-3">
                      <Col md={6}>
                        <ul className="list-unstyled">
                          {['Food & Nutrition', 'Education & Islamic Learning', 'Accommodation & Utilities'].map((item, idx) => (
                            <li key={idx} className="mb-3 d-flex align-items-center">
                              <div className="me-3">
                                <div className="bg-white bg-opacity-25 rounded-circle p-2">
                                  <i className="fas fa-check text-white"></i>
                                </div>
                              </div>
                              <span className="text-white">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </Col>
                      <Col md={6}>
                        <ul className="list-unstyled">
                          {['Clothing & Footwear', 'Healthcare & Personal Care', 'Extracurricular Activities'].map((item, idx) => (
                            <li key={idx} className="mb-3 d-flex align-items-center">
                              <div className="me-3">
                                <div className="bg-white bg-opacity-25 rounded-circle p-2">
                                  <i className="fas fa-check text-white"></i>
                                </div>
                              </div>
                              <span className="text-white">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </Col>
                    </Row>
                  </Col>
                  
                  <Col lg={4} className="text-center mt-4 mt-lg-0">
                    <div className="position-relative">
                      <div className="mb-4">
                        <i className="fas fa-heart fa-4x text-white opacity-75"></i>
                      </div>
                      <Button 
                        variant={selectedOptions.complete ? "success" : "light"}
                        size="lg"
                        className="px-5 py-3 fw-bold rounded-pill shadow"
                        onClick={handleSponsorFully}
                        style={{ minWidth: '200px' }}
                      >
                        {selectedOptions.complete ? (
                          <>
                            <i className="fas fa-check-circle me-2"></i>
                            Selected
                          </>
                        ) : (
                          <>
                            <i className="fas fa-hands-helping me-2"></i>
                            Sponsor Fully
                          </>
                        )}
                      </Button>
                      <p className="text-light mt-3 small text-center">
                        <i className="fas fa-star me-1"></i>
                        Most rewarding option
                      </p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </motion.div>

          {/* Selection Summary */}
          {(selectedOptions.education || selectedOptions.accommodation || selectedOptions.food || selectedOptions.complete) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Alert variant="light" className="shadow border-0 rounded-4">
                <Alert.Heading className="d-flex align-items-center">
                  <div className="bg-primary rounded-circle p-2 me-3">
                    <i className="fas fa-shopping-cart text-white"></i>
                  </div>
                  <div>
                    <h4 className="mb-0">Your Sponsorship Selection</h4>
                    <small className="text-muted">Review your choices before proceeding</small>
                  </div>
                </Alert.Heading>
                <hr />
                <Row className="align-items-center">
                  <Col md={7}>
                    <h5 className="mb-3">Selected Options:</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {selectedOptions.complete ? (
                        <Badge bg="success" className="px-3 py-2 fs-6">
                          <i className="fas fa-crown me-2"></i>
                          Complete Sponsorship
                        </Badge>
                      ) : (
                        <>
                          {selectedOptions.education && (
                            <Badge bg="primary" className="px-3 py-2 fs-6 ">
                              <i className="fas fa-graduation-cap  me-2"></i>
                              Education
                            </Badge>
                          )}
                          {selectedOptions.accommodation && (
                            <Badge bg="success" className="px-3 py-2 fs-6">
                              <i className="fas fa-home me-2"></i>
                              Accommodation
                            </Badge>
                          )}
                          {selectedOptions.food && (
                            <Badge bg="warning" className="px-3 py-2 fs-6 text-dark">
                              <i className="fas fa-utensils me-2"></i>
                              Food & Care
                            </Badge>
                          )}
                        </>
                      )}
                    </div>
                  </Col>
                  <Col md={5} className="text-md-end mt-3 mt-md-0">
                    <div className="bg-light rounded-3 p-3">
                      <h4 className="text-success fw-bold mb-2">
                        Total: PKR {calculateTotal().toLocaleString()}<span className="fs-6">/month</span>
                      </h4>
                      <p className="text-muted small mb-0">
                        <i className="fas fa-info-circle me-1"></i>
                        Recurring monthly support until cancellation
                      </p>
                    </div>
                  </Col>
                </Row>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => setSelectedOptions({
                      education: false,
                      accommodation: false,
                      food: false,
                      complete: false
                    })}
                  >
                    Clear Selection
                  </Button>
                  <Button 
                    variant="success" 
                    size="lg" 
                    className="px-5 py-3 fw-bold rounded-pill"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate('/donate', {
                        state: {
                          sponsorAmount: calculateTotal(),
                          sponsorType: 'other',
                          step: 1
                        }
                      });
                    }}
                  >
                    <i className="fas fa-lock me-2"></i>
                    Proceed to Sponsor
                    <i className="fas fa-arrow-right ms-2"></i>
                  </Button>

                </div>
              </Alert>
            </motion.div>
          )}
        </motion.div>
      {/* Custom CSS for enhanced styling */}
      <style jsx>{`
        .sponsorship-section {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
        }
        .btn-success {
          background: linear-gradient(135deg, #198754 0%, #157347 100%);
          border: none;
        }
        .btn-primary {
          background: linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%);
          border: none;
        }
        .badge {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      </Container>
    </section>
  );
};

function SponsorAnOrphan() {
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Gallery images (using existing images from public/assets/images)
  const galleryImages = [
    '/assets/images/1.jpeg',
    '/assets/images/2.jpeg',
    '/assets/images/5.jpeg',
    '/assets/images/6.jpeg',
    '/assets/images/7.jpeg',
    '/assets/images-webp/2.webp',
    '/assets/images-webp/3.webp'
  ];

  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  return (
    <div className="sponsor-orphan-page pt-5">
      {/* Hero Section */}
      <motion.section
        className="hero-section text-white d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/assets/supportus/support.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '60vh'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container text-center pt-5">
          <motion.h1
            className="display-4 fw-bold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Sponsor An Orphan
          </motion.h1>
          <motion.p
            className="lead mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Every child deserves a chance at a brighter future. Fahad Ahmad, a bright 10-year-old boy, lost his father due to hepatitis. Despite this hardship, he dreams of becoming an army officer and is determined to serve his country.
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button 
              className="btn btn-success btn-lg px-5 py-3"
              onClick={() => {
                document.getElementById('sponsorship-options')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Sponsoring Today
            </button>

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

      {/* Enhanced Sponsorship Options Section */}
      <SponsorshipOptions />

      {/* Sponsor An Orphan Section */}
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
            Sponsor An Orphan
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
                        src={child.photo}
                        alt={child.photoDescription}
                        className="rounded-circle img-fluid"
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>
                    <h5 className="card-title text-center text-success">{child.name}</h5>
                    <p className="text-center text-muted mb-3">{child.age} years old</p>
                    <p className="card-text mb-3">{child.story}</p>
                    <div className="d-flex justify-content-center">
                      <Link
                        to="/donate"
                        className="btn btn-success btn-sm"
                      >
                        Sponsor {child.name.split(' ')[1]}
                      </Link>
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
            <Link className="btn btn-light btn-lg px-5 py-3" onClick={() => {
                document.getElementById('sponsorship-options')?.scrollIntoView({ behavior: 'smooth' });
              }}>
              Become a Sponsor
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default SponsorAnOrphan;
