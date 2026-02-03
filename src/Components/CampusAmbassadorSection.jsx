import React from 'react';
import { Link } from 'react-router-dom';

function CampusAmbassadorSection() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="text-center">
              <img
                src="/assets/images/hero-image/3.png"
                alt="Campus Ambassador"
                className="img-fluid rounded shadow"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <h2 className="text-success mb-4">Become a Campus Ambassador</h2>
            <p className="lead mb-4">
              Join our elite team of student leaders who spread awareness, organize events, and make a real difference on their campuses and in the community.
            </p>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <i className="bi bi-megaphone-fill text-primary me-3 fs-4"></i>
                  <span>Spread Awareness</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <i className="bi bi-heart-fill text-danger me-3 fs-4"></i>
                  <span>Organize Events</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <i className="bi bi-trophy-fill text-warning me-3 fs-4"></i>
                  <span>Get Rewarded</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <i className="bi bi-certificate text-success me-3 fs-4"></i>
                  <span>Earn Certificates</span>
                </div>
              </div>
            </div>
            <Link to="/campus-ambassador" className="btn btn-success btn-lg px-4">
              <i className="bi bi-person-plus-fill me-2"></i>Apply Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CampusAmbassadorSection;
