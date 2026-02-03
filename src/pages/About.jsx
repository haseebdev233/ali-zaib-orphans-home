import React from 'react';

function About() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero-section text-white d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/assets/images/hero-image/1.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '60vh'
        }}
      >
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-4">About Ali Zaib Orphan Home</h1>
          <p className="lead">Transforming lives and building hope for orphaned children</p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="text-success mb-4">About Us</h2>
              <p className="lead mb-4">
                Ali Zaib Orphan Home operates under the patronage of Ali Zaib Foundation, a charitable, non-profit organization serving humanity in need since 1995. It is dedicated to nurturing orphaned and vulnerable children, providing them with a safe and supportive environment where hope and opportunity replace loss and despair.
              </p>
              <p className="lead">
                Ali Zaib Orphan Home offer shelter, education, healthcare, and life skills to empower children to face the future with confidence. Beyond basic care, we focus on building emotional strength, resilience, and creativity, helping them grow into independent and compassionate individuals. Every effort is aimed at creating a space where children can dream, learn, and build meaningful lives despite the hardships they have endured.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100 border-success shadow">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-success rounded-circle p-3 me-3">
                      <i className="bi bi-eye-fill text-white fs-4"></i>
                    </div>
                    <h3 className="card-title text-success mb-0">Our Vision</h3>
                  </div>
                  <p className="card-text lead">
                    To create a world where every orphaned and vulnerable child has access to love, care, education, and opportunities to realize their full potential, transforming their hardships into hope for a brighter future.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100 border-success shadow">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-success rounded-circle p-3 me-3">
                      <i className="bi bi-target text-white fs-4"></i>
                    </div>
                    <h3 className="card-title text-success mb-0">Our Mission</h3>
                  </div>
                  <p className="card-text lead">
                    To provide orphaned children with safety, education, healthcare, and emotional support, empowering them to overcome hardships, build resilience, and grow into confident, compassionate individuals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="text-success">Facilities for Orphan Children</h2>
              <p className="lead">At Ali Zaib Orphan Home, we provide orphan children with more than just shelter—we give them hope, care, and opportunities to thrive.</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-success rounded-circle p-3 d-inline-block mb-3">
                    <i className="bi bi-house-door-fill text-white fs-3"></i>
                  </div>
                  <h5 className="card-title text-success">Safe Boarding & Lodging</h5>
                  <p className="card-text">Providing a secure home environment for the orphans.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-success rounded-circle p-3 d-inline-block mb-3">
                    <i className="bi bi-egg-fried text-white fs-3"></i>
                  </div>
                  <h5 className="card-title text-success">Nutritious Meals & Clothing</h5>
                  <p className="card-text">Meeting their basic needs with quality food and clothing.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-success rounded-circle p-3 d-inline-block mb-3">
                    <i className="bi bi-book-fill text-white fs-3"></i>
                  </div>
                  <h5 className="card-title text-success">Quality Education</h5>
                  <p className="card-text">Unlocking their academic potential through tutoring and education.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-success rounded-circle p-3 d-inline-block mb-3">
                    <i className="bi bi-briefcase-fill text-white fs-3"></i>
                  </div>
                  <h5 className="card-title text-success">Career Guidance</h5>
                  <p className="card-text">Preparing them for a bright future with skill development.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-success rounded-circle p-3 d-inline-block mb-3">
                    <i className="bi bi-heart-fill text-white fs-3"></i>
                  </div>
                  <h5 className="card-title text-success">Religious Education</h5>
                  <p className="card-text">Nurturing character and values through moral guidance.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-success rounded-circle p-3 d-inline-block mb-3">
                    <i className="bi bi-heart-pulse-fill text-white fs-3"></i>
                  </div>
                  <h5 className="card-title text-success">Healthcare Services</h5>
                  <p className="card-text">Regular check-ups and medical care for good health.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-success rounded-circle p-3 d-inline-block mb-3">
                    <i className="bi bi-shield-check text-white fs-3"></i>
                  </div>
                  <h5 className="card-title text-success">Life Skills & Support</h5>
                  <p className="card-text">Building resilience and confidence through emotional support.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-success rounded-circle p-3 d-inline-block mb-3">
                    <i className="bi bi-trophy-fill text-white fs-3"></i>
                  </div>
                  <h5 className="card-title text-success">Sports & Arts</h5>
                  <p className="card-text">Holistic growth through recreational activities and arts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
