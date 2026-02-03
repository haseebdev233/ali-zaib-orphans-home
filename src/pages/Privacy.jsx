import React from 'react';

function Privacy() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero-section text-white d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/assets/images/hero-image/1.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '60vh'
        }}
      >
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-4">Privacy Policy</h1>
          <p className="lead">Your privacy is important to us</p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-lg border-0">
                <div className="card-body p-5">
                  <h2 className="card-title text-success mb-4">Privacy Policy for Ali Zaib Orphan Home</h2>
                  <p className="card-text mb-4">
                    <strong>Effective Date:</strong> [Insert Date]
                  </p>
                  <p className="card-text mb-4">
                    At Ali Zaib Orphan Home, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our services.
                  </p>

                  <h3 className="text-success mb-3">1. Information We Collect</h3>
                  <p className="card-text mb-4">
                    We may collect the following types of information:
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><strong>Personal Information:</strong> Name, email address, phone number, mailing address, and other contact details you provide when contacting us, donating, volunteering, or subscribing to our newsletter.</li>
                    <li className="mb-2"><strong>Donation Information:</strong> Payment details, donation amounts, and related transaction information when you make a donation.</li>
                    <li className="mb-2"><strong>Usage Data:</strong> Information about how you access and use our website, including IP address, browser type, pages visited, and time spent on our site.</li>
                    <li className="mb-2"><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to enhance your experience on our website.</li>
                  </ul>

                  <h3 className="text-success mb-3">2. How We Use Your Information</h3>
                  <p className="card-text mb-4">
                    We use the information we collect for the following purposes:
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">To process donations and provide tax receipts.</li>
                    <li className="mb-2">To communicate with you about our programs, events, and updates.</li>
                    <li className="mb-2">To respond to your inquiries and provide customer support.</li>
                    <li className="mb-2">To improve our website and services.</li>
                    <li className="mb-2">To comply with legal obligations and protect our rights.</li>
                  </ul>

                  <h3 className="text-success mb-3">3. Information Sharing and Disclosure</h3>
                  <p className="card-text mb-4">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">With service providers who assist us in operating our website or conducting our business (e.g., payment processors, email service providers).</li>
                    <li className="mb-2">When required by law or to protect our rights and safety.</li>
                    <li className="mb-2">In connection with a merger, acquisition, or sale of assets.</li>
                  </ul>

                  <h3 className="text-success mb-3">4. Data Security</h3>
                  <p className="card-text mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                  </p>

                  <h3 className="text-success mb-3">5. Cookies and Tracking Technologies</h3>
                  <p className="card-text mb-4">
                    Our website uses cookies to enhance your browsing experience. You can control cookies through your browser settings, but disabling cookies may affect the functionality of our website.
                  </p>

                  <h3 className="text-success mb-3">6. Third-Party Links</h3>
                  <p className="card-text mb-4">
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party websites you visit.
                  </p>

                  <h3 className="text-success mb-3">7. Children's Privacy</h3>
                  <p className="card-text mb-4">
                    Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.
                  </p>

                  <h3 className="text-success mb-3">8. Your Rights</h3>
                  <p className="card-text mb-4">
                    Depending on your location, you may have certain rights regarding your personal information, including:
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">The right to access and update your personal information.</li>
                    <li className="mb-2">The right to request deletion of your personal information.</li>
                    <li className="mb-2">The right to opt out of marketing communications.</li>
                  </ul>

                  <h3 className="text-success mb-3">9. Changes to This Privacy Policy</h3>
                  <p className="card-text mb-4">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top.
                  </p>

                  <h3 className="text-success mb-3">10. Contact Us</h3>
                  <p className="card-text mb-4">
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><strong>Email:</strong> pmalizaib@gmail.com</li>
                    <li className="mb-2"><strong>Phone:</strong> +92 (321) 992-0015</li>
                    <li className="mb-2"><strong>Address:</strong> P-68 New Civil Lines Ayesha Road Near Sindbad, Faisalabad, Pakistan</li>
                  </ul>

                  <p className="card-text">
                    By using our website or services, you consent to the collection and use of your information as outlined in this Privacy Policy.
                  </p>
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
