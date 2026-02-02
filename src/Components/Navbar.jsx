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
    { path: "/", text: "HOME" },
    { path: "/about", text: "ABOUT US" },
    { path: "/programs", text: "PROGRAMS" },
    { path: "/gallery", text: "GALLERY" },
    { path: "/contact", text: "CONTACT" }
  ];

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top bg-white"
      style={{
        top: scrolled ? "0" : "50px", // top is 0 when scrolled, 50px when at top
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
          <img src={logo} alt="Ali Zaib Orphan Home Logo" style={{ height: '40px', marginRight: '10px' }} />
          <span className="d-none d-lg-inline">ALIZAIB ORPHAN HOME</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse text-center ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto">
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
