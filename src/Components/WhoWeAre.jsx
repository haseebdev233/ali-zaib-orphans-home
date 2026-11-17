import SiteImage from './SiteImage';

function WhoWeAre({ content }) {
  return (
    <section className="who-we-are-section py-5 bg-light fade-in cv-auto">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="mb-4" style={{ background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', fontSize: '3rem' }}>{content.aboutTitle}</h2>
            {content.aboutText.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
          <div className="col-md-6">
            <SiteImage
              source={content.aboutPhoto}
              fallback="/assets/images-webp/5.webp"
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
      <style>{`
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
