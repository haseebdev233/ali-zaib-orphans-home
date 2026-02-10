import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Suspense, lazy } from "react";

import TopBar from "./Components/TopBar";
import Navbar from "./Components/Navbar";
import HadithHeadline from "./Components/HadithHeadline";
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
const Zakat = lazy(() => import("./pages/Zakat"));
const SupportUs = lazy(() => import("./pages/SupportUs"));

function App() {
  return (
    <Router>

      <TopBar />
      <HadithHeadline />
      <Navbar />

      <div style={{ marginTop: "120px" }}>
        <Suspense fallback={<Loader />}>
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
            <Route path="/zakat" element={<Zakat />} />
            <Route path="/support-us" element={<SupportUs />} />
          </Routes>
        </Suspense>
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
      <Link
        to="/donate"
        className="donate-float"
        aria-label="Donate Now"
      >
        <i className="bi bi-heart-fill"></i> Donate Now
      </Link>

    </Router>
  );
}

export default App;
