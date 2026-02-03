import { useState } from 'react';
import { ref as databaseRef, push, set, serverTimestamp } from 'firebase/database';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function CampusAmbassador() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    gender: '',
    year: '',
    experience: '',
    motivation: '',
    socialMedia: '',
    availability: '',
    contribution: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    console.log('handleSubmit called');
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.university || !formData.contribution) {
      console.log('Validation failed');
      setSubmitError('Please fill in all required fields.');
      return;
    }

    console.log('Validation passed, submitting...');
    setIsSubmitting(true);

    try {
      // Save to Realtime Database
      const newRef = push(databaseRef(db, 'campus-ambassadors'));
      await set(newRef, {
        ...formData,
        submittedAt: serverTimestamp(),
        status: 'pending'
      });

      console.log('Campus Ambassador application submitted with ID: ', newRef.key);
      setSubmitSuccess(true);
      toast.success('Campus Ambassador application submitted successfully!');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        university: '',
        gender: '',
        year: '',
        experience: '',
        motivation: '',
        socialMedia: '',
        availability: '',
        contribution: ''
      });
    } catch (error) {
      console.error('Error submitting campus ambassador application: ', error);
      setSubmitError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          {/* Header Section */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary mb-3">Become a Campus Ambassador</h1>
            <p className="lead text-muted mb-4">
              Join our elite team of student leaders who make a real difference on their campuses and in the community.
            </p>
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="p-3 bg-light rounded-3">
                  <i className="bi bi-megaphone-fill fs-2 text-primary mb-2"></i>
                  <h6 className="fw-bold">Spread Awareness</h6>
                  <p className="small text-muted">Promote our mission on your campus</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-light rounded-3">
                  <i className="bi bi-heart-fill fs-2 text-danger mb-2"></i>
                  <h6 className="fw-bold">Organize Events</h6>
                  <p className="small text-muted">Lead donation drives and fundraisers</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-light rounded-3">
                  <i className="bi bi-trophy-fill fs-2 text-warning mb-2"></i>
                  <h6 className="fw-bold">Get Rewarded</h6>
                  <p className="small text-muted">Earn certificates and recognition</p>
                </div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <h3 className="fw-bold mb-4 text-center">Apply Now</h3>

              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label fw-bold">Full Name *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-person"></i>
                      </span>
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
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label fw-bold">Email Address *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="your.email@university.edu"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label fw-bold">Phone Number *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-telephone"></i>
                      </span>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="+92 300 1234567"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="university" className="form-label fw-bold">Institute Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-building"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="university"
                        name="university"
                        placeholder="Institute Name"
                        value={formData.university}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="gender" className="form-label fw-bold">Gender</label>
                    <select
                      className="form-select"
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="year" className="form-label fw-bold">Academic Grades</label>
                    <select
                      className="form-select"
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                    >
                      <option value="">Select Semester Grade</option>
                      <option value="A">A</option>
                      <option value="B+">B+</option>
                      <option value="B">B</option>
                      <option value="C+">C+</option>
                      <option value="C">C</option>
                      <option value="D+">D+</option>
                      <option value="D">D</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="socialMedia" className="form-label fw-bold">Social Media Handle</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-instagram"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="socialMedia"
                        name="socialMedia"
                        placeholder="@yourhandle"
                        value={formData.socialMedia}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="availability" className="form-label fw-bold">Availability</label>
                    <select
                      className="form-select"
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                    >
                      <option value="">Select availability</option>
                      <option value="weekends">Weekends Only</option>
                      <option value="weekdays">Weekdays Only</option>
                      <option value="both">Both Weekdays & Weekends</option>
                      <option value="flexible">Flexible Schedule</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label htmlFor="experience" className="form-label fw-bold">Previous Leadership/Volunteer Experience</label>
                    <textarea
                      className="form-control"
                      id="experience"
                      name="experience"
                      rows="3"
                      placeholder="Tell us about your leadership roles, volunteer work, or any relevant experience..."
                      value={formData.experience}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="motivation" className="form-label fw-bold">Why do you want to be a Campus Ambassador? *</label>
                    <textarea
                      className="form-control"
                      id="motivation"
                      name="motivation"
                      rows="4"
                      placeholder="Share your motivation and what you hope to achieve as a campus ambassador..."
                      value={formData.motivation}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="contribution" className="form-label fw-bold">When you become an ambassador, what will you do for this orphan home? *</label>
                    <textarea
                      className="form-control"
                      id="contribution"
                      name="contribution"
                      rows="4"
                      placeholder="Describe your plans and contributions..."
                      value={formData.contribution}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-5"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send-fill me-2"></i>
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </form>

              {submitError && (
                <div className="alert alert-danger mt-4" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="alert alert-success mt-4" role="alert">
                  <i className="bi bi-check-circle me-2"></i>
                  Campus Ambassador application submitted successfully! We'll review your application and get back to you within 3-5 business days.
                </div>
              )}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-5">
            <h3 className="fw-bold text-center mb-4">Ambassador Benefits</h3>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-award fs-1 text-success mb-3"></i>
                    <h6 className="fw-bold">Official Certificate</h6>
                    <p className="text-muted small">Receive an official certificate recognizing your contributions</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-people fs-1 text-primary mb-3"></i>
                    <h6 className="fw-bold">Networking Opportunities</h6>
                    <p className="text-muted small">Connect with other student leaders and professionals</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-lightbulb fs-1 text-warning mb-3"></i>
                    <h6 className="fw-bold">Skill Development</h6>
                    <p className="text-muted small">Develop leadership, communication, and organizational skills</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <i className="bi bi-heart fs-1 text-danger mb-3"></i>
                    <h6 className="fw-bold">Make an Impact</h6>
                    <p className="text-muted small">Directly contribute to helping orphaned children</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CampusAmbassador;
