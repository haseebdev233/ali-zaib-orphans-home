import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = (number) => {
    window.open(`https://wa.me/${number}`, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:pmalizaib@gmail.com';
  };

  const handlePhoneCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">
          
          {/* Quick Links Column */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase text-success mb-4">
              <i className="bi bi-link-45deg me-2"></i>Quick Links
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none hover-green">
                  <i className="bi bi-house-door me-2"></i>Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white text-decoration-none hover-green">
                  <i className="bi bi-info-circle me-2"></i>About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/programs" className="text-white text-decoration-none hover-green">
                  <i className="bi bi-briefcase me-2"></i>Services
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/gallery" className="text-white text-decoration-none hover-green">
                  <i className="bi bi-images me-2"></i>Gallery
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/donate" className="text-white text-decoration-none hover-green">
                  <i className="bi bi-heart-fill me-2 text-danger"></i>Donate Now
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-white text-decoration-none hover-green">
                  <i className="bi bi-telephone me-2"></i>Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase text-success mb-4">
              <i className="bi bi-tools me-2 "></i>Services
            </h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center">
                <div className="bg-success rounded-circle p-2 me-3">
                  <i className="bi bi-book text-white"></i>
                </div>
                <Link to="/programs" className="text-white text-decoration-none hover-green">Free Education</Link>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <div className="bg-success rounded-circle p-2 me-3">
                  <i className="bi bi-heart-pulse text-white"></i>
                </div>
                <Link to="/programs" className="text-white text-decoration-none hover-green">Healthcare Support</Link>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <div className="bg-success rounded-circle p-2 me-3">
                  <i className="bi bi-tools text-white"></i>
                </div>
                <Link to="/programs" className="text-white text-decoration-none hover-green">Skill Development</Link>
              </li>
              <li className="d-flex align-items-center">
                <div className="bg-success rounded-circle p-2 me-3">
                  <i className="bi bi-house-heart text-white"></i>
                </div>
                <Link to="/programs" className="text-white text-decoration-none hover-green">Food & Shelter</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information Column */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase text-success mb-4">
              <i className="bi bi-envelope me-2"></i>Contact Information
            </h5>
            <p className="text-white-50 mb-4">
              Feel free to contact and reach us!
            </p>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex">
                <i className="bi bi-geo-alt-fill text-success me-3 fs-5"></i>
                <a href="https://maps.app.goo.gl/95RzoGVnVPZBbJbw9?g_st=aw" target="_blank" rel="noopener noreferrer" className="text-white hover-green text-decoration-none">P-68 New Civil Lines Ayesha Road Near Sindbad , Faisalabad Pakistan</a>
              </li>
              <li className="mb-3 d-flex">
                <i className="bi bi-telephone-fill text-success me-3 fs-5"></i>
                <div>
                  <p className="mb-0 hover-green" onClick={() => handleWhatsAppClick('923219920015')} style={{ cursor: 'pointer' }}>+92 (321) 992-0015</p>
                  <p className="mb-0 hover-green" onClick={() => handlePhoneCall('+92418847000')} style={{ cursor: 'pointer' }}>(041) 8847000</p>
                </div>
              </li>
              <li className="d-flex">
                <i className="bi bi-envelope-fill text-success me-3 fs-5"></i>
                <span className="hover-green text-white text-decoration-none" onClick={handleEmailClick} style={{ cursor: 'pointer' }}>
                  pmalizaib@gmail.com
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase text-success mb-4">
              <i className="bi bi-newspaper me-2"></i>Stay Updated
            </h5>
            <p className="text-white-50 mb-4">
              Subscribe to our newsletter for updates.
            </p>
            <div className="input-group mb-4">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Enter your email" 
                aria-label="Email"
              />
              <button className="btn btn-success" type="button">
                <i className="bi bi-send"></i>
              </button>
            </div>
            
            {/* Social Media Links */}
            <h6 className="text-uppercase text-success mb-3">Follow Us</h6>
            <div className="d-flex">
              <a href="https://www.facebook.com/profile.php?id=61586826886946" target="_blank" rel="noopener noreferrer" className="text-white me-3 social-icon">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="https://x.com/Alizaiboorphan" target="_blank" rel="noopener noreferrer" className="text-white me-3 social-icon">
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a href="https://www.instagram.com/alizaiborphanhomeaashian/" target="_blank" rel="noopener noreferrer" className="text-white me-3 social-icon">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="https://www.linkedin.com/in/ali-zaib-orphan-home-undefined-1602a03aa/" target="_blank" rel="noopener noreferrer" className="text-white me-3 social-icon">
                <i className="bi bi-linkedin fs-4"></i>
              </a>
              <a href="https://www.youtube.com/@AliZaibOrphanHome" target="_blank" rel="noopener noreferrer" className="text-white me-3 social-icon">
                <i className="bi bi-youtube fs-4"></i>
              </a>
              <a href="https://www.tiktok.com/@alizaiborphanhome" target="_blank" rel="noopener noreferrer" className="text-white social-icon">
                <i className="bi bi-tiktok fs-4"></i>
              </a>
            </div>
          </div>

        </div>

        <hr className="my-5 border-success" />

        {/* Bottom Footer */}
        <div className="row">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 text-white-50">
              &copy; {currentYear} <span className="text-success fw-bold">ALI-ZAIB</span>. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <Link to="/privacy" className="text-white-50 text-decoration-none hover-green">
                  Privacy Policy
                </Link>
              </li>
              <li className="list-inline-item mx-2">|</li>
              <li className="list-inline-item">
                <Link to="/terms" className="text-white-50 text-decoration-none hover-green">
                  Terms of Service
                </Link>
              </li>
              <li className="list-inline-item mx-2">|</li>
              <li className="list-inline-item">
                <a href="https://haseeb-portfolio-net.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-white-50 text-decoration-none hover-green">
                  develop by Haseeb Dev
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Add some custom styles for hover effects
const style = `
  .hover-green:hover {
    color: #198754 !important;
    padding-left: 5px;
    transition: all 0.3s ease;
  }
  
  .social-icon:hover {
    color: #198754 !important;
    transform: translateY(-3px);
    transition: all 0.3s ease;
  }
  
  .bg-dark {
    background: linear-gradient(135deg, #1a3c40 0%, #0f2929 100%) !important;
  }
  
  .text-success {
    color: #20c997 !important;
  }
  
  .btn-success {
    background-color: #20c997;
    border-color: #20c997;
  }
  
  .btn-success:hover {
    background-color: #1ba87e;
    border-color: #1ba87e;
  }
`;

// Add style component
const FooterStyle = () => (
  <style dangerouslySetInnerHTML={{ __html: style }} />
);

export default function FooterWithStyle() {
  return (
    <>
      <FooterStyle />
      <Footer />
    </>
  );
}