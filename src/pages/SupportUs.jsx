import { useImageSource } from '../data/useImageSource';
import { supportDefaults } from '../data/siteContent';
import { usePageContent } from '../data/usePageContent';
import DonationAccounts from '../Components/DonationAccounts';
import { useDonationDetails } from '../data/useDonationDetails';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';

function SupportUs() {
  const content = usePageContent('support-us', supportDefaults);
  const details = useDonationDetails();
  const heroImage = useImageSource(content.heroImage, supportDefaults.heroImage);
  const hadithImage = useImageSource(content.hadithImage, supportDefaults.hadithImage);

  return (
    <div className="support-us-page">
      {/* Hero Section */}
      <Motion.section
        className="hero-section text-white d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${JSON.stringify(heroImage)})`,
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
              <Motion.h1
                className="display-10 fw-bold mb-4 "
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {content.title}
              </Motion.h1>
              <Motion.p
                className="lead mb-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {content.intro}
              </Motion.p>
              <Motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Link to="/donate" className="btn btn-danger btn-lg me-3">
                  Donate Now
                </Link>
                <Link to="/sponsor-an-orphan" className="btn btn-success btn-lg">
                  Sponsor An Orphan
                </Link>
              </Motion.div>
            </div>
          </div>
        </div>
      </Motion.section>

      {/* Islamic Perspective Section */}
      <Motion.section
        className="islamic-perspective py-5 bg-light"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <Motion.h2
                className="fw-bold mb-4 text-success"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Islamic Perspective on Orphan Care
              </Motion.h2>
              <Motion.p
                className="mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                In Islam, caring for orphans is a highly rewarded act. The Prophet Muhammad (PBUH) said:
              </Motion.p>
              <Motion.blockquote
                className="blockquote"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="mb-0">"I and the one who sponsors an orphan will be in Paradise like this," and he indicated with his forefinger and middle finger.</p>
                <footer className="blockquote-footer p-2">Sahih al-Bukhari</footer>
              </Motion.blockquote>
            </div>
            <div className="col-lg-6 text-center">
              <Motion.img
                src={hadithImage}
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
      </Motion.section>

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
      <Motion.section
        className="in-kind-donations py-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="display-5 fw-bold text-success">{content.inKindTitle}</h2>
              <p className="lead text-muted text-center">{content.inKindIntro}</p>
            </div>
          </div>
          <div className="row g-4">
            {content.inKindItems.map((item, index) => (
              <Motion.div className="col-md-6 col-lg-4" key={item.id} initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.5) }} viewport={{ once: true }}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center p-4">
                    <div className="mb-3"><i className={item.icon || "bi bi-heart text-success"} style={{ fontSize: "3rem" }} aria-hidden="true" /></div>
                    <h5 className="card-title fw-bold mb-3">{item.title}</h5>
                    <p className="card-text text-muted mb-4">{item.description}</p>
                  </div>
                </div>
              </Motion.div>
            ))}
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
      </Motion.section>

      {/* Bank Details Section */}
      <Motion.section
        className="bank-details py-5 bg-light"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <DonationAccounts details={details} heading="Bank Details" />
        </div>
      </Motion.section>
    </div>
  );
}

export default SupportUs;
