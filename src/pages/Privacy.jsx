import PolicyCopy from '../Components/PolicyCopy';
import { useImageSource } from '../data/useImageSource';
import { privacyDefaults } from '../data/siteContent';
import { usePageContent } from '../data/usePageContent';
import React from 'react';

function Privacy() {
  const content = usePageContent('privacy', privacyDefaults);
  const heroImage = useImageSource(content.heroImage, privacyDefaults.heroImage);
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

      {/* Privacy Policy Content */}
      <section className="py-5 bg-light">
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
      </section>
    </>
  );
}

export default Privacy;
