import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Services() {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [donationTier, setDonationTier] = useState("basic");
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Preset donation amounts
  const presetAmounts = [100, 250, 500, 1000, 2500, 5000];
  
  // Donation tiers with benefits
  const tiers = [
    { id: "basic", name: "Basic Supporter", min: 100, color: "#4CAF50" },
    { id: "silver", name: "Silver Sponsor", min: 500, color: "#9E9E9E" },
    { id: "gold", name: "Gold Partner", min: 1000, color: "#FFD700" },
    { id: "platinum", name: "Platinum Guardian", min: 2500, color: "#E5E4E2" }
  ];

  // Impact statistics
  const impacts = [
    { amount: 100, text: "Feeds 1 child for a week" },
    { amount: 500, text: "Provides education for 1 month" },
    { amount: 1000, text: "Supports healthcare for 2 children" },
    { amount: 2500, text: "Sponsors a child's annual needs" },
    { amount: 5000, text: "Transforms multiple lives" }
  ];

  // Animate counter
  useEffect(() => {
    if (selectedAmount > 0 && !isAnimating) {
      setIsAnimating(true);
      const duration = 1500;
      const steps = 60;
      const stepValue = selectedAmount / steps;
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        setAnimatedValue(Math.min(selectedAmount, Math.floor(stepValue * currentStep)));
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    }
  }, [selectedAmount, isAnimating]);

  // Determine tier based on amount
  useEffect(() => {
    const tier = tiers.find(t => selectedAmount >= t.min) || tiers[0];
    setDonationTier(tier.id);
  }, [selectedAmount]);

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

  const handleIncrement = () => {
    setSelectedAmount(prev => prev + 100);
    setCustomAmount("");
  };

  const handleDecrement = () => {
    if (selectedAmount > 100) {
      setSelectedAmount(prev => prev - 100);
      setCustomAmount("");
    }
  };

  const getCurrentTier = () => tiers.find(t => t.id === donationTier);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleOneTimeDonation = () => {
    navigate('/donate', { state: { step: 3 } });
  };

  const handlePaymentOption = (option) => {
    // Navigate to donation page with selected amount and payment step
    navigate('/donate', {
      state: {
        step: 3,
        selectedAmount: selectedAmount,
        isMonthly: false,
        paymentMethod: option === 'online' ? 'card' : 'jazzcash'
      }
    });
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  return (
    <section className="py-5" style={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh'
    }}>
      <div className="container py-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h1 className="display-4 fw-bold mb-3" style={{ 
            color: '#2c3e50',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            <span style={{ color: '#3498db' }}>DONATE</span> & MAKE A DIFFERENCE
          </h1>
          <p className="lead text-muted mb-4">
            Every contribution helps us provide better care, education, and support for orphaned children
          </p>
          
          {/* Donation Tier Badge */}
          <motion.div 
            className="d-inline-block px-4 py-2 rounded-pill mb-4"
            style={{ 
              backgroundColor: getCurrentTier()?.color + '20',
              border: `2px solid ${getCurrentTier()?.color}`,
              color: getCurrentTier()?.color
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <span className="fw-bold">{getCurrentTier()?.name}</span>
          </motion.div>
        </motion.div>

        <div className="row g-5">
          {/* Left Column - Donation Amount */}
          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card border-0 shadow-lg rounded-4"
              style={{ overflow: 'hidden' }}
            >
              <div className="card-body p-5">
                {/* Amount Selector */}
                <div className="mb-5">
                  <h3 className="fw-bold mb-4" style={{ color: '#2c3e50' }}>
                    Select Donation Amount
                  </h3>
                  
                  {/* Preset Amounts */}
                  <div className="row g-3 mb-4">
                    {presetAmounts.map((amount, index) => (
                      <div key={index} className="col-6 col-md-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`btn w-100 py-3 rounded-3 fw-bold ${selectedAmount === amount ? 'active' : ''}`}
                          style={{
                            backgroundColor: selectedAmount === amount ? '#3498db' : '#ffffff',
                            color: selectedAmount === amount ? '#ffffff' : '#3498db',
                            border: `2px solid ${selectedAmount === amount ? '#3498db' : '#e0e0e0'}`,
                            fontSize: '1.1rem',
                            transition: 'all 0.3s ease'
                          }}
                          onClick={() => handleAmountSelect(amount)}
                        >
                          {formatCurrency(amount)}
                        </motion.button>
                      </div>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-4">
                    <label className="form-label fw-bold" style={{ color: '#2c3e50' }}>
                      Or Enter Custom Amount
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <i className="bi bi-currency-rupee text-primary"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-lg border-start-0"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={handleCustomAmount}
                        style={{ fontSize: '1.2rem' }}
                      />
                      <span className="input-group-text bg-white">PKR</span>
                    </div>
                  </div>

                  {/* Increment/Decrement Controls */}
                  <div className="d-flex justify-content-center gap-3 mb-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="btn btn-outline-primary rounded-circle"
                      style={{ width: '50px', height: '50px' }}
                      onClick={handleDecrement}
                      disabled={selectedAmount <= 100}
                    >
                      <i className="bi bi-dash-lg"></i>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="btn btn-outline-primary rounded-circle"
                      style={{ width: '50px', height: '50px' }}
                      onClick={handleIncrement}
                    >
                      <i className="bi bi-plus-lg"></i>
                    </motion.button>
                  </div>

                  {/* Monthly/One-time Toggle */}
                  <div className="d-flex align-items-center justify-content-center gap-3 mb-4">
                    <span className="text-muted">One-time</span>
                    <div 
                      className="form-check form-switch"
                      style={{ fontSize: '1.5rem' }}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="monthlySwitch"
                        checked={isMonthly}
                        onChange={() => setIsMonthly(!isMonthly)}
                        style={{ width: '3em', height: '1.5em' }}
                      />
                    </div>
                    <span className="text-primary fw-bold">Monthly</span>
                  </div>
                </div>

                {/* Donation Summary */}
                <div className="p-4 rounded-3 mb-4" style={{ 
                  backgroundColor: '#f8f9fa',
                  border: '2px dashed #3498db'
                }}>
                  <h5 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>
                    Donation Summary
                  </h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Selected Amount:</span>
                    <span className="fw-bold">{formatCurrency(selectedAmount)}</span>
                  </div>
                  {isMonthly && (
                    <div className="d-flex justify-content-between mb-2">
                      <span>Frequency:</span>
                      <span className="fw-bold text-success">Monthly</span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tier:</span>
                    <span className="fw-bold" style={{ color: getCurrentTier()?.color }}>
                      {getCurrentTier()?.name}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold fs-5 mt-3 pt-3 border-top">
                    <span>Total:</span>
                    <span>{formatCurrency(selectedAmount)}</span>
                  </div>
                </div>

                {/* Donate Button */}
                {currentStep === 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-lg w-100 py-3 rounded-pill fw-bold"
                    style={{
                      background: 'linear-gradient(135deg, #3498db 0%, #2c3e50 100%)',
                      color: 'white',
                      border: 'none',
                      fontSize: '1.2rem',
                      boxShadow: '0 10px 20px rgba(52, 152, 219, 0.3)'
                    }}
                    onClick={isMonthly ? null : handleOneTimeDonation}
                  >
                    <i className="bi bi-heart-fill me-2"></i>
                    {isMonthly ? 'Start Monthly Donation' : 'Make One-time Donation'}
                    <i className="bi bi-arrow-right ms-2"></i>
                  </motion.button>
                )}

                {/* Step 2: Payment Options */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <h4 className="fw-bold mb-4" style={{ color: '#2c3e50' }}>
                      Choose Payment Method
                    </h4>
                    <div className="row g-3">
                      <div className="col-6">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-lg w-100 py-4 rounded-3 fw-bold"
                          style={{
                            background: 'linear-gradient(135deg, #3498db 0%, #2c3e50 100%)',
                            color: 'white',
                            border: 'none',
                            fontSize: '1.1rem',
                            boxShadow: '0 8px 16px rgba(52, 152, 219, 0.3)'
                          }}
                          onClick={() => handlePaymentOption('online')}
                        >
                          <i className="bi bi-credit-card-fill me-2"></i>
                          Online Payment
                        </motion.button>
                      </div>
                      <div className="col-6">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-lg w-100 py-4 rounded-3 fw-bold"
                          style={{
                            background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
                            color: 'white',
                            border: 'none',
                            fontSize: '1.1rem',
                            boxShadow: '0 8px 16px rgba(44, 62, 80, 0.3)'
                          }}
                          onClick={() => handlePaymentOption('bank')}
                        >
                          <i className="bi bi-bank me-2"></i>
                          Bank Transfer
                        </motion.button>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-outline-primary mt-4"
                      onClick={handleBackToStep1}
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Back
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Impact & Details */}
          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-100"
            >
              {/* Animated Counter */}
              <div className="card border-0 shadow-lg rounded-4 mb-4" style={{ 
                background: 'linear-gradient(135deg, #3498db 0%, #2c3e50 100%)',
                overflow: 'hidden'
              }}>
                <div className="card-body p-5 text-center">
                  <h3 className="text-white mb-3">Your Donation Impact</h3>
                  <motion.div 
                    className="display-1 fw-bold text-white mb-3"
                    key={animatedValue}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    {formatCurrency(animatedValue)}
                  </motion.div>
                  <p className="text-white-75 mb-0">
                    {isMonthly ? 'Monthly impact:' : 'One-time impact:'} {impacts.find(i => selectedAmount >= i.amount)?.text || 'Making a difference'}
                  </p>
                </div>
              </div>

              {/* Impact Breakdown */}
              <div className="card border-0 shadow-lg rounded-4 mb-4">
                <div className="card-body p-5">
                  <h4 className="fw-bold mb-4" style={{ color: '#2c3e50' }}>
                    What Your Donation Provides
                  </h4>
                  <div className="row g-3">
                    {[
                      { icon: 'bi-book', title: 'Education', desc: 'School fees & supplies' },
                      { icon: 'bi-egg-fried', title: 'Nutrition', desc: 'Healthy meals daily' },
                      { icon: 'bi-house-heart', title: 'Shelter', desc: 'Safe living space' },
                      { icon: 'bi-heart-pulse', title: 'Healthcare', desc: 'Medical checkups' },
                      { icon: 'bi-tags', title: 'Clothing', desc: 'Seasonal outfits' },
                      { icon: 'bi-emoji-smile', title: 'Happiness', desc: 'Recreational activities' }
                    ].map((item, index) => (
                      <div key={index} className="col-6 col-md-4">
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="text-center p-3 rounded-3 h-100"
                          style={{ 
                            backgroundColor: '#f8f9fa',
                            border: '1px solid #e0e0e0'
                          }}
                        >
                          <div className="mb-2" style={{ fontSize: '2rem', color: '#3498db' }}>
                            <i className={`bi ${item.icon}`}></i>
                          </div>
                          <h6 className="fw-bold mb-1">{item.title}</h6>
                          <small className="text-muted">{item.desc}</small>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress to Next Tier */}
              <AnimatePresence>
                {donationTier !== 'platinum' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="card border-0 shadow-lg rounded-4"
                  >
                    <div className="card-body p-4">
                      <h6 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>
                        Progress to Next Tier
                      </h6>
                      <div className="progress mb-2" style={{ height: '10px' }}>
                        <div 
                          className="progress-bar" 
                          role="progressbar" 
                          style={{ 
                            width: `${Math.min(100, (selectedAmount / tiers[tiers.findIndex(t => t.id === donationTier) + 1]?.min || 1) * 100)}%`,
                            backgroundColor: tiers[tiers.findIndex(t => t.id === donationTier) + 1]?.color || '#3498db'
                          }}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between small">
                        <span>{formatCurrency(selectedAmount)}</span>
                        <span>{formatCurrency(tiers[tiers.findIndex(t => t.id === donationTier) + 1]?.min || 0)}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Security & Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-5 pt-5"
        >
          <h5 className="fw-bold mb-4" style={{ color: '#2c3e50' }}>
            Secure & Trusted Donations
          </h5>
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {['SSL Secure', '100% Transparent', 'Tax Deductible', 'Regular Updates'].map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
                style={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0e0'
                }}
              >
                <i className="bi bi-shield-check text-success"></i>
                <span className="fw-medium">{badge}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// CSS Styles for Services
const ServicesStyles = () => (
  <style>{`
    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(135deg, #2980b9 0%, #1a252f 100%);
    }
    
    /* Glowing effect for selected amount */
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(52, 152, 219, 0.3); }
      50% { box-shadow: 0 0 30px rgba(52, 152, 219, 0.6); }
    }
    
    .btn.active {
      animation: glow 2s infinite;
    }
    
    /* Tier badges animation */
    @keyframes tierGlow {
      0%, 100% { 
        box-shadow: 0 0 15px currentColor;
      }
      50% { 
        box-shadow: 0 0 25px currentColor;
      }
    }
    
    /* Responsive styles */
    @media (max-width: 991.98px) {
      .display-4 {
        font-size: 2.5rem;
      }
      
      .card-body {
        padding: 2rem !important;
      }
    }
    
    @media (max-width: 767.98px) {
      .display-4 {
        font-size: 2rem;
      }
      
      .card-body {
        padding: 1.5rem !important;
      }
      
      .col-6 {
        margin-bottom: 1rem;
      }
      
      .btn-lg {
        font-size: 1rem !important;
        padding: 0.75rem 1.5rem !important;
      }
    }
    
    @media (max-width: 575.98px) {
      .display-4 {
        font-size: 1.75rem;
      }
      
      .display-1 {
        font-size: 3rem;
      }
      
      .row.g-3 > div {
        flex: 0 0 50%;
        max-width: 50%;
      }
    }
    
    /* Input focus effects */
    .form-control:focus {
      border-color: #3498db;
      box-shadow: 0 0 0 0.25rem rgba(52, 152, 219, 0.25);
    }
    
    /* Progress bar animation */
    .progress-bar {
      transition: width 1s ease-in-out;
    }
    
    /* Pulse animation for donation button */
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
    
    .btn:hover {
      animation: pulse 1s infinite;
    }
    
    /* Floating animation for impact cards */
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    .col-6.col-md-4:hover > div {
      animation: float 3s ease-in-out infinite;
    }
  `}</style>
);

export default function PremiumDonationServices() {
  return (
    <>
      <ServicesStyles />
      <Services />
    </>
  );
}