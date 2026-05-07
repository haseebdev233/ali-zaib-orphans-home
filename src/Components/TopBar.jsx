import { useEffect, useState } from "react";

function TopBar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const socialIcons = [
    { icon: "bi bi-facebook", url: "https://www.facebook.com/profile.php?id=61586826886946" },
    { icon: "bi bi-instagram", url: "https://www.instagram.com/alizaiborphanhomeaashian/" },
    { icon: "bi bi-twitter-x", url: "https://x.com/Alizaiboorphan" },
    { icon: "bi bi-youtube", url: "https://www.youtube.com/@AliZaibOrphanHome" },
    { icon: "bi bi-linkedin", url: "https://www.linkedin.com/in/ali-zaib-orphan-home-undefined-1602a03aa/" },
    { icon: "bi bi-tiktok", url: "https://www.tiktok.com/@alizaiborphanhome" }
  ];

  return (
    <div
      className="bg-dark text-white"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1060,
        height: "50px",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease",
      }}
    >
      <div className="container h-100 d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="small d-none d-sm-block">
          <a
            href="https://wa.me/923219920015"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-decoration-none"
            style={{ transition: 'color 0.3s' }}
            onMouseEnter={(e) => e.target.style.color = '#28a745'}
            onMouseLeave={(e) => e.target.style.color = 'white'}
          >
            <i className="bi bi-telephone me-2 text-success"></i>
            +92 321 9920015
          </a>
          <span className="mx-3">|</span>
          <a
            href="mailto:pmalizaib@gmail.com"
            className="text-white text-decoration-none"
            style={{ transition: 'color 0.3s' }}
            onMouseEnter={(e) => e.target.style.color = '#28a745'}
            onMouseLeave={(e) => e.target.style.color = 'white'}
          >
            <i className="bi bi-envelope me-2 text-success"></i>
            pmalizaib@gmail.com
          </a>
        </div>

        <div className="d-flex gap-2 gap-md-3">
          {socialIcons.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-decoration-none"
              style={{ transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.target.style.color = '#28a745'}
              onMouseLeave={(e) => e.target.style.color = 'white'}
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
