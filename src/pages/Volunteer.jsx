import { useState } from 'react';
import { ref, push, set, serverTimestamp } from 'firebase/database';
import { db } from '../firebase';

function Volunteer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    availability: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      setSubmitError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to Realtime Database
      const newRef = push(ref(db, 'volunteers'));
      await set(newRef, {
        ...formData,
        submittedAt: serverTimestamp(),
        status: 'pending'
      });

      console.log('Volunteer application submitted with ID: ', newRef.key);
      setSubmitSuccess(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        skills: '',
        availability: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting volunteer application: ', error);
      setSubmitError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Become a Volunteer</h2>
              <p className="text-center text-muted mb-4">
                Join us in making a difference. Fill out the form below to get started.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="skills" className="form-label">Skills/Interests</label>
                  <textarea
                    className="form-control"
                    id="skills"
                    name="skills"
                    rows="3"
                    placeholder="Tell us about your skills or areas of interest (e.g., teaching, event planning, etc.)"
                    value={formData.skills}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="availability" className="form-label">Availability</label>
                  <select
                    className="form-select"
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                  >
                    <option value="">Select your availability</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="weekends">Weekends</option>
                    <option value="evenings">Evenings</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Additional Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="3"
                    placeholder="Any additional information or questions?"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Volunteer;
