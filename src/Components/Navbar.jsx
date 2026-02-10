import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/Ali-zaib-Logo.webp';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", text: "Home" },
    { path: "/about", text: "About Us" },
    { path: "/programs", text: "Services" },
    { path: "/gallery", text: "Gallery" },
    { path: "/contact", text: "Contact" },
    { path: "/support-us", text: "Support Us" }
  ];

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top bg-white"
      style={{
        top: scrolled ? "40px" : "90px", // top is 40px when scrolled, 90px when at top
        zIndex: 1050,
        boxShadow: scrolled
          ? "0 4px 15px rgba(0,0,0,0.1)"
          : "0 1px 5px rgba(0,0,0,0.05)",
        transition: "top 0.3s ease, box-shadow 0.3s ease" // smooth transition
      }}
    >
      <div className="container">

        <Link
          className="navbar-brand fw-bold"
          to="/"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={logo}
            alt="Ali Zaib Orphan Home Logo"
            style={{ height: '40px', marginRight: '10px' }}
            width="80"
            height="30"
            decoding="async"
            loading="eager"
          />
          <span className="d-none d-lg-inline">ALI ZAIB ORPHAN HOME (Aashiana)</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <div className="d-flex flex-column align-items-center">
            <ul className="navbar-nav">
              {navItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <Link
                    className="nav-link fw-bold"
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              to="/donate"
              className="btn btn-success rounded-pill px-4 d-lg-none mt-3"
              onClick={() => setIsOpen(false)}
            >
              Donate Now
            </Link>
          </div>
        </div>

        <Link
          to="/donate"
          className="btn btn-success rounded-pill px-4 d-none d-lg-inline-block"
          onClick={() => setIsOpen(false)}
        >
          Donate Now
        </Link>

      </div>
    </nav>
  );
}

// Add custom styles for nav-link hover effects
const style = `
  .navbar .nav-link:hover {
    color: #198754 !important;
    text-decoration: underline !important;
    transition: all 0.3s ease;
  }
`;

// Add style component
const NavbarStyle = () => (
  <style dangerouslySetInnerHTML={{ __html: style }} />
);

export default function NavbarWithStyle() {
  return (
    <>
      <NavbarStyle />
      <Navbar />
    </>
  );
}
