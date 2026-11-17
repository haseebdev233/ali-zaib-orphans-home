import { contactDefaults } from '../data/siteContent';
import { usePageContent } from '../data/usePageContent';
import React from 'react';
import { motion as Motion } from 'framer-motion';

function Contact() {
  const content = usePageContent('contact', contactDefaults);
  return (
    <Motion.div
      className="container-fluid py-5"
      style={{ backgroundColor: '#f8f9fa' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary">{content.title}</h1>
          <p className="lead text-muted text-center">{content.intro}</p>
        </div>

        <div className="row g-4">
          {/* Phone Numbers Section */}
          <div className="col-lg-6">
            <div className="card shadow-lg border-0 h-100">
              <div className="card-header bg-primary text-white text-center">
                <h3 className="card-title mb-0">
                  <i className="fas fa-phone me-2"></i>Phone Numbers
                </h3>
              </div>
              <div className="card-body">
                {content.phones.map((phone, index) => (
                  <div key={phone.id} className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded">
                    <div>
                      <strong>{phone.label}:</strong> {phone.number}
                    </div>
                    <div>
                      {index < 2 && (
                        <a
                          className="btn btn-success btn-sm me-2"
                          href={`https://wa.me/${phone.number.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                          title="Open in WhatsApp"
                        >
                          <i className="fab fa-whatsapp"></i> WhatsApp
                        </a>
                      )}
                      <a
                        className="btn btn-primary btn-sm"
                        href={`tel:${phone.number}`}
                        title="Call"
                      >
                        <i className="fas fa-phone"></i> Call
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Locations Section */}
          <div className="col-lg-6">
            <div className="card shadow-lg border-0 h-100">
              <div className="card-header bg-success text-white text-center">
                <h3 className="card-title mb-0">
                  <i className="fas fa-map-marker-alt me-2"></i>Addresses / Locations
                </h3>
              </div>
              <div className="card-body">
                {content.locations.map((location) => (
                  <div key={location.id} className="mb-4 p-3 border rounded">
                    <h5 className="text-primary">{location.name}</h5>
                    <p className="mb-3">{location.address}</p>
                    <a
                      className="btn btn-info btn-sm"
                      href={location.mapLink.startsWith("https://") ? location.mapLink : undefined} target="_blank" rel="noopener noreferrer"
                      title="View on Map"
                    >
                      <i className="fas fa-map"></i> View Location
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Contact Info */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card shadow-lg border-0">
              <div className="card-body text-center">
                <h4 className="card-title text-secondary">Need More Help?</h4>
                <p className="card-text text-center">
                  For any inquiries, donations, or volunteer opportunities, feel free to reach out to us through any of the above contact methods.
                </p>
                <p className="text-muted text-center">
                  <i className="fas fa-envelope me-2 "></i>Email: <a href={`mailto:${content.email}`} style={{ color: '#6c757d', textDecoration: 'underline' }}>{content.email}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Motion.div>
  );
}

export default Contact;
