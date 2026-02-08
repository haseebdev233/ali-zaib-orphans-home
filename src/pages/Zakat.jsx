import { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Zakat constants
const NISAB_GOLD = 1916150;
const NISAB_SILVER = 139000;
const ZAKAT_RATE = 0.025;

// Zakat Calculator Component (memoized to prevent unnecessary re-renders)
const ZakatCalculatorComponent = memo(({ calculatorData, handleCalculatorChange, calculateZakat, zakatResult }) => (
  <div className="row justify-content-center">
    <div className="col-lg-8">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">Calculate Your Zakat</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="cash-balance" className="form-label">Cash & Bank Balances (Rs)</label>
              <input
                type="number"
                className="form-control"
                id="cash-balance"
                name="cash"
                value={calculatorData.cash}
                onChange={(e) => handleCalculatorChange('cash', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="gold-weight" className="form-label">Gold Weight (Tolas)</label>
              <input
                type="number"
                className="form-control"
                id="gold-weight"
                name="goldWeight"
                value={calculatorData.goldWeight}
                onChange={(e) => handleCalculatorChange('goldWeight', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="silver-weight" className="form-label">Silver Weight (Tolas)</label>
              <input
                type="number"
                className="form-control"
                id="silver-weight"
                name="silverWeight"
                value={calculatorData.silverWeight}
                onChange={(e) => handleCalculatorChange('silverWeight', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="investments-shares" className="form-label">Investments & Shares (Rs)</label>
              <input
                type="number"
                className="form-control"
                id="investments-shares"
                name="investments"
                value={calculatorData.investments}
                onChange={(e) => handleCalculatorChange('investments', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="business-inventory" className="form-label">Business Inventory (Rs)</label>
              <input
                type="number"
                className="form-control"
                id="business-inventory"
                name="businessInventory"
                value={calculatorData.businessInventory}
                onChange={(e) => handleCalculatorChange('businessInventory', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="receivables" className="form-label">Receivables (Rs)</label>
              <input
                type="number"
                className="form-control"
                id="receivables"
                name="receivables"
                value={calculatorData.receivables}
                onChange={(e) => handleCalculatorChange('receivables', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="other-assets" className="form-label">Other Assets (Rs)</label>
              <input
                type="number"
                className="form-control"
                id="other-assets"
                name="otherAssets"
                value={calculatorData.otherAssets}
                onChange={(e) => handleCalculatorChange('otherAssets', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="debts-liabilities" className="form-label">Debts & Liabilities (Rs)</label>
              <input
                type="number"
                className="form-control"
                id="debts-liabilities"
                name="debts"
                value={calculatorData.debts}
                onChange={(e) => handleCalculatorChange('debts', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-success btn-lg px-5" onClick={calculateZakat}>
              Calculate Zakat
            </button>
          </div>
          {zakatResult && (
            <div className="mt-4 p-3 bg-light rounded">
              <h6 className="text-success mb-3">Zakat Calculation Result</h6>
              {zakatResult.nisabMet ? (
                <div>
                  <p className="mb-2"><strong>Zakat Due:</strong> Rs {zakatResult.zakatDue.toLocaleString()}</p>
                  <p className="mb-2"><strong>Net Assets:</strong> Rs {zakatResult.netAssets.toLocaleString()}</p>
                  <p className="mb-0"><strong>Nisab Threshold:</strong> Rs {zakatResult.nisabThreshold.toLocaleString()}</p>
                  {zakatResult.isZakatDue && (
                    <div className="text-center mt-3">
                      <Link to="/donate" state={{ zakatAmount: zakatResult.zakatDue }} className="btn btn-success btn-lg">
                        Donate Now
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <p className="mb-0 text-muted">Your assets are below the Nisab threshold. Zakat is not obligatory this year.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
));

// Zakat Calculator Class
class ZakatCalculator {
  static calculateZakat(assets) {
    const {
      cash,
      goldWeight,
      goldRate,
      silverWeight,
      silverRate,
      investments,
      businessInventory,
      receivables,
      otherAssets,
      debts
    } = assets;

    const goldValue = goldWeight * goldRate;
    const silverValue = silverWeight * silverRate;

    const totalAssets =
      cash +
      goldValue +
      silverValue +
      investments +
      businessInventory +
      receivables +
      otherAssets;

    const netAssets = totalAssets - debts;
    const nisabThreshold = Math.min(NISAB_SILVER, NISAB_GOLD);

    if (netAssets < nisabThreshold) {
      return {
        zakatDue: 0,
        isZakatDue: false,
        nisabMet: false,
        netAssets,
        nisabThreshold
      };
    }

    const zakatDue = netAssets * ZAKAT_RATE;

    return {
      zakatDue: Math.round(zakatDue),
      isZakatDue: true,
      nisabMet: true,
      netAssets,
      nisabThreshold,
      breakdown: {
        cash,
        goldValue,
        silverValue,
        investments,
        businessInventory,
        receivables,
        otherAssets,
        totalAssets,
        debts
      }
    };
  }

  static getCurrentGoldRate() {
    return 215000;
  }

  static getCurrentSilverRate() {
    return 2650;
  }
}



// Fatwa content
const fatwaContent = {
  title: "Fatwa Regarding Zakat Distribution",
  issuingAuthority: "Darul Iftaa, Jamia Islamia",
  referenceNumber: "FI-1444-078",
  date: "15 Ramadan 1444 AH",

  text: `
بسم الله الرحمن الرحيم

الحمد لله رب العالمين، والصلاة والسلام على سيدنا محمد وعلى آله وصحبه أجمعين

**سؤال:** هل يجوز دفع الزكاة إلى دار الأيتام هذه؟

**الجواب:** نعم، يجوز دفع الزكاة إلى هذه الدار للأسباب التالية:

١. تدير الدار ويتامى محتاجين من الأصناف الثمانية المستحقين للزكاة
٢. تخصص الزكاة لأيتام فقراء لا غير
٣. لا تخلط الزكاة بالصدقات العامة بل تحفظ في حساب منفصل
٤. يشرف عليها أهل الثقة والخبرة
٥. تقدم تقارير مالية مفصلة وتخضع لمراجعة شرعية سنوية

والله أعلم

**التوقيع:**
مفتي عام الباكستان
الدكتور محمد تقي العثماني
(حفظه الله)
  `,

  translation: `
In the name of Allah, the Most Gracious, the Most Merciful

All praise is to Allah, and peace and blessings be upon Prophet Muhammad

**Question:** Is it permissible to pay Zakat to this orphanage?

**Answer:** Yes, it is permissible to pay Zakat to this institution for the following reasons:

1. The institution cares for needy orphans from the eight categories eligible for Zakat
2. Zakat funds are dedicated specifically to poor orphans only
3. Zakat is not mixed with general donations but kept in separate accounts
4. It is supervised by trustworthy and experienced individuals
5. Detailed financial reports are provided with annual Shariah audits

And Allah knows best

**Signed:**
Grand Mufti of Pakistan
Dr. Muhammad Taqi Usmani
(may Allah protect him)
  `
};

// FAQ data
const zakatFAQs = [
  {
    question: "How do you ensure Zakat funds are distributed only to eligible recipients?",
    answer: "We maintain separate accounts for Zakat funds and conduct thorough eligibility verification for all recipients. Our distribution follows Islamic guidelines and is supervised by qualified Islamic scholars."
  },
  {
    question: "What percentage of Zakat donations actually reach the orphans?",
    answer: "100% of Zakat donations go directly to eligible orphan recipients. Administrative costs are covered by separate donations, ensuring complete transparency."
  },
  {
    question: "Do you provide Zakat receipt for tax purposes?",
    answer: "Yes, we provide official Zakat receipts that can be used for tax deductions. All receipts include necessary documentation and are issued according to Islamic and legal requirements."
  },
  {
    question: "How is the Zakat distributed among different needs?",
    answer: "Zakat is distributed based on priority needs: food and basic necessities first, then education, healthcare, and long-term development. Each distribution is documented and reported quarterly."
  },
  {
    question: "Can I specify how my Zakat should be used?",
    answer: "While you cannot specify particular uses for Zakat (as it must go to eligible recipients based on need), you can see exactly how your Zakat contributes through our detailed impact reports."
  },
  {
    question: "What is Zakat?",
    answer: "Zakat is one of the Five Pillars of Islam, a mandatory form of almsgiving that purifies wealth and helps the community."
  },
  {
    question: "Who is eligible to pay Zakat?",
    answer: "Every Muslim who possesses wealth above the Nisab threshold for a full lunar year is eligible to pay Zakat."
  },
  {
    question: "When should Zakat be paid?",
    answer: "Zakat becomes due at the end of the lunar year when one's wealth has been held for a full year and exceeds the Nisab."
  },
  {
    question: "What is Nisab?",
    answer: "Nisab is the minimum amount of wealth a Muslim must possess before Zakat becomes obligatory. It is equivalent to the value of 87.48 grams of gold or 612.36 grams of silver."
  },
  {
    question: "What types of wealth are subject to Zakat?",
    answer: "Zakat is due on cash, gold, silver, investments, business inventory, and other productive assets, minus any outstanding debts."
  }
];

function Zakat() {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [calculatorData, setCalculatorData] = useState({
    cash: "",
    goldWeight: "",
    silverWeight: "",
    investments: "",
    businessInventory: "",
    receivables: "",
    otherAssets: "",
    debts: ""
  });
  const [zakatResult, setZakatResult] = useState(null);

  const handleCalculatorChange = useCallback((field, value) => {
    setCalculatorData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const calculateZakat = useCallback(() => {
    const goldRate = ZakatCalculator.getCurrentGoldRate();
    const silverRate = ZakatCalculator.getCurrentSilverRate();

    // Parse string values to numbers, defaulting to 0 for empty strings
    const parsedData = {
      cash: parseFloat(calculatorData.cash) || 0,
      goldWeight: parseFloat(calculatorData.goldWeight) || 0,
      silverWeight: parseFloat(calculatorData.silverWeight) || 0,
      investments: parseFloat(calculatorData.investments) || 0,
      businessInventory: parseFloat(calculatorData.businessInventory) || 0,
      receivables: parseFloat(calculatorData.receivables) || 0,
      otherAssets: parseFloat(calculatorData.otherAssets) || 0,
      debts: parseFloat(calculatorData.debts) || 0,
      goldRate,
      silverRate
    };

    const result = ZakatCalculator.calculateZakat(parsedData);

    setZakatResult(result);
  }, [calculatorData]);



  // Gallery images (using existing images from public/assets/images)
  const galleryImages = [
    '/assets/images/1.jpeg',
    '/assets/images/2.jpeg',
    '/assets/images/3.jpeg',
    '/assets/images/5.jpeg',
    '/assets/images/6.jpeg',
    '/assets/images/7.jpeg',
    // Prefer WebP hero images to reduce payload
    '/assets/images-webp/1.webp',
    '/assets/images-webp/2.webp',
    '/assets/images-webp/3.webp'
  ];

  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  return (
    <div className="zakat-page">
      {/* Hero Section */}
      <motion.section
        className="hero-section text-white d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/assets/images-webp/5.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '60vh'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container text-center">
          <motion.h1
            className="display-4 fw-bold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Change a Child's Life
          </motion.h1>
          <motion.p
            className="lead mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Every child deserves a chance at a brighter future. Meet Amina, an 8-year-old girl from Karachi who lost her father to COVID-19. Despite her hardships, she dreams of becoming a doctor and helps care for her younger siblings. Your Zakat can transform her story from struggle to success.
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link to="/donate" className="btn btn-light btn-lg px-5 py-3">
              Donate Zakat Today
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Islamic Perspective Section */}
      <motion.section
        className="islamic-perspective py-5 bg-light"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.h2
                className="fw-bold mb-4 text-success"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                The Importance of Zakat in Islam
              </motion.h2>
              <motion.p
                className="mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Zakat is one of the Five Pillars of Islam, obligatory for Muslims who meet the necessary criteria. Allah says in the Quran:
              </motion.p>
              <motion.blockquote
                className="blockquote"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="mb-0">"And establish prayer and give Zakat and bow with those who bow [in worship and obedience]."</p>
                <footer className="blockquote-footer p-2">Quran 2:43</footer>
              </motion.blockquote>
            </div>
            <div className="col-lg-6 text-center">
              <motion.img
                src="/assets/images-webp/zakat.webp"
                alt="Quran verse about Zakat"
                className="img-fluid rounded shadow"
                style={{ maxWidth: '300px', width: '100%' }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Sadaqa and Aqiqa Section */}
      <motion.section
        className="sadaqa-aqiqa py-5 bg-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.h2
            className="text-center fw-bold mb-5 text-success"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Sadaqa and Aqiqa Donations
          </motion.h2>
          <div className="row g-4 justify-content-center">
            <div className="col-lg-6">
              <motion.div
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="card-body text-center">
                  <i className="bi bi-heart-fill text-success fs-1 mb-3"></i>
                  <h5 className="card-title">Sadaqa (Voluntary Charity)</h5>
                  <p className="card-text">Sadaqa is voluntary charity that brings blessings and rewards in this life and the hereafter. Your generous donations help support our ongoing efforts for orphaned children.</p>
                  <Link to="/donate" className="btn btn-success btn-lg">
                    Donate Sadaqa
                  </Link>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div
                className="card border-0 shadow-sm h-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="card-body text-center">
                  <i className="bi bi-star-fill text-success fs-1 mb-3"></i>
                  <h5 className="card-title">Aqiqa (Newborn Celebration)</h5>
                  <p className="card-text">Aqiqa is the Islamic tradition of sacrificing an animal on the birth of a child. Donate for Aqiqa goat at Rs 25,000 to help families fulfill this sunnah and support our orphans.</p>
                  <p className="text-muted">Goat Price: Rs 25,000</p>
                  <Link to="/donate" state={{ aqiqaAmount: 25000 }} className="btn btn-success btn-lg">
                    Donate for Aqiqa
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>





      {/* Zakat Eligibility Calculator Section */}
      <motion.section
        className="zakat-calculator py-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.h2
            className="text-center fw-bold mb-5 text-success"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Zakat Eligibility Calculator
          </motion.h2>
          <motion.p
            className="text-center lead mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Calculate your Zakat obligation easily. Zakat is due on wealth above the Nisab threshold (approximately Rs 1,916,150 for gold or Rs 139,000 for silver).
          </motion.p>
          <ZakatCalculatorComponent
            calculatorData={calculatorData}
            handleCalculatorChange={handleCalculatorChange}
            calculateZakat={calculateZakat}
            zakatResult={zakatResult}
          />
        </div>
      </motion.section>



      {/* 100% Zakat Policy Section */}
      <motion.section
        className="zakat-policy py-5 bg-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container text-center">
          <motion.h2
            className="fw-bold mb-4 text-success"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            100% Zakat Policy
          </motion.h2>
          <motion.p
            className="lead mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            We guarantee that 100% of your Zakat donations go directly to eligible orphan recipients. Administrative costs are covered by separate donations, ensuring complete transparency and compliance with Islamic principles.
          </motion.p>
          <motion.div
            className="row g-4 justify-content-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <i className="bi bi-shield-check text-success fs-1 mb-3"></i>
                  <h5 className="card-title">Separate Accounts</h5>
                  <p className="card-text">Zakat funds are kept in dedicated accounts, never mixed with general donations.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <i className="bi bi-eye text-success fs-1 mb-3"></i>
                  <h5 className="card-title">Full Transparency</h5>
                  <p className="card-text">Detailed quarterly reports show exactly how your Zakat is distributed.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <i className="bi bi-check-circle text-success fs-1 mb-3"></i>
                  <h5 className="card-title">Shariah Compliance</h5>
                  <p className="card-text">All distributions are supervised by qualified Islamic scholars.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Fatwa/Endorsement Section */}
      <motion.section
        className="fatwa-endorsement py-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.h2
            className="text-center fw-bold mb-5 text-success"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Fatwa/Endorsement
          </motion.h2>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <motion.div
                className="card border-0 shadow-sm"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="card-header bg-success text-white text-center">
                  <h5 className="mb-0">{fatwaContent.title}</h5>
                  <small className="text-success-50">{fatwaContent.issuingAuthority} • {fatwaContent.referenceNumber} • {fatwaContent.date}</small>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="text-success mb-3">Arabic Text</h6>
                      <pre className="text-end" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.6' }}>
                        {fatwaContent.text}
                      </pre>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-success mb-3">English Translation</h6>
                      <p className="mb-0" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        {fatwaContent.translation}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="faq-section py-5 bg-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.h2
            className="text-center fw-bold mb-5 text-success"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="zakatFAQ">
                {zakatFAQs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="accordion-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq${index}`}
                        aria-expanded={index === 0 ? 'true' : 'false'}
                        aria-controls={`faq${index}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`faq${index}`}
                      className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                      data-bs-parent="#zakatFAQ"
                    >
                      <div className="accordion-body">
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="cta-section text-white py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/assets/images-webp/4.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container text-center">
          <motion.h2
            className="fw-bold mb-4"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Fulfill Your Zakat Today
          </motion.h2>
          <motion.p
            className="lead mb-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Your Zakat can transform lives. Donate now and make a difference in the lives of orphaned children.
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link to="/donate" className="btn btn-light btn-lg px-5 py-3">
              Donate Zakat
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default Zakat;
