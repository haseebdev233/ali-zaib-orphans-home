import { useState } from 'react';
import { ref as databaseRef, push, set, serverTimestamp } from 'firebase/database';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import ToastHost from "../Components/ToastHost";

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
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({ name: '', email: '', phone: '' });

  const validateName = (name) => {
    if (!name.trim()) return 'Full name is required';
    if (name.trim().length < 3) return 'Name must be at least 3 characters';
    if (!/^[a-zA-Z\s.'-]+$/.test(name.trim())) return 'Name can only contain letters, spaces, dots, hyphens';
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email address is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return 'Phone number is required';
    const digits = phone.replace(/[\s\-\+\(\)]/g, '');
    if (digits.length < 10 || digits.length > 13) return 'Phone number must be 10-13 digits';
    if (!/^[\d\s\-\+\(\)]+$/.test(phone)) return 'Please enter a valid phone number';
    return '';
  };

  const validateForm = () => {
    const errors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone)
    };
    setFormErrors(errors);
    return !errors.name && !errors.email && !errors.phone;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    console.log('handleSubmit called');
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    // Validation
    if (!validateForm()) {
      console.log('Validation failed');
      return;
    }

    console.log('Validation passed, submitting...');
    setIsSubmitting(true);

    try {
      // Save to Realtime Database
      const newRef = push(databaseRef(db, 'volunteers'));
      await set(newRef, {
        ...formData,
        submittedAt: serverTimestamp(),
        status: 'pending'
      });

      console.log('Volunteer application submitted with ID: ', newRef.key);
      setSubmitSuccess(true);
      toast.success('Volunteer application submitted successfully!');

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
    <>
      <ToastHost />
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
                    className={`form-control ${formErrors.name ? 'is-invalid' : formData.name.trim().length >= 3 ? 'is-valid' : ''}`}
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => setFormErrors(prev => ({ ...prev, name: validateName(formData.name) }))}
                    required
                  />
                  {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className={`form-control ${formErrors.email ? 'is-invalid' : formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'is-valid' : ''}`}
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => setFormErrors(prev => ({ ...prev, email: validateEmail(formData.email) }))}
                    required
                  />
                  {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    className={`form-control ${formErrors.phone ? 'is-invalid' : formData.phone && formData.phone.replace(/[\s\-\+\(\)]/g, '').length >= 10 ? 'is-valid' : ''}`}
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => setFormErrors(prev => ({ ...prev, phone: validatePhone(formData.phone) }))}
                    required
                  />
                  {formErrors.phone && <div className="invalid-feedback">{formErrors.phone}</div>}
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

                <button type="button" className="btn btn-primary w-100" disabled={isSubmitting} onClick={handleSubmit}>
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

              {submitError && (
                <div className="alert alert-danger mt-3" role="alert">
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="alert alert-success mt-3" role="alert">
                  Volunteer application submitted successfully!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Volunteer;
