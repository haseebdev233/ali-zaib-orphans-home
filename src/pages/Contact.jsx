import React from 'react';

function Contact() {
  const phoneNumbers = [
    { number: '+92321-9920015', label: 'Phone 1' },
    { number: '+92300-8666468', label: 'Phone 2' },
    { number: '041-8847000', label: 'Phone 3' },
  ];

  const locations = [
    {
      name: 'Orphan Home',
      address: 'P-68 New Civil Lines Ayesha Road Near Sindbad , Faisalabad Pakistan',
      mapLink: 'https://maps.app.goo.gl/95RzoGVnVPZBbJbw9?g_st=aw',
    },
    {
      name: 'Head Office',
      address: 'Ali Zaib Foundation, inside Faisalabad Teaching Hospital, Ghulam Muhammad Abad, Faisalabad',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=Ali+Zaib+Foundation,+inside+Faisalabad+Teaching+Hospital,+Ghulam+Muhammad+Abad,+Faisalabad',
    },
  ];

  const handleWhatsAppClick = (phone) => {
    const whatsappUrl = `https://wa.me/${phone.replace(/-/g, '')}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneClick = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleLocationClick = (mapLink) => {
    window.open(mapLink, '_blank');
  };

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary">Contact Us</h1>
          <p className="lead text-muted">Get in touch with Ali Zaib Orphan Home</p>
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
                {phoneNumbers.map((phone, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded">
                    <div>
                      <strong>{phone.label}:</strong> {phone.number}
                    </div>
                    <div>
                      {index < 2 && (
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleWhatsAppClick(phone.number)}
                          title="Open in WhatsApp"
                        >
                          <i className="fab fa-whatsapp"></i> WhatsApp
                        </button>
                      )}
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handlePhoneClick(phone.number)}
                        title="Call"
                      >
                        <i className="fas fa-phone"></i> Call
                      </button>
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
                {locations.map((location, index) => (
                  <div key={index} className="mb-4 p-3 border rounded">
                    <h5 className="text-primary">{location.name}</h5>
                    <p className="mb-3">{location.address}</p>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleLocationClick(location.mapLink)}
                      title="View on Map"
                    >
                      <i className="fas fa-map"></i> View Location
                    </button>
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
                <p className="card-text">
                  For any inquiries, donations, or volunteer opportunities, feel free to reach out to us through any of the above contact methods.
                </p>
                <p className="text-muted">
                  <i className="fas fa-envelope me-2"></i>Email: info@alizaibfoundation.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
