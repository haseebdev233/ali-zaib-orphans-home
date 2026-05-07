import React from "react";

function WhoWeAre() {
  return (
    <section className="who-we-are-section py-5 bg-light fade-in cv-auto">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="mb-4" style={{ background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', fontSize: '3rem' }}>Who We Are?</h2>
            <p>
              Ali Zaib Orphan Home operates under the patronage of Ali Zaib Foundation, a charitable, non-profit organization serving humanity in need since 1995. It is dedicated to nurturing orphaned and vulnerable children, providing them with a safe and supportive environment where hope and opportunity replace loss and despair.
            </p>
            <p>
              Ali Zaib Orphan Home offer shelter, education, healthcare, and life skills to empower children to face the future with confidence. Beyond basic care, we focus on building emotional strength, resilience, and creativity, helping them grow into independent and compassionate individuals. Every effort is aimed at creating a space where children can dream, learn, and build meaningful lives despite the hardships they have endured.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="/assets/images-webp/5.webp"
              alt="Who We Are"
              className="img-fluid rounded"
              loading="lazy"
              decoding="async"
              width="720"
              height="480"
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 767px) {
          .who-we-are-section {
            padding-bottom: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

export default WhoWeAre;
