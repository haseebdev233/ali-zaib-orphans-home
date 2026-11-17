import { useImageSource } from '../data/useImageSource';
import SiteImage from '../Components/SiteImage';
import { aboutDefaults } from '../data/siteContent';
import { usePageContent } from '../data/usePageContent';
import React from 'react';
import { motion as Motion } from 'framer-motion';

function About() {
  const content = usePageContent('about', aboutDefaults);
  const heroImage = useImageSource(content.heroImage, aboutDefaults.heroImage);

  return (
    <>
      {/* Hero Section */}
      <section
        className="hero-section text-white d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${JSON.stringify(heroImage)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '60vh'
        }}
      >
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-4">{content.title}</h1>
          <p className="lead text-center">{content.intro}</p>
        </div>
      </section>

      {/* About Us Section */}
      <Motion.section
        className="py-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="text-success mb-4">About Us</h2>
              <p className="lead mb-4">
                {content.about}
              </p>
            </div>
          </div>
        </div>
      </Motion.section>

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
                    {content.vision}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100 border-success shadow">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-success rounded-circle p-3 me-3">
                      <i className="bi bi-eye-fill text-white fs-4"></i>
                    </div>
                    <h3 className="card-title text-success mb-0">Our Mission</h3>
                  </div>
                  <p className="card-text lead">
                    {content.mission}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <Motion.section
        className="py-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="text-success">{content.facilitiesTitle}</h2>
              <p className="lead">{content.facilitiesIntro}</p>
            </div>
          </div>
          <div className="row g-4">
            {content.facilities.map((facility) => (
              <div className="col-md-6 col-lg-4" key={facility.id}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div className="bg-success rounded-circle p-3 d-inline-block mb-3">
                      <i className={`bi ${facility.icon || "bi-heart-fill"} text-white fs-3`} aria-hidden="true" />
                    </div>
                    <h5 className="card-title text-success">{facility.title}</h5>
                    <p className="card-text">{facility.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Motion.section>

      {/* Recognition Section */}
      <Motion.section
        className="py-5 bg-light"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="text-success">{content.recognitionTitle}</h2>
              <p className="lead text-center">{content.recognitionIntro}</p>
            </div>
          </div>
          <div className="row g-4">
            {content.certificates.map((cert) => (
              <div key={cert.id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm">
                  <SiteImage source={cert.src} alt={cert.alt} className="card-img-top" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Motion.section>
    </>
  );
}

export default About;
