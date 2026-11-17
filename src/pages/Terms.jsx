import PolicyCopy from '../Components/PolicyCopy';
import { useImageSource } from '../data/useImageSource';
import { termsDefaults } from '../data/siteContent';
import { usePageContent } from '../data/usePageContent';
import React from 'react';
import { motion as Motion } from 'framer-motion';

function Terms() {
  const content = usePageContent('terms', termsDefaults);
  const heroImage = useImageSource(content.heroImage, termsDefaults.heroImage);
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
          <p className="lead">{content.intro}</p>
        </div>
      </section>

      {/* Terms of Service Content */}
      <Motion.section
        className="py-5 bg-light"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-lg border-0">
                <div className="card-body p-5">
                  <h2 className="card-title text-success mb-4">{content.bodyTitle}</h2>
                  <PolicyCopy text={content.body} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Motion.section>
    </>
  );
}

export default Terms;
