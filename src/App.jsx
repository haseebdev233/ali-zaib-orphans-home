import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import TopBar from "./Components/Topbar";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Loader from "./Components/Loader";

import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Donate from "./pages/Donate";
import Volunteer from "./pages/Volunteer";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Ali Zaib Orphan Home Website Loaded");
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

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
          <Route path="/contact" element={<Contact />} />
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

    </Router>
  );
}

export default App;
