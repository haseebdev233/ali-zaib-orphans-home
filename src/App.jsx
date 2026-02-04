import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TopBar from "./Components/TopBar";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Loader from "./Components/Loader";

// Lazy load page components for code splitting
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Programs = lazy(() => import("./pages/Programs"));
const Donate = lazy(() => import("./pages/Donate"));
const Volunteer = lazy(() => import("./pages/Volunteer"));
const CampusAmbassador = lazy(() => import("./pages/CampusAmbassador"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const SponsorAnOrphan = lazy(() => import("./pages/SponsorAnOrphan"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Ali Zaib Orphan Home Website Loaded");
    // Remove artificial loading delay for better performance
    setLoading(false);
  }, []);

  // Removed automatic scroll to prevent CLS

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>

      <TopBar />
      <Navbar />

      <div style={{ marginTop: "120px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/campus-ambassador" element={<CampusAmbassador />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sponsor-an-orphan" element={<SponsorAnOrphan />} />
        </Routes>
      </div>

      <Footer />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/923219920015"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <i className="bi bi-whatsapp"></i>
      </a>

      {/* Donate Now Floating Button */}
      <a
        href="/donate"
        className="donate-float"
        aria-label="Donate Now"
      >
        <i className="bi bi-heart-fill"></i>
      </a>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </Router>
  );
}

export default App;
