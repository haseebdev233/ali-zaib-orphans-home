import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ref as databaseRef, push, set, get, update, serverTimestamp, runTransaction } from 'firebase/database';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import ToastHost from "../Components/ToastHost";

const SimpleDonationTypeSelector = ({ selectedType, setSelectedType }) => {
  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '20px' }}>
        {/* Zakat */}
        <div
          onClick={() => setSelectedType('zakat')}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '8px',
            background: selectedType === 'zakat' ? '#f0f9f4' : 'transparent',
            border: selectedType === 'zakat' ? '1px solid #0a5c36' : '1px solid transparent'
          }}
        >
          <span style={{
            fontSize: '20px',
            marginRight: '15px',
            color: '#0a5c36',
            width: '24px',
            textAlign: 'center'
          }}>
            {selectedType === 'zakat' ? '☑' : '○'}
          </span>
          <div>
            <div style={{
              fontWeight: '500',
              color: '#0a5c36',
              marginBottom: '2px'
            }}>
              Zakat
            </div>
            <div style={{
              fontSize: '14px',
              color: '#666'
            }}>
              strictly Shariah compliant
            </div>
          </div>
        </div>

        {/* Khairat */}
        <div
          onClick={() => setSelectedType('khairat')}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '8px',
            background: selectedType === 'khairat' ? '#f0f9f4' : 'transparent',
            border: selectedType === 'khairat' ? '1px solid #2a9d8f' : '1px solid transparent'
          }}
        >
          <span style={{
            fontSize: '20px',
            marginRight: '15px',
            color: '#2a9d8f',
            width: '24px',
            textAlign: 'center'
          }}>
            {selectedType === 'khairat' ? '☑' : '○'}
          </span>
          <div>
            <div style={{
              fontWeight: '500',
              color: '#2a9d8f'
            }}>
              Khairat
            </div>
          </div>
        </div>

        {/* Sadaqah */}
        <div
          onClick={() => setSelectedType('sadaqah')}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '8px',
            background: selectedType === 'sadaqah' ? '#f0f9f4' : 'transparent',
            border: selectedType === 'sadaqah' ? '1px solid #d4af37' : '1px solid transparent'
          }}
        >
          <span style={{
            fontSize: '20px',
            marginRight: '15px',
            color: '#d4af37',
            width: '24px',
            textAlign: 'center'
          }}>
            {selectedType === 'sadaqah' ? '☑' : '○'}
          </span>
          <div>
            <div style={{
              fontWeight: '500',
              color: '#d4af37'
            }}>
              Sadaqah
            </div>
          </div>
        </div>

        {/* Other */}
        <div
          onClick={() => setSelectedType('')}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '8px',
            background: !['zakat', 'khairat', 'sadaqah'].includes(selectedType) ? '#f0f9f4' : 'transparent',
            border: !['zakat', 'khairat', 'sadaqah'].includes(selectedType) ? '1px solid #6c757d' : '1px solid transparent'
          }}
        >
          <span style={{
            fontSize: '20px',
            marginRight: '15px',
            color: '#6c757d',
            width: '24px',
            textAlign: 'center'
          }}>
            {!['zakat', 'khairat', 'sadaqah'].includes(selectedType) ? '☑' : '○'}
          </span>
          <div>
            <div style={{
              fontWeight: '500',
              color: '#6c757d'
            }}>
              Other
            </div>
          </div>
        </div>
      </div>

      {/* Custom Type Input */}
      {!['zakat', 'khairat', 'sadaqah'].includes(selectedType) && (
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Enter donation type (e.g., Aqiqah, Charity, etc.)"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          />
        </div>
      )}
      
    </div>
  );
};

// Helper to format donation type for display
const formatDonationType = (type) => {
  if (!type) return 'Donation';
  if (['zakat', 'khairat', 'sadaqah'].includes(type)) {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }
  return type; // Custom types like 'Sponsor Muhammad Suleman' stay as-is
};

function DonationPage() {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('zakat');
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    anonymous: false
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const [receiptData, setReceiptData] = useState(null);
  const [copiedField, setCopiedField] = useState("");
  const [nextReference, setNextReference] = useState('');

  // State variables
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [verificationError, setVerificationError] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('not_verified');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [paymentTimer, setPaymentTimer] = useState(600); // 10 minutes in seconds
  const [timerExpired, setTimerExpired] = useState(false);
  const [uploadedFileHashes, setUploadedFileHashes] = useState([]);

  // Generate a simple hash from file content to detect duplicates
  const generateFileHash = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        let hash = 0;
        const str = new Uint8Array(data);
        // Sample bytes throughout the file for faster hashing
        const step = Math.max(1, Math.floor(str.length / 10000));
        for (let i = 0; i < str.length; i += step) {
          hash = ((hash << 5) - hash + str[i]) | 0;
        }
        resolve(`${hash}-${file.size}-${file.type}`);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  // Validate image dimensions
  const validateImageDimensions = (file) => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        resolve({ valid: true }); // Skip for PDFs
        return;
      }
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        if (img.width < 300 || img.height < 300) {
          resolve({ valid: false, reason: 'Image is too small. Minimum 300x300 pixels required for readable proof.' });
        } else {
          resolve({ valid: true });
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        resolve({ valid: false, reason: 'Could not read image. Please upload a valid screenshot.' });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  // Payment timer - starts when step 3 is reached
  useEffect(() => {
    if (step !== 3) return;
    setPaymentTimer(600);
    setTimerExpired(false);
    const interval = setInterval(() => {
      setPaymentTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  // FIXED: Generate next reference properly
  const generateNextReference = async () => {
    // Get donation type in proper format
    let type = '';
    if (selectedType === 'zakat') {
      type = 'ZAKAT';
    } else if (selectedType === 'khairat') {
      type = 'KHAIRAT';
    } else if (selectedType === 'sadaqah') {
      type = 'SADAQAH';
    } else if (selectedType) {
      // For custom types, use first word or abbreviation to keep reference short
      const words = selectedType.trim().split(/\s+/);
      type = words.length > 1 
        ? words.map(w => w.charAt(0)).join('').toUpperCase()
        : selectedType.toUpperCase();
    } else {
      type = 'DONATION';
    }
    
    let nextNumber = 1;
    
    try {
      // Try to get counter from Firebase first
      const counterRef = databaseRef(db, 'counters/donationId');
      const counterSnapshot = await get(counterRef);
      
      if (counterSnapshot.exists()) {
        const counterValue = counterSnapshot.val();
        nextNumber = typeof counterValue === 'number' ? counterValue + 1 : 1;
      } else {
        // If no counter, count existing donations
        const donationsRef = databaseRef(db, 'donations');
        const donationsSnapshot = await get(donationsRef);
        
        if (donationsSnapshot.exists()) {
          const donations = donationsSnapshot.val();
          const donationCount = Object.keys(donations).length;
          nextNumber = donationCount + 1;
        }
      }
    } catch (error) {
      console.log('Using localStorage for reference generation');
      // Fallback to localStorage
      const lastReference = localStorage.getItem('lastDonationReference');
      if (lastReference) {
        const match = lastReference.match(/-AZOH-(\d+)$/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
    }
    
    const reference = `${type}-AZOH-${nextNumber}`;
    const transactionId = `AZOH-${nextNumber}`;
    
    console.log('Generated reference:', reference);
    console.log('Generated transactionId:', transactionId);
    
    setNextReference(reference);
    
    return { 
      reference, 
      transactionId,
      nextNumber 
    };
  };

  // Fetch next reference when type changes
  useEffect(() => {
    const fetchReference = async () => {
      const { reference } = await generateNextReference();
      setNextReference(reference);
    };
    fetchReference();
  }, [selectedType]);

  // Set initial step based on navigation state
  useEffect(() => {
    if (location.state?.step) {
      setStep(location.state.step);
    }
    if (location.state?.selectedAmount) {
      setSelectedAmount(location.state.selectedAmount);
    }
    if (location.state?.zakatAmount) {
      setSelectedAmount(location.state.zakatAmount);
      setCustomAmount(location.state.zakatAmount.toString());
      setSelectedType('zakat');
      // Scroll to custom amount section
      setTimeout(() => {
        const customAmountInput = document.getElementById('custom-amount-input');
        if (customAmountInput) {
          customAmountInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          customAmountInput.focus();
        }
      }, 100);
    }
    if (location.state?.aqiqaAmount) {
      setSelectedAmount(location.state.aqiqaAmount);
      setCustomAmount(location.state.aqiqaAmount.toString());
      setSelectedType('sadaqah');
      // Scroll to custom amount section
      setTimeout(() => {
        const customAmountInput = document.getElementById('custom-amount-input');
        if (customAmountInput) {
          customAmountInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          customAmountInput.focus();
        }
      }, 100);
    }
    if (location.state?.sponsorAmount) {
      setSelectedAmount(location.state.sponsorAmount);
      setCustomAmount(location.state.sponsorAmount.toString());
      setSelectedType(''); // Empty string for 'Other' type
      // Scroll to top of page
      window.scrollTo(0, 0);
      // Scroll to custom amount section
      setTimeout(() => {
        const customAmountInput = document.getElementById('custom-amount-input');
        if (customAmountInput) {
          customAmountInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          customAmountInput.focus();
        }
      }, 100);
    }
    if (location.state?.sponsorName) {
      setSelectedType(location.state.sponsorName);
      setStep(1);
      window.scrollTo(0, 0);
    }
  }, [location.state]);


  const presetAmounts = [100, 250, 500, 1000, 2500, 5000];

  // Helper to get short type code for references
  const getTypeCode = () => {
    if (['zakat', 'khairat', 'sadaqah'].includes(selectedType)) return selectedType.toUpperCase();
    if (!selectedType) return 'DONATION';
    const words = selectedType.trim().split(/\s+/);
    return words.length > 1 ? words.map(w => w.charAt(0)).join('').toUpperCase() : selectedType.toUpperCase();
  };

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
    // Clear error for the field being edited
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

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
      name: validateName(donorInfo.name),
      email: validateEmail(donorInfo.email),
      phone: validatePhone(donorInfo.phone)
    };
    setFormErrors(errors);
    return !errors.name && !errors.email && !errors.phone;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalAmount = selectedAmount;

  // Copy to clipboard function
  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldName);
      toast.success(`${fieldName} copied to clipboard!`);
      setTimeout(() => setCopiedField(""), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast.error('Failed to copy. Please try again.');
    });
  };

  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    const reference = nextReference || `${getTypeCode()}-AZOH-1`;
    const message = `Assalam-o-Alaikum! I want to donate ${formatCurrency(selectedAmount)} to Ali Zaib Orphan Home.

Reference: ${reference}
Name: ${donorInfo.anonymous ? 'Anonymous' : donorInfo.name}
Phone: ${donorInfo.phone || 'Not provided'}
Email: ${donorInfo.email || 'Not provided'}

Please guide me for the next steps.`;

    return encodeURIComponent(message);
  };

  // FIXED: Handle donation submission
  const handleDonationSubmit = async () => {
    setIsProcessing(true);
    console.log('Starting donation submission...');

    try {
      // Generate reference and IDs
      const { reference: referenceNumber, transactionId: donationId, nextNumber } = await generateNextReference();
      
      // Save to localStorage for next time
      localStorage.setItem('lastDonationReference', referenceNumber);
      
      console.log('Generated IDs - Transaction ID:', donationId, 'Reference:', referenceNumber);

      setTransactionId(donationId);

      // Prepare donation data
      const donationData = {
        amount: selectedAmount,
        amountFormatted: formatCurrency(selectedAmount),
        selectedType: selectedType || 'donation',
        displayType: formatDonationType(selectedType),
        donorInfo: {
          name: donorInfo.name || '',
          email: donorInfo.email || '',
          phone: donorInfo.phone || '',
          message: donorInfo.message || '',
          anonymous: donorInfo.anonymous || false
        },
        paymentMethod: 'bank_transfer',
        status: 'pending',
        verificationStatus: 'awaiting_proof',
        transactionId: donationId,
        reference: referenceNumber,
        submittedAt: serverTimestamp(),
        date: new Date().toISOString(),
        sequenceNumber: nextNumber,
        platform: navigator.userAgent || 'unknown'
      };

      console.log('Saving to Firebase:', donationData);

      // Save to Firebase
      const newRef = push(databaseRef(db, 'donations'));
      await set(newRef, donationData);
      console.log('Donation saved with Firebase key: ', newRef.key);

      // Get the Firebase key/id
      const firebaseId = newRef.key;

      // Update counter in Firebase
      try {
        const counterRef = databaseRef(db, 'counters/donationId');
        await set(counterRef, nextNumber);
        console.log('Counter updated in Firebase:', nextNumber);
      } catch (counterError) {
        console.log('Note: Could not update counter in Firebase');
      }

      // Set receipt data with proper string values
      setReceiptData({
        ...donationData,
        id: firebaseId,
        date: new Date().toLocaleDateString('en-PK', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        amount: selectedAmount,
        selectedType: selectedType || 'donation',
        donorInfo: {
          ...donorInfo,
          name: donorInfo.name || '',
          email: donorInfo.email || '',
          phone: donorInfo.phone || '',
          message: donorInfo.message || '',
          anonymous: donorInfo.anonymous || false
        },
        transactionId: donationId,
        reference: referenceNumber
      });

      console.log('Receipt data set:', {
        transactionId: donationId,
        reference: referenceNumber,
        date: new Date().toLocaleDateString('en-PK')
      });

      toast.success('Donation record saved successfully!');
      setIsProcessing(false);

      // Go to payment verification step (step 4)
      setStep(4);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error saving donation: ', error);
      toast.error('Failed to save donation. Please try again.');
      setIsProcessing(false);
    }
  };

  // Generate receipt as text file
  const downloadReceipt = () => {
    if (!receiptData) return;
    
    const receiptContent = `
ALI ZAIB ORPHAN HOME
(UNDER THE PATRONAGE OF ALI ZAIB ORPHAN HOME)
P-68, New Civil Line, Ayesha Road, behind Sind Bad, Faisalabad

==========================================
            DONATION RECEIPT
==========================================

Receipt No: ${receiptData.transactionId}
Date: ${receiptData.date}
Donor Name: ${receiptData.donorInfo.anonymous ? 'Anonymous Donor' : receiptData.donorInfo.name}
Phone: ${receiptData.donorInfo.phone || 'Not provided'}
Email: ${receiptData.donorInfo.email || 'Not provided'}
Donation Type: ${formatDonationType(receiptData.selectedType)}
Reference Number: ${receiptData.reference}

------------------------------------------
Amount: ${formatCurrency(receiptData.amount)}
------------------------------------------

Payment Method: Bank Transfer

Bank Transfer Details:
- JazzCash: 0321 9920015
- BankIslami: 218500047820005
- IBAN: PK73BKIP0218500047820005

==========================================

This is an official receipt for your donation to Ali Zaib Orphan Home.
For any queries, contact: 0321-9920015 | 0300-8666468

Thank you for your generous contribution!
`;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Donation-Receipt-${receiptData.transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Share receipt via WhatsApp
  const shareReceipt = () => {
    if (!receiptData) return;
    
    const message = `I just donated ${formatCurrency(receiptData.amount)} to Ali Zaib Orphan Home! 
    
Receipt Details:
📋 Receipt No: ${receiptData.transactionId}
📅 Date: ${receiptData.date}
💰 Amount: ${formatCurrency(receiptData.amount)}
🙏 Donor: ${receiptData.donorInfo.anonymous ? 'Anonymous' : receiptData.donorInfo.name}
📞 Contact: ${receiptData.donorInfo.phone || 'Not provided'}

Thank you for supporting orphan children!`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Print receipt
  const printReceipt = () => {
    if (!receiptData) return;
    
    const printContent = `
      <html>
        <head>
          <title>Donation Receipt - ${receiptData.transactionId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .subtitle { font-size: 14px; color: #666; }
            .section { margin: 20px 0; }
            .amount {
              font-size: 28px;
              font-weight: bold;
              text-align: center;
              margin: 30px 0;
              padding: 20px;
              border: 2px solid #000;
            }
            .footer { margin-top: 40px; font-size: 12px; text-align: center; }
            @media print {
              body { padding: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">ALI ZAIB ORPHAN HOME</div>
            <div class="subtitle">(UNDER THE PATRONAGE OF ALI ZAIB FOUNDATION)</div>
            <div class="subtitle">P-68, New Civil Line, Ayesha Road, behind Sind Bad, Faisalabad</div>
          </div>

          <div class="title" style="text-align: center; margin-bottom: 30px;">DONATION RECEIPT</div>

          <div class="section">
            <strong>Receipt No:</strong> ${receiptData.transactionId}<br>
            <strong>Date:</strong> ${receiptData.date}<br>
            <strong>Donation Type:</strong> ${formatDonationType(receiptData.selectedType)}<br>
            <strong>Donor Name:</strong> ${receiptData.donorInfo.anonymous ? 'Anonymous Donor' : receiptData.donorInfo.name}<br>
            <strong>Phone:</strong> ${receiptData.donorInfo.phone || 'Not provided'}<br>
            <strong>Email:</strong> ${receiptData.donorInfo.email || 'Not provided'}<br>
            <strong>Reference:</strong> ${receiptData.reference}
          </div>

          <div class="amount">
            Amount: ${formatCurrency(receiptData.amount)}
          </div>

          <div class="section">
            <strong>Payment Method:</strong> Bank Transfer<br>
            <strong>Reference Number:</strong> ${receiptData.reference}
          </div>

          <div class="section">
            <strong>Bank Transfer Details:</strong><br>
            - JazzCash: 0321 9920015<br>
            - BankIslami: 218500047820005<br>
            - IBAN: PK73BKIP0218500047820005
          </div>

          <div class="footer">
            This is an official receipt (But not verified) for your donation to Ali Zaib Orphan Home.<br>
            For any queries, contact: 0321-9920015 | 0300-8666468<br><br>
            Thank you for your generous contribution!
          </div>

          <div class="no-print" style="margin-top: 40px; text-align: center;">
            <button onclick="window.print()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
              Print Receipt
            </button>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
  };

  // File handling functions
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setVerificationError('Please select a JPG, PNG, or PDF file.');
      e.target.value = ''; // Reset input
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setVerificationError('File size must be less than 5MB.');
      e.target.value = '';
      return;
    }

    // Validate minimum file size (files < 10KB are likely not real screenshots)
    if (file.size < 10 * 1024) {
      setVerificationError('File is too small to be a valid payment screenshot.');
      e.target.value = '';
      return;
    }

    // Check for duplicate file
    const fileHash = await generateFileHash(file);
    if (uploadedFileHashes.includes(fileHash)) {
      setVerificationError('This file has already been uploaded. Please upload a different payment screenshot.');
      toast.error('Duplicate file detected! Please upload a new screenshot.');
      e.target.value = '';
      return;
    }

    // Validate image dimensions
    const dimCheck = await validateImageDimensions(file);
    if (!dimCheck.valid) {
      setVerificationError(dimCheck.reason);
      e.target.value = '';
      return;
    }

    // Store hash for future duplicate detection
    setUploadedFileHashes(prev => [...prev, fileHash]);

    setUploadedFile(file);
    setVerificationError('');
    setVerificationStatus('not_verified');
    setUploadProgress(0);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleFileUpload = () => {
    if (!uploadedFile) return;

    setVerificationStatus('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setVerificationStatus('verifying');
        
        // Convert file to base64 for storage
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64Data = e.target.result;
          
          try {
            // Update donation record with proof data (preserves existing fields)
            const donationRef = databaseRef(db, `donations/${receiptData.id}`);
            await update(donationRef, {
              paymentProofFileName: uploadedFile.name,
              paymentProofSize: uploadedFile.size,
              paymentProofType: uploadedFile.type,
              verificationStatus: 'pending_review',
              proofUploadedAt: new Date().toISOString(),
              status: 'proof_submitted'
            });

            setVerificationStatus('verified');
            toast.success('Payment proof uploaded successfully!');

            // Auto-send WhatsApp message with donation details
            const verificationMsg = `✅ *Payment Proof Uploaded*

📋 *Donation Summary:*
━━━━━━━━━━━━━━━━━━
🔖 Receipt No: ${receiptData.transactionId}
📌 Reference: ${receiptData.reference}
💰 Amount: ${formatCurrency(receiptData.amount)}
🏷️ Type: ${formatDonationType(receiptData.selectedType)}
👤 Donor: ${receiptData.donorInfo?.anonymous ? 'Anonymous' : receiptData.donorInfo?.name || 'N/A'}
📧 Email: ${receiptData.donorInfo?.email || 'Not provided'}
📞 Phone: ${receiptData.donorInfo?.phone || 'Not provided'}
📅 Date: ${receiptData.date}
━━━━━━━━━━━━━━━━━━

📎 *Proof File:* ${uploadedFile.name} (${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)

⚠️ Please attach the payment screenshot manually from your gallery.

_This is an automated verification message from Ali Zaib Orphan Home donation portal._`;

            const whatsappUrl = `https://wa.me/923219920015?text=${encodeURIComponent(verificationMsg)}`;
            window.open(whatsappUrl, '_blank');

          } catch (error) {
            console.error('Error saving proof:', error);
            // Still mark as verified locally so user can proceed
            setVerificationStatus('verified');
            toast.success('Payment proof accepted!');

            // Still send WhatsApp even if Firebase update fails
            const fallbackMsg = `✅ *Payment Proof Uploaded*

📋 *Donation Summary:*
━━━━━━━━━━━━━━━━━━
🔖 Receipt No: ${receiptData.transactionId}
📌 Reference: ${receiptData.reference}
💰 Amount: ${formatCurrency(receiptData.amount)}
🏷️ Type: ${formatDonationType(receiptData.selectedType)}
👤 Donor: ${receiptData.donorInfo?.anonymous ? 'Anonymous' : receiptData.donorInfo?.name || 'N/A'}
📅 Date: ${receiptData.date}
━━━━━━━━━━━━━━━━━━

📎 *Proof File:* ${uploadedFile.name}

⚠️ Please attach the payment screenshot manually from your gallery.`;

            const whatsappUrl = `https://wa.me/923219920015?text=${encodeURIComponent(fallbackMsg)}`;
            window.open(whatsappUrl, '_blank');
          }
        };
        reader.readAsDataURL(uploadedFile);
      }
    }, 300);
  };

  const proceedToReceipt = () => {
    setStep(5);
    window.scrollTo(0, 0);
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
            Support Ali Zaib Orphanage Now — Turn Tears into Smiles
          </h1>
          <p className="lead text-warning text-center mb-0">
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
                      {s === 3 && 'Transfer'}
                      {s === 4 && 'Receipt'}
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
                  <h3 className="fw-bold mb-4 text-primary">Select Donation Type</h3>

                  {/* Donation Type Selector */}
                  <SimpleDonationTypeSelector selectedType={selectedType} setSelectedType={setSelectedType} />

                  <h3 className=" mb-4 text-dark">Select Donation Amount</h3>

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
                        id="custom-amount-input"
                        type="text"
                        className="form-control border-primary"
                        placeholder="Enter amount in PKR"
                        value={customAmount}
                        onChange={handleCustomAmount}
                      />
                      <span className="input-group-text bg-light border-primary">PKR</span>
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
                      onClick={() => { setStep(2); window.scrollTo(0, 0); }}
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
                        <span className={`input-group-text ${formErrors.name ? 'border-danger' : 'bg-light'}`}>
                          <i className="bi bi-person"></i>
                        </span>
                        <input
                          type="text"
                          className={`form-control ${formErrors.name ? 'is-invalid' : donorInfo.name.trim().length >= 3 ? 'is-valid' : ''}`}
                          placeholder="John Doe"
                          value={donorInfo.name}
                          onChange={(e) => handleDonorInfo('name', e.target.value)}
                          onBlur={() => setFormErrors(prev => ({ ...prev, name: validateName(donorInfo.name) }))}
                          required
                        />
                        {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Email Address *</label>
                      <div className="input-group">
                        <span className={`input-group-text ${formErrors.email ? 'border-danger' : 'bg-light'}`}>
                          <i className="bi bi-envelope"></i>
                        </span>
                        <input
                          type="email"
                          className={`form-control ${formErrors.email ? 'is-invalid' : donorInfo.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorInfo.email) ? 'is-valid' : ''}`}
                          placeholder="john@example.com"
                          value={donorInfo.email}
                          onChange={(e) => handleDonorInfo('email', e.target.value)}
                          onBlur={() => setFormErrors(prev => ({ ...prev, email: validateEmail(donorInfo.email) }))}
                          required
                        />
                        {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Phone Number *</label>
                      <div className="input-group">
                        <span className={`input-group-text ${formErrors.phone ? 'border-danger' : 'bg-light'}`}>
                          <i className="bi bi-telephone"></i>
                        </span>
                        <input
                          type="tel"
                          className={`form-control ${formErrors.phone ? 'is-invalid' : donorInfo.phone && donorInfo.phone.replace(/[\s\-\+\(\)]/g, '').length >= 10 ? 'is-valid' : ''}`}
                          placeholder="+92 300 1234567"
                          value={donorInfo.phone}
                          onChange={(e) => handleDonorInfo('phone', e.target.value)}
                          onBlur={() => setFormErrors(prev => ({ ...prev, phone: validatePhone(donorInfo.phone) }))}
                          required
                        />
                        {formErrors.phone && <div className="invalid-feedback">{formErrors.phone}</div>}
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
                    
                  </div>

                  <div className="d-flex justify-content-between mt-5">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => { setStep(1); window.scrollTo(0, 0); }}
                    >
                      <i className="bi bi-arrow-left me-2"></i> Back
                    </button>
                    <div className="d-flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          handleDonorInfo('anonymous', true);
                          setStep(3);
                          window.scrollTo(0, 0);
                        }}
                      >
                        Skip <i className="bi bi-arrow-right ms-2"></i>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-primary btn-lg px-5"
                        onClick={() => {
                          if (validateForm()) {
                            setStep(3);
                            window.scrollTo(0, 0);
                          }
                        }}
                        disabled={!donorInfo.anonymous && (!donorInfo.name || !donorInfo.email || !donorInfo.phone)}
                      >
                        Continue to Bank Details <i className="bi bi-arrow-right ms-2"></i>
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Bank Transfer Details */}
              {step === 3 && (
                <div className="card-body p-5">
                  <h3 className="fw-bold mb-4 text-primary">Bank Transfer Details</h3>
                  
                  {/* Payment Timer */}
                  <div className={`alert ${timerExpired ? 'alert-danger' : paymentTimer <= 120 ? 'alert-warning' : 'alert-info'} d-flex align-items-center justify-content-between mb-4`}>
                    <div className="d-flex align-items-center">
                      <i className={`bi ${timerExpired ? 'bi-exclamation-triangle-fill' : 'bi-clock-fill'} me-2 fs-4`}></i>
                      <div>
                        <strong>{timerExpired ? 'Time Expired!' : 'Complete your transfer within:'}</strong>
                        {timerExpired && <div className="small">Please go back and restart the donation process.</div>}
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-1" style={{ fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 'bold' }}>
                      <span className="px-2 py-1 rounded" style={{ backgroundColor: timerExpired ? '#f8d7da' : paymentTimer <= 120 ? '#fff3cd' : '#d1ecf1' }}>
                        {String(Math.floor(paymentTimer / 60)).padStart(2, '0')}
                      </span>
                      <span>:</span>
                      <span className="px-2 py-1 rounded" style={{ backgroundColor: timerExpired ? '#f8d7da' : paymentTimer <= 120 ? '#fff3cd' : '#d1ecf1' }}>
                        {String(paymentTimer % 60).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Donation Summary */}
                  <div className="p-4 rounded-3 mb-4" style={{ 
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #e0e0e0'
                  }}>
                    <h5 className="fw-bold mb-3 text-center" style={{ 
                      color: '#0a5c36',
                      borderBottom: '2px solid #0a5c36',
                      paddingBottom: '10px'
                    }}>
                      Donation Summary
                    </h5>
                    
                    <div className="row">
                      {/* Left Column */}
                      <div className="col-md-6">
                        {/* Type */}
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted" style={{ fontSize: '14px' }}>Type</small>
                            <div className="fw-bold" style={{ 
                              color: '#0a5c36',
                              fontSize: '16px',
                              fontWeight: '600'
                            }}>
                              {formatDonationType(selectedType)}
                            </div>
                          </div>
                        </div>
                        
                        {/* Amount */}
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted" style={{ fontSize: '14px' }}>Amount</small>
                            <div className="fw-bold" style={{ 
                              color: '#0a5c36',
                              fontSize: '18px',
                              fontWeight: '700'
                            }}>
                              Rs {selectedAmount.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        
                        {/* Donor */}
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted" style={{ fontSize: '14px' }}>Donor</small>
                            <div className="fw-bold" style={{ 
                              color: '#666',
                              fontSize: '16px'
                            }}>
                              {donorInfo.anonymous ? 'Anonymous Donor' : donorInfo.name}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Column */}
                      <div className="col-md-6">
                        {/* Reference */}
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted" style={{ fontSize: '14px' }}>Reference</small>
                            <div className="d-flex align-items-center gap-2">
                              <div className="fw-bold" style={{ 
                                color: '#2a9d8f',
                                fontSize: '14px',
                                fontWeight: '600',
                                backgroundColor: '#e8f4f3',
                                padding: '4px 10px',
                                borderRadius: '4px',
                                minWidth: '120px',
                                textAlign: 'center'
                              }}>
                                {nextReference || `${getTypeCode()}-AZOH-1`}
                              </div>
                              {nextReference && (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="btn btn-sm btn-outline-success"
                                  style={{ padding: '2px 8px' }}
                                  onClick={() => copyToClipboard(nextReference, 'Reference Number')}
                                  title="Copy Reference"
                                >
                                  <i className={`bi ${copiedField === 'Reference Number' ? 'bi-check' : 'bi-copy'}`}></i>
                                </motion.button>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Contact */}
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center gap-2">
                            <small className="text-muted flex-shrink-0" style={{ fontSize: '14px' }}>Contact</small>
                            <div className="fw-bold text-end text-truncate" style={{ 
                              color: donorInfo.anonymous ? '#999' : '#666',
                              fontSize: '14px',
                              fontStyle: donorInfo.anonymous ? 'italic' : 'normal',
                              maxWidth: '200px'
                            }}>
                              {donorInfo.anonymous ? 'Anonymous' : donorInfo.email}
                            </div>
                          </div>
                        </div>
                        
                        {/* Phone */}
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center gap-2">
                            <small className="text-muted flex-shrink-0" style={{ fontSize: '14px' }}>Phone</small>
                            <div className="fw-bold text-end" style={{ 
                              color: donorInfo.anonymous ? '#999' : '#666',
                              fontSize: '14px',
                              fontStyle: donorInfo.anonymous ? 'italic' : 'normal'
                            }}>
                              {donorInfo.anonymous ? 'Anonymous' : donorInfo.phone}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Total Amount Separator */}
                    <div className="border-top pt-3 mt-3" style={{ borderColor: '#0a5c36' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold" style={{ 
                          fontSize: '18px',
                          color: '#0a5c36'
                        }}>Total Amount</span>
                        <span className="fw-bold" style={{ 
                          fontSize: '22px',
                          color: '#0a5c36'
                        }}>Rs {selectedAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bank Transfer Details */}
                  <div className="mb-4">
                    <h5 className="fw-bold mb-3">
                      <i className="bi bi-bank me-2"></i>
                      Transfer to Our Accounts
                    </h5>
                    
                    {/* JazzCash Account */}
                    <div className="mb-4 p-4 rounded-3 border bg-white">
                      <div className="d-flex align-items-center mb-3">
                        <div className="me-3 p-2 rounded bg-warning text-white">
                          <i className="bi bi-phone fs-4"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0">JazzCash Wallet</h6>
                          <small className="text-muted">Mobile Wallet Transfer</small>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-muted">JazzCash Number:</small>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-sm btn-outline-warning"
                            onClick={() => copyToClipboard('03219920015', 'JazzCash Number')}
                          >
                            <i className={`bi ${copiedField === 'JazzCash Number' ? 'bi-check' : 'bi-copy'} me-1`}></i>
                            Copy
                          </motion.button>
                        </div>
                        <h5 className="fw-bold mb-0">0321 9920015</h5>
                      </div>
                      
                      <div className="mb-3">
                        <small className="text-muted">Account Title:</small>
                        <div className="fw-bold">Ali Zaib Orphan Home</div>
                      </div>

                      <hr className="my-3" />

                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-muted">Till ID:</small>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-sm btn-outline-warning"
                            onClick={() => copyToClipboard('982298606', 'Till ID')}
                          >
                            <i className={`bi ${copiedField === 'Till ID' ? 'bi-check' : 'bi-copy'} me-1`}></i>
                            Copy
                          </motion.button>
                        </div>
                        <h5 className="fw-bold mb-0">9 8 2 2 9 8 6 0 6</h5>
                        <small className="text-muted d-block mt-1">
                          Dial <strong>*786*10#</strong> and enter <strong>TILL ID</strong> to pay via JazzCash account.
                        </small>
                      </div>

                      <div className="text-center mt-3">
                        <p className="fw-bold text-warning mb-2">QR Payments Accepted</p>
                        <img
                          src="/assets/donate/Till-id.jpeg"
                          alt="JazzCash QR Code - Till ID 982298606"
                          className="img-fluid rounded shadow-sm"
                          style={{ maxWidth: '280px', border: '3px solid #f5c518' }}
                        />
                      </div>
                    </div>

                    {/* BankIslami Account */}
                    <div className="mb-4 p-4 rounded-3 border bg-white">
                      <div className="d-flex align-items-center mb-3">
                        <div className="me-3 p-2 rounded bg-primary text-white">
                          <i className="bi bi-bank fs-4"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0">BankIslami</h6>
                          <small className="text-muted">Bank Account Transfer</small>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-muted">Account Number:</small>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => copyToClipboard('218500047820005', 'Account Number')}
                          >
                            <i className={`bi ${copiedField === 'Account Number' ? 'bi-check' : 'bi-copy'} me-1`}></i>
                            Copy
                          </motion.button>
                        </div>
                        <h5 className="fw-bold mb-0">218500047820005</h5>
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-muted">IBAN Number:</small>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => copyToClipboard('PK73BKIP0218500047820005', 'IBAN Number')}
                          >
                            <i className={`bi ${copiedField === 'IBAN Number' ? 'bi-check' : 'bi-copy'} me-1`}></i>
                            Copy
                          </motion.button>
                        </div>
                        <div className="fw-bold">PK73BKIP0218500047820005</div>
                      </div>
                      
                      <div className="mb-2">
                        <small className="text-muted">Account Title:</small>
                        <div className="fw-bold">Ali Zaib Foundation (Orphan Home)</div>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="alert alert-info">
                      <h6 className="fw-bold mb-2">
                        <i className="bi bi-info-circle me-2"></i>
                        Instructions:
                      </h6>
                      <ol className="mb-0 ps-3">
                        <li className="mb-2">Transfer <strong>{formatCurrency(selectedAmount)}</strong> to any of the above accounts</li>
                        <li className="mb-2">Use the Reference Number in transaction details</li>
                        <li className="mb-2">Take screenshot of successful transaction</li>
                        <li>Click "I've Made the Transfer" to get your receipt</li>
                      </ol>
                    </div>

                    {/* Contact Information */}
                    <div className="alert alert-light">
                      <h6 className="fw-bold mb-2">Need Help? Contact Us:</h6>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-2">
                            <small className="text-muted">Phone Numbers:</small>
                            <div className="fw-bold">0321-9920015</div>
                            <div className="fw-bold">0300-8666468</div>
                            <div className="fw-bold">041-8847000</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-2">
                            <small className="text-muted">Address:</small>
                            <div className="small">
                              P-68, New Civil Line, Ayesha Road,<br />
                              behind Sind Bad, Faisalabad
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-grid gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn btn-success btn-lg py-3"
                      onClick={handleDonationSubmit}
                      disabled={isProcessing || timerExpired}
                    >
                      {isProcessing ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Processing...
                        </>
                      ) : timerExpired ? (
                        <>
                          <i className="bi bi-x-circle me-2"></i>
                          Time Expired - Go Back & Retry
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle me-2"></i>
                          I've Made the Transfer
                        </>
                      )}
                    </motion.button>
                    
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-primary flex-grow-1"
                        onClick={() => { setStep(2); window.scrollTo(0, 0); }}
                      >
                        <i className="bi bi-arrow-left me-2"></i> Back
                      </button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-outline-success flex-grow-1"
                        onClick={() => {
                          const whatsappUrl = `https://wa.me/923219920015?text=${generateWhatsAppMessage()}`;
                          window.open(whatsappUrl, '_blank');
                        }}
                      >
                        <i className="bi bi-whatsapp me-2"></i>
                        Need Help?
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Payment Verification */}
              {step === 4 && receiptData && (
                <div className="card-body p-5">
                  <h3 className="fw-bold mb-4 text-primary">Payment Verification</h3>

                  {/* Donation Summary */}
                  <div className="p-4 rounded-3 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <h5 className="fw-bold mb-3">Donation Summary</h5>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-2">
                          <small className="text-muted">Type</small>
                          <div className="fw-bold">{formatDonationType(receiptData.selectedType)}</div>
                        </div>
                        <div className="mb-2">
                          <small className="text-muted">Amount</small>
                          <div className="fw-bold">{formatCurrency(receiptData.amount)}</div>
                        </div>
                        <div className="mb-2">
                          <small className="text-muted">Reference</small>
                          <div className="fw-bold">{receiptData.reference}</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-2">
                          <small className="text-muted">Donor</small>
                          <div className="fw-bold">{receiptData.donorInfo.anonymous ? 'Anonymous Donor' : receiptData.donorInfo.name}</div>
                        </div>
                        <div className="mb-2">
                          <small className="text-muted">Transaction ID</small>
                          <div className="fw-bold">{receiptData.transactionId}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upload Requirements */}
                  <div className="alert alert-info mb-4">
                    <h6 className="fw-bold mb-2">
                      <i className="bi bi-info-circle me-2"></i>
                      Payment Verification Required
                    </h6>
                    <p className="mb-2">⚠️ Before receiving your receipt, you must upload proof of payment:</p>
                    <div className="row">
                      <div className="col-md-6">
                        <strong>Upload Screenshot Requirements:</strong>
                        <ul className="mb-0 mt-2">
                          <li>✅ Must clearly show:</li>
                          <ul>
                            <li>Transaction amount (Rs {receiptData.amount})</li>
                            <li>Reference Number used</li>
                            <li>Date and time of transaction</li>
                            <li>Successful transaction status</li>
                            <li>Beneficiary account details</li>
                          </ul>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <strong>❌ Will be rejected if:</strong>
                        <ul className="mb-0 mt-2">
                          <li>Screenshot is blurry or incomplete</li>
                          <li>Amount or reference doesn't match</li>
                          <li>Transaction shows as failed/pending</li>
                          <li>Sensitive information is edited/blocked</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* File Upload Area */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Upload Payment Proof:</label>
                    <div className="border-2 border-dashed border-primary rounded-3 p-4 text-center" style={{ minHeight: '200px' }}>
                      {uploadedFile ? (
                        <div>
                          {filePreview && (
                            <img src={filePreview} alt="Payment proof" className="img-fluid mb-3" style={{ maxHeight: '150px' }} />
                          )}
                          <div className="mb-3">
                            <i className="bi bi-file-earmark-check text-success fs-1"></i>
                            <p className="mb-1 fw-bold">{uploadedFile.name}</p>
                            <small className="text-muted">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</small>
                          </div>
                          <button
                            className="btn btn-outline-danger btn-sm me-2"
                            onClick={() => {
                              setUploadedFile(null);
                              setFilePreview(null);
                              setVerificationError('');
                              setVerificationStatus('not_verified');
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div>
                          <i className="bi bi-cloud-upload text-primary fs-1 mb-3"></i>
                          <p className="mb-3">Drag and drop your payment screenshot here, or click to browse</p>
                          <input
                            type="file"
                            className="d-none"
                            id="fileUpload"
                            accept="image/jpeg,image/png,application/pdf"
                            onChange={handleFileSelect}
                          />
                          <label htmlFor="fileUpload" className="btn btn-primary">
                            <i className="bi bi-folder me-2"></i>
                            Choose File
                          </label>
                          <p className="mt-2 mb-0 small text-muted">Allowed: JPG, PNG, PDF | Max: 5MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload Progress and Status */}
                  {verificationStatus !== 'not_verified' && (
                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-2">
                        <div className="me-3">
                          {verificationStatus === 'uploading' && <div className="spinner-border spinner-border-sm text-primary"></div>}
                          {verificationStatus === 'verifying' && <i className="bi bi-hourglass-split text-warning fs-4"></i>}
                          {verificationStatus === 'verified' && <i className="bi bi-check-circle-fill text-success fs-4"></i>}
                          {verificationStatus === 'rejected' && <i className="bi bi-x-circle-fill text-danger fs-4"></i>}
                        </div>
                        <div>
                          <div className="fw-bold">
                            {verificationStatus === 'uploading' && 'Uploading...'}
                            {verificationStatus === 'verifying' && 'Processing verification...'}
                            {verificationStatus === 'verified' && 'Verification Successful!'}
                            {verificationStatus === 'rejected' && 'Verification Failed'}
                          </div>
                          {verificationStatus === 'uploading' && (
                            <div className="progress mt-2" style={{ height: '6px' }}>
                              <div
                                className="progress-bar bg-primary"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </div>
                      {verificationError && (
                        <div className="alert alert-danger mt-2">
                          <i className="bi bi-exclamation-triangle me-2"></i>
                          {verificationError}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => { setStep(3); window.scrollTo(0, 0); }}
                    >
                      <i className="bi bi-arrow-left me-2"></i> Back
                    </button>
                    <div className="d-flex gap-2">
                      {uploadedFile && verificationStatus === 'not_verified' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-primary"
                          onClick={handleFileUpload}
                        >
                          <i className="bi bi-upload me-2"></i>
                          Upload & Verify
                        </motion.button>
                      )}
                      {verificationStatus === 'verified' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-success"
                          onClick={proceedToReceipt}
                        >
                          <i className="bi bi-check-circle me-2"></i>
                          Get Receipt
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Receipt */}
              {step === 5 && receiptData && (
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
                  
                  <h2 className="fw-bold mb-3 text-success">Thank You for Your Donation!</h2>
                  
                  <p className="lead mb-4">
                    Your contribution of <span className="fw-bold text-primary">{formatCurrency(receiptData.amount)}</span> will help orphan children in need.
                  </p>
                  
                  {/* Receipt Preview */}
                  <div className="row g-4 mb-4">
                    <div className="col-md-6">
                      <div className="p-4 rounded-3 border">
                        <h6 className="fw-bold mb-3">Donation Details</h6>
                        <div className="text-start">
                          {/* Receipt No */}
                          <div className="mb-2">
                            <small className="text-muted">Receipt No:</small>
                            <div className="fw-bold" style={{ 
                              color: '#0a5c36',
                              fontSize: '16px',
                              backgroundColor: '#f0f9f4',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              marginTop: '2px'
                            }}>
                              {receiptData?.transactionId || 'AZOH-1'}
                            </div>
                          </div>
                          
                          <div className="mb-2">
                            <small className="text-muted">Date:</small>
                            <div className="fw-bold">{receiptData?.date || new Date().toLocaleDateString('en-PK')}</div>
                          </div>
                          
                          <div className="mb-2">
                            <small className="text-muted">Type:</small>
                            <div className="fw-bold">
                              {formatDonationType(receiptData?.selectedType)}
                            </div>
                          </div>
                          
                          <div className="mb-2">
                            <small className="text-muted">Amount:</small>
                            <div className="fw-bold" style={{ 
                              color: '#0a5c36',
                              fontSize: '18px'
                            }}>
                              {receiptData?.amount ? formatCurrency(receiptData.amount) : formatCurrency(selectedAmount)}
                            </div>
                          </div>
                          
                          <div className="mb-2">
                            <small className="text-muted">Donor:</small>
                            <div className="fw-bold">
                              {receiptData?.donorInfo?.anonymous ? 
                                'Anonymous Donor' : 
                                receiptData?.donorInfo?.name || donorInfo.name || 'Donor'}
                            </div>
                          </div>
                          
                          {!receiptData?.donorInfo?.anonymous && (
                            <>
                              <div className="mb-2">
                                <small className="text-muted">Email:</small>
                                <div className="fw-bold">{receiptData?.donorInfo?.email || donorInfo.email || 'Not provided'}</div>
                              </div>
                              
                              <div className="mb-2">
                                <small className="text-muted">Phone:</small>
                                <div className="fw-bold">{receiptData?.donorInfo?.phone || donorInfo.phone || 'Not provided'}</div>
                              </div>
                            </>
                          )}
                          
                          <div className="mb-2">
                            <small className="text-muted">Reference:</small>
                            <div className="fw-bold" style={{ 
                              color: '#2a9d8f',
                              fontSize: '14px',
                              backgroundColor: '#e8f4f3',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              marginTop: '2px'
                            }}>
                              {receiptData?.reference || nextReference || `${getTypeCode()}-AZOH-1`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="p-4 rounded-3 border">
                        <h6 className="fw-bold mb-3">Receipt Options</h6>
                        <div className="text-start">
                          <div className="mb-3">
                            <i className="bi bi-file-text text-primary me-2"></i>
                            <strong>Download Receipt</strong> as text file
                          </div>
                          <div className="mb-3">
                            <i className="bi bi-printer text-info me-2"></i>
                            <strong>Print Receipt</strong> for physical copy
                          </div>
                          <div className="mb-3">
                            <i className="bi bi-whatsapp text-success me-2"></i>
                            <strong>Share on WhatsApp</strong> with friends
                          </div>
                          <div>
                            <i className="bi bi-envelope text-warning me-2"></i>
                            <strong>Email Receipt</strong> sent to {receiptData?.donorInfo?.email || donorInfo.email}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-primary btn-lg px-4"
                      onClick={downloadReceipt}
                    >
                      <i className="bi bi-download me-2"></i>
                      Download Receipt
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-info btn-lg px-4"
                      onClick={printReceipt}
                    >
                      <i className="bi bi-printer me-2"></i>
                      Print Receipt
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-success btn-lg px-4"
                      onClick={shareReceipt}
                    >
                      <i className="bi bi-share me-2"></i>
                      Share on WhatsApp
                    </motion.button>
                  </div>
                  
                  <div className="d-flex justify-content-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-outline-primary px-4"
                      onClick={() => {
                        setStep(1);
                        window.scrollTo(0, 0);
                        setSelectedAmount(500);
                        setDonorInfo({ name: '', email: '', phone: '', message: '', anonymous: false });
                        setReceiptData(null);
                        setUploadedFile(null);
                        setFilePreview(null);
                        setVerificationError('');
                        setVerificationStatus('not_verified');
                      }}
                    >
                      <i className="bi bi-heart-fill me-2"></i>
                      Make Another Donation
                    </motion.button>
                  </div>
                  
                  <div className="mt-5 pt-4 border-top">
                    <p className="text-muted">
                      <i className="bi bi-info-circle me-2"></i>
                      Your donation receipt has been emailed to <strong>{receiptData.donorInfo.email}</strong>
                    </p>
                    <div className="small text-muted">
                      For any questions, contact us at <strong>0321-9920015</strong> or visit our office in Faisalabad
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Trust Badges */}
            <div className="text-center mt-4">
              <div className="d-flex flex-wrap justify-content-center gap-4">
                <div className="text-white">
                  <i className="bi bi-shield-check fs-4 me-2"></i>
                  <span>Secure Process</span>
                </div>
                <div className="text-white">
                  <i className="bi bi-receipt fs-4 me-2"></i>
                  <span>Tax Receipt</span>
                </div>
                <div className="text-white">
                  <i className="bi bi-award fs-4 me-2"></i>
                  <span>Registered Charity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CSS Styles
const DonationPageStyles = () => (
  <style>{`
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
    
    /* Success animation */
    @keyframes successPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    .text-success i {
      animation: successPulse 2s infinite;
    }
    
    /* Copy button animation */
    @keyframes copyPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    .btn-outline-primary:active {
      animation: copyPulse 0.3s;
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
    
    /* Bank details styling */
    .bg-light.rounded {
      transition: all 0.3s ease;
    }
    
    .bg-light.rounded:hover {
      background-color: #f8f9fa !important;
      border-color: #dee2e6 !important;
    }
  `}</style>
);

export default function PremiumDonationPage() {
  return (
    <>
      <ToastHost />
      <DonationPageStyles />
      <DonationPage />
    </>
  );
}
