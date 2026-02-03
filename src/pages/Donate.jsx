import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ref, push, set, serverTimestamp } from 'firebase/database';
import { db } from '../firebase';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe("pk_test_51NtY6cSEeBd7H6oK2YQ8Z8p4wJkLmN1A2bC3d4eF5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5");

function DonationPage() {
  const [step, setStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isMonthly, setIsMonthly] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId] = useState(`DON-${Date.now().toString().slice(-8)}`);

  const presetAmounts = [100, 250, 500, 1000, 2500, 5000];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(parseInt(value));
    }
  };

  const handleDonorInfo = (field, value) => {
    setDonorInfo(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalAmount = selectedAmount;

  // Mock payment processing
  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setStep(4);
  };

  const handleJazzCashPayment = () => {
    // In real implementation, this would redirect to JazzCash payment
    window.open(`https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction?Amount=${selectedAmount}&ReturnURL=${window.location.origin}/thank-you`, '_blank');
  };

  return (
    <section className="py-5" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh'
    }}>
      <div className="container py-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5"
        >
          <h1 className="display-4 fw-bold text-white mb-3">
            Support Our Children
          </h1>
          <p className="lead text-white-75 mb-0">
            Your donation creates lasting impact on young lives
          </p>
        </motion.div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Progress Steps */}
            <div className="mb-5">
              <div className="d-flex justify-content-between position-relative">
                <div className="position-absolute top-50 start-0 end-0 h-2 bg-white bg-opacity-25" style={{ zIndex: 1 }}></div>
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="position-relative" style={{ zIndex: 2 }}>
                    <button
                      className={`btn rounded-circle ${step >= s ? 'btn-primary' : 'btn-light'}`}
                      style={{ width: '50px', height: '50px' }}
                      onClick={() => setStep(s)}
                      disabled={step < s}
                    >
                      {step > s ? <i className="bi bi-check-lg"></i> : s}
                    </button>
                    <div className="position-absolute start-50 translate-middle-x mt-2 small text-white text-nowrap">
                      {s === 1 && 'Amount'}
                      {s === 2 && 'Details'}
                      {s === 3 && 'Payment'}
                      {s === 4 && 'Complete'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Card */}
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card border-0 shadow-lg rounded-4 overflow-hidden"
            >
              {/* Step 1: Amount Selection */}
              {step === 1 && (
                <div className="card-body p-5">
                  <h3 className="fw-bold mb-4 text-primary">Select Donation Amount</h3>
                  
                  {/* Preset Amounts */}
                  <div className="row g-3 mb-4">
                    {presetAmounts.map((amount) => (
                      <div key={amount} className="col-6 col-md-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`btn w-100 py-4 rounded-3 fw-bold ${selectedAmount === amount ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => handleAmountSelect(amount)}
                        >
                          {formatCurrency(amount)}
                        </motion.button>
                      </div>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Or Enter Custom Amount</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-primary text-white border-primary">
                        <i className="bi bi-currency-rupee"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-primary"
                        placeholder="Enter amount in PKR"
                        value={customAmount}
                        onChange={handleCustomAmount}
                      />
                      <span className="input-group-text bg-light border-primary">PKR</span>
                    </div>
                  </div>

                  {/* Monthly/One-time */}
                  <div className="mb-4">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="oneTime"
                        checked={!isMonthly}
                        onChange={() => setIsMonthly(false)}
                      />
                      <label className="form-check-label fw-medium" htmlFor="oneTime">
                        One-time Donation
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="monthly"
                        checked={isMonthly}
                        onChange={() => setIsMonthly(true)}
                      />
                      <label className="form-check-label fw-medium" htmlFor="monthly">
                        <span className="text-success">Monthly Donation</span> (10% recurring discount)
                      </label>
                    </div>
                  </div>

                  {/* Impact Preview */}
                  <div className="p-4 rounded-3 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <h5 className="fw-bold mb-3">Your Impact</h5>
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <i className="bi bi-heart-pulse fs-1 text-danger"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">
                          {selectedAmount >= 1000 ? 'Major Impact' : 'Significant Help'}
                        </h6>
                        <p className="mb-0 text-muted">
                          {selectedAmount >= 1000 
                            ? 'Your donation can support multiple children for a month'
                            : 'Your donation provides essential supplies and care'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="text-center">
                      <h4 className="fw-bold text-primary">{formatCurrency(totalAmount)}</h4>
                      <small className="text-muted">Total Donation</small>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-primary btn-lg px-5"
                      onClick={() => setStep(2)}
                      disabled={selectedAmount < 100}
                    >
                      Continue <i className="bi bi-arrow-right ms-2"></i>
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Step 2: Donor Information */}
              {step === 2 && (
                <div className="card-body p-5">
                  <h3 className="fw-bold mb-4 text-primary">Your Information</h3>
                  
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Full Name *</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="bi bi-person"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="John Doe"
                          value={donorInfo.name}
                          onChange={(e) => handleDonorInfo('name', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Email Address *</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="bi bi-envelope"></i>
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="john@example.com"
                          value={donorInfo.email}
                          onChange={(e) => handleDonorInfo('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="bi bi-telephone"></i>
                        </span>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="+92 300 1234567"
                          value={donorInfo.phone}
                          onChange={(e) => handleDonorInfo('phone', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label fw-bold">Message (Optional)</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Add a personal message or dedication..."
                        value={donorInfo.message}
                        onChange={(e) => handleDonorInfo('message', e.target.value)}
                      />
                    </div>
                    
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="receipt"
                          defaultChecked
                        />
                        <label className="form-check-label" htmlFor="receipt">
                          Send me a tax-deductible receipt via email
                        </label>
                      </div>
                      
                      <div className="form-check mt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="updates"
                          defaultChecked
                        />
                        <label className="form-check-label" htmlFor="updates">
                          Receive updates about our children's progress
                        </label>
                      </div>
                      
                      <div className="form-check mt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="anonymous"
                        />
                        <label className="form-check-label" htmlFor="anonymous">
                          Make this donation anonymous
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mt-5">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => setStep(1)}
                    >
                      <i className="bi bi-arrow-left me-2"></i> Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-primary btn-lg px-5"
                      onClick={() => setStep(3)}
                      disabled={!donorInfo.name || !donorInfo.email}
                    >
                      Continue to Payment <i className="bi bi-arrow-right ms-2"></i>
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Method */}
              {step === 3 && (
                <div className="card-body p-5">
                  <h3 className="fw-bold mb-4 text-primary">Payment Method</h3>
                  
                  {/* Donation Summary */}
                  <div className="p-4 rounded-3 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <h5 className="fw-bold mb-3">Donation Summary</h5>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-2">
                          <small className="text-muted">Amount</small>
                          <div className="fw-bold">{formatCurrency(selectedAmount)}</div>
                        </div>
                        <div className="mb-2">
                          <small className="text-muted">Frequency</small>
                          <div className="fw-bold">{isMonthly ? 'Monthly' : 'One-time'}</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-2">
                          <small className="text-muted">Donor</small>
                          <div className="fw-bold">{donorInfo.name}</div>
                        </div>
                        <div className="mb-2">
                          <small className="text-muted">Contact</small>
                          <div className="fw-bold">{donorInfo.email}</div>
                        </div>
                      </div>
                    </div>
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">Total</span>
                        <span className="fw-bold fs-4 text-primary">{formatCurrency(totalAmount)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mb-4">
                    <h5 className="fw-bold mb-3">Select Payment Method</h5>
                    
                    <div className="row g-3">
                      {/* Credit/Debit Card */}
                      <div className="col-md-6">
                        <div 
                          className={`p-4 rounded-3 border ${paymentMethod === 'card' ? 'border-primary bg-primary bg-opacity-10' : 'border-light'}`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setPaymentMethod('card')}
                        >
                          <div className="d-flex align-items-center mb-3">
                            <div className={`me-3 p-2 rounded ${paymentMethod === 'card' ? 'bg-primary text-white' : 'bg-light'}`}>
                              <i className="bi bi-credit-card-2-front fs-4"></i>
                            </div>
                            <div>
                              <h6 className="fw-bold mb-0">Credit/Debit Card</h6>
                              <small className="text-muted">Visa, MasterCard, American Express</small>
                            </div>
                            {paymentMethod === 'card' && (
                              <div className="ms-auto">
                                <i className="bi bi-check-circle-fill text-primary fs-5"></i>
                              </div>
                            )}
                          </div>
                          <div className="d-flex gap-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" height="30" alt="Visa" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" height="30" alt="MasterCard" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" height="30" alt="Amex" />
                          </div>
                        </div>
                      </div>

                      {/* JazzCash */}
                      <div className="col-md-6">
                        <div 
                          className={`p-4 rounded-3 border ${paymentMethod === 'jazzcash' ? 'border-primary bg-primary bg-opacity-10' : 'border-light'}`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setPaymentMethod('jazzcash')}
                        >
                          <div className="d-flex align-items-center mb-3">
                            <div className={`me-3 p-2 rounded ${paymentMethod === 'jazzcash' ? 'bg-primary text-white' : 'bg-light'}`}>
                              <i className="bi bi-phone fs-4"></i>
                            </div>
                            <div>
                              <h6 className="fw-bold mb-0">JazzCash</h6>
                              <small className="text-muted">Mobile Wallet & Bank Transfer</small>
                            </div>
                            {paymentMethod === 'jazzcash' && (
                              <div className="ms-auto">
                                <i className="bi bi-check-circle-fill text-primary fs-5"></i>
                              </div>
                            )}
                          </div>
                          <div className="d-flex gap-2">
                            <img src="https://www.jazzcash.com.pk/images/jazzcash-logo.svg" height="30" alt="JazzCash" />
                            <span className="badge bg-success">Popular in Pakistan</span>
                          </div>
                        </div>
                      </div>

                      {/* More payment methods can be added here */}
                    </div>
                  </div>

                  {/* Payment Form */}
                  {paymentMethod === 'card' && (
                    <Elements stripe={stripePromise}>
                      <CardPaymentForm 
                        amount={totalAmount}
                        donorInfo={donorInfo}
                        isMonthly={isMonthly}
                        onSuccess={() => {
                          setStep(4);
                        }}
                      />
                    </Elements>
                  )}

                  {paymentMethod === 'jazzcash' && (
                    <div className="mt-4">
                      <div className="alert alert-info">
                        <i className="bi bi-info-circle me-2"></i>
                        You will be redirected to JazzCash secure payment portal
                      </div>
                      <div className="d-grid">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="btn btn-warning btn-lg"
                          onClick={handleJazzCashPayment}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Processing...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-arrow-right-circle me-2"></i>
                              Proceed to JazzCash Payment
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  )}

                  <div className="d-flex justify-content-between mt-4">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => setStep(2)}
                    >
                      <i className="bi bi-arrow-left me-2"></i> Back
                    </button>
                    
                    {/* Alternative: Direct Payment Button */}
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handlePayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Test Payment (Demo)'}
                    </button>
                  </div>

                  {/* Security Info */}
                  <div className="mt-4 pt-4 border-top">
                    <div className="d-flex flex-wrap gap-3 justify-content-center">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-shield-check text-success me-2"></i>
                        <small>256-bit SSL Secure</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-lock text-success me-2"></i>
                        <small>PCI-DSS Compliant</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-credit-card text-success me-2"></i>
                        <small>No Card Data Stored</small>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div className="card-body p-5 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="mb-4"
                  >
                    <div className="d-inline-flex p-4 rounded-circle bg-success bg-opacity-10">
                      <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
                    </div>
                  </motion.div>
                  
                  <h2 className="fw-bold mb-3 text-success">Thank You for Your Generous Donation!</h2>
                  
                  <p className="lead mb-4">
                    Your contribution of <span className="fw-bold text-primary">{formatCurrency(totalAmount)}</span> will make a significant difference in the lives of our children.
                  </p>
                  
                  <div className="row g-4 mb-4">
                    <div className="col-md-6">
                      <div className="p-4 rounded-3 border">
                        <h6 className="fw-bold mb-3">Donation Details</h6>
                        <div className="text-start">
                          <div className="mb-2">
                            <small className="text-muted">Transaction ID</small>
                            <div className="fw-bold">{transactionId}</div>
                          </div>
                          <div className="mb-2">
                            <small className="text-muted">Amount</small>
                            <div className="fw-bold">{formatCurrency(totalAmount)}</div>
                          </div>
                          <div className="mb-2">
                            <small className="text-muted">Date</small>
                            <div className="fw-bold">{new Date().toLocaleDateString()}</div>
                          </div>
                          <div className="mb-2">
                            <small className="text-muted">Payment Method</small>
                            <div className="fw-bold text-capitalize">{paymentMethod}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="p-4 rounded-3 border">
                        <h6 className="fw-bold mb-3">Next Steps</h6>
                        <ul className="text-start">
                          <li className="mb-2">
                            <i className="bi bi-envelope-check text-primary me-2"></i>
                            Receipt sent to {donorInfo.email}
                          </li>
                          <li className="mb-2">
                            <i className="bi bi-calendar-check text-primary me-2"></i>
                            Impact report in 2 weeks
                          </li>
                          <li>
                            <i className="bi bi-heart text-primary me-2"></i>
                            Thank you certificate by email
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="d-flex flex-wrap justify-content-center gap-3">
                    <button className="btn btn-outline-primary">
                      <i className="bi bi-download me-2"></i>
                      Download Receipt
                    </button>
                    <button className="btn btn-primary">
                      <i className="bi bi-share me-2"></i>
                      Share Your Contribution
                    </button>
                    <button className="btn btn-success" onClick={() => window.location.reload()}>
                      <i className="bi bi-heart-fill me-2"></i>
                      Make Another Donation
                    </button>
                  </div>
                  
                  <div className="mt-5 pt-4 border-top">
                    <p className="text-muted">
                      <i className="bi bi-info-circle me-2"></i>
                      For any questions about your donation, contact us at donations@alizaiborphanhome.org
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Trust Badges */}
            <div className="text-center mt-4">
              <div className="d-flex flex-wrap justify-content-center gap-4">
                <div className="text-white">
                  <i className="bi bi-shield-check fs-4 me-2"></i>
                  <span>Secure Payment</span>
                </div>
                <div className="text-white">
                  <i className="bi bi-lock fs-4 me-2"></i>
                  <span>Encrypted Data</span>
                </div>
                <div className="text-white">
                  <i className="bi bi-award fs-4 me-2"></i>
                  <span>Trusted Charity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Stripe Card Payment Component
function CardPaymentForm({ amount, donorInfo, isMonthly, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // In production, you would create a PaymentIntent on your server
      // const { clientSecret } = await createPaymentIntent({ amount, donorInfo });

      // Mock payment for demo
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save donation data to Realtime Database
      const donationData = {
        amount,
        donorInfo,
        isMonthly,
        paymentMethod: 'card',
        status: 'completed',
        transactionId: `DON-${Date.now().toString().slice(-8)}`,
        submittedAt: serverTimestamp()
      };

      const newRef = push(ref(db, 'donations'));
      await set(newRef, donationData);
      console.log('Donation saved with ID: ', newRef.key);

      // Simulate successful payment
      onSuccess();
    } catch (err) {
      console.error('Error processing donation: ', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label className="form-label fw-bold">Card Details</label>
        <div className="p-3 rounded border bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <label className="form-label fw-bold">Cardholder Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="As on card"
            defaultValue={donorInfo.name}
            required
          />
        </div>
        <div className="col-md-3">
          <label className="form-label fw-bold">Expiry</label>
          <input
            type="text"
            className="form-control"
            placeholder="MM/YY"
            maxLength="5"
            required
          />
        </div>
        <div className="col-md-3">
          <label className="form-label fw-bold">CVC</label>
          <input
            type="text"
            className="form-control"
            placeholder="123"
            maxLength="4"
            required
          />
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      <div className="d-grid">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn btn-primary btn-lg"
          type="submit"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Processing Payment...
            </>
          ) : (
            <>
              <i className="bi bi-lock-fill me-2"></i>
              Pay {new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR' }).format(amount)}
            </>
          )}
        </motion.button>
      </div>

      <div className="text-center mt-3">
        <small className="text-muted">
          <i className="bi bi-lock me-1"></i>
          Your payment is secure and encrypted
        </small>
      </div>
    </form>
  );
}

// CSS Styles
const DonationPageStyles = () => (
  <style>{`
    /* Custom styles for donation page */
    .StripeElement {
      padding: 10px 12px;
    }
    
    .StripeElement--focus {
      box-shadow: 0 1px 3px 0 #cfd7df;
    }
    
    .StripeElement--invalid {
      border-color: #fa755a;
    }
    
    .StripeElement--webkit-autofill {
      background-color: #fefde5 !important;
    }
    
    /* Smooth transitions */
    .card {
      transition: all 0.3s ease;
    }
    
    /* Progress step animation */
    @keyframes stepGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.7); }
      50% { box-shadow: 0 0 0 10px rgba(13, 110, 253, 0); }
    }
    
    .btn-primary.active {
      animation: stepGlow 2s infinite;
    }
    
    /* Payment method hover effect */
    .border-light:hover {
      border-color: #0d6efd !important;
      transform: translateY(-2px);
      transition: all 0.3s ease;
    }
    
    /* Success animation */
    @keyframes successPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    .text-success i {
      animation: successPulse 2s infinite;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .display-4 {
        font-size: 2rem;
      }
      
      .card-body {
        padding: 2rem !important;
      }
      
      .btn-lg {
        font-size: 1rem;
        padding: 0.75rem 1.5rem;
      }
    }
    
    @media (max-width: 576px) {
      .card-body {
        padding: 1.5rem !important;
      }
      
      .btn {
        width: 100%;
        margin-bottom: 0.5rem;
      }
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.5);
    }
    
    /* Input focus effects */
    .form-control:focus,
    .form-select:focus {
      border-color: #0d6efd;
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }
    
    /* Loading animation */
   @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    
    .loading-shimmer {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 1000px 100%;
      animation: shimmer 2s infinite linear;
    }
  `}</style>
);

export default function PremiumDonationPage() {
  return (
    <>
      <DonationPageStyles />
      <DonationPage />
    </>
  );
}