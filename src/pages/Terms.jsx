import React from 'react';
import image1 from '../assets/images/hero-image/1.png';

function Terms() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero-section text-white d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${image1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '60vh'
        }}
      >
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-4">Terms of Service</h1>
          <p className="lead">Please read these terms carefully before using our services</p>
        </div>
      </section>

      {/* Terms of Service Content */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-lg border-0">
                <div className="card-body p-5">
                  <h2 className="card-title text-success mb-4">Terms of Service for Ali Zaib Orphan Home</h2>
                  <p className="card-text mb-4">
                    <strong>Effective Date:</strong> [Insert Date]
                  </p>
                  <p className="card-text mb-4">
                    Welcome to Ali Zaib Orphan Home. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our website or services.
                  </p>

                  <h3 className="text-success mb-3">1. Acceptance of Terms</h3>
                  <p className="card-text mb-4">
                    By accessing and using the Ali Zaib Orphan Home website, you accept and agree to be bound by the terms and provision of this agreement. These Terms apply to all visitors, users, and others who access or use our services.
                  </p>

                  <h3 className="text-success mb-3">2. Description of Service</h3>
                  <p className="card-text mb-4">
                    Ali Zaib Orphan Home provides information about our orphanage, programs, and services. We offer:
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">Information about our mission and programs</li>
                    <li className="mb-2">Donation processing services</li>
                    <li className="mb-2">Volunteer registration and coordination</li>
                    <li className="mb-2">Gallery of our activities and facilities</li>
                    <li className="mb-2">Contact and communication services</li>
                  </ul>

                  <h3 className="text-success mb-3">3. User Responsibilities</h3>
                  <p className="card-text mb-4">
                    As a user of our website, you agree to:
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">Provide accurate and complete information when registering or donating</li>
                    <li className="mb-2">Use the website only for lawful purposes</li>
                    <li className="mb-2">Respect the privacy and rights of others</li>
                    <li className="mb-2">Not engage in any harmful or malicious activities</li>
                    <li className="mb-2">Comply with all applicable laws and regulations</li>
                  </ul>

                  <h3 className="text-success mb-3">4. Donations and Payments</h3>
                  <p className="card-text mb-4">
                    When making donations through our website:
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">All donations are voluntary and non-refundable</li>
                    <li className="mb-2">We use secure payment processing services</li>
                    <li className="mb-2">Tax receipts will be provided for eligible donations</li>
                    <li className="mb-2">Payment information is handled securely and not stored on our servers</li>
                  </ul>

                  <h3 className="text-success mb-3">5. Intellectual Property</h3>
                  <p className="card-text mb-4">
                    The content, features, and functionality of our website are owned by Ali Zaib Orphan Home and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                  </p>

                  <h3 className="text-success mb-3">6. Privacy Policy</h3>
                  <p className="card-text mb-4">
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our website, to understand our practices regarding the collection and use of your personal information.
                  </p>

                  <h3 className="text-success mb-3">7. Disclaimers</h3>
                  <p className="card-text mb-4">
                    Our website and services are provided "as is" without warranties of any kind. We do not guarantee that our website will be error-free, uninterrupted, or secure. We disclaim all warranties, express or implied, including but not limited to merchantability and fitness for a particular purpose.
                  </p>

                  <h3 className="text-success mb-3">8. Limitation of Liability</h3>
                  <p className="card-text mb-4">
                    In no event shall Ali Zaib Orphan Home be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or services. Our total liability shall not exceed the amount paid by you for donations in the preceding 12 months.
                  </p>

                  <h3 className="text-success mb-3">9. Indemnification</h3>
                  <p className="card-text mb-4">
                    You agree to indemnify and hold Ali Zaib Orphan Home harmless from any claims, damages, losses, or expenses arising from your use of our website or violation of these Terms.
                  </p>

                  <h3 className="text-success mb-3">10. Termination</h3>
                  <p className="card-text mb-4">
                    We reserve the right to terminate or suspend your access to our website and services at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
                  </p>

                  <h3 className="text-success mb-3">11. Governing Law</h3>
                  <p className="card-text mb-4">
                    These Terms shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions.
                  </p>

                  <h3 className="text-success mb-3">12. Changes to Terms</h3>
                  <p className="card-text mb-4">
                    We reserve the right to modify these Terms at any time. We will notify users of any changes by posting the new Terms on this page and updating the "Effective Date" at the top.
                  </p>

                  <h3 className="text-success mb-3">13. Contact Information</h3>
                  <p className="card-text mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><strong>Email:</strong> pmalizaib@gmail.com</li>
                    <li className="mb-2"><strong>Phone:</strong> +92 (321) 992-0015</li>
                    <li className="mb-2"><strong>Address:</strong> P-68 New Civil Lines Ayesha Road Near Sindbad, Faisalabad, Pakistan</li>
                  </ul>

                  <p className="card-text">
                    By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
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

export default Terms;
