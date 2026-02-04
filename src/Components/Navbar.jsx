import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../assets/images/Ali-zaib-Logo.webp';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    { path: "/programs", text: "SERVICES" },
    { path: "/gallery", text: "GALLERY" },
    { path: "/contact", text: "CONTACT" },
    {
      text: "CURRENT APPEAL",
      dropdown: [
        { text: "Ramadan Appeal", path: "/donate" },
        { text: "Food Appeal", path: "/donate" },
        { text: "Education Appeal", path: "/donate" },
        { text: "Health Appeal", path: "/donate" },
        { text: "Winter Appeal", path: "/donate" },
        { text: "Sponsor an Orphan", path: "/sponsor-an-orphan" }
      ]
    }
  ];

  return (
    <motion.nav
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
          <span className="d-none d-lg-inline">ALI ZAIB ORPHAN HOME</span>
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
                <li key={index} className={`nav-item ${item.dropdown ? 'dropdown' : ''}`}>
                  {item.dropdown ? (
                    <div className="dropdown">
                      <button
                        className="nav-link fw-bold dropdown-toggle border-0 bg-transparent"
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        aria-expanded={dropdownOpen}
                      >
                        {item.text}
                      </button>
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.ul
                            className="dropdown-menu show"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          >
                            {item.dropdown.map((subItem, subIndex) => (
                              <motion.li
                                key={subIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIndex * 0.1, duration: 0.3 }}
                                whileHover={{ scale: 1.05, x: 5 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Link
                                  className="dropdown-item"
                                  to={subItem.path}
                                  onClick={() => {
                                    setIsOpen(false);
                                    setDropdownOpen(false);
                                  }}
                                >
                                  {subItem.text}
                                </Link>
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      className="nav-link fw-bold"
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.text}
                    </Link>
                  )}
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
    </motion.nav>
  );
}

// Add custom styles for nav-link hover effects
const style = `
  .navbar .nav-link:hover {
    color: #198754 !important;
    text-decoration: underline !important;
    transition: all 0.3s ease;
  }
  .navbar .dropdown-item:hover {
    background-color: #f8f9fa !important;
    color: #198754 !important;
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
