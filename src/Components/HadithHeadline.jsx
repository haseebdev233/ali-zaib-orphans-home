import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HadithHeadline = () => {
  const englishText = "أَنَا وَكَافِلُ الْيَتِيمِ فِي الْجَنَّةِ كَهَاتَيْنِ[وَأَشَارَ بِالسَّبَّابَةِ وَالْوُسْطَى]";
  const urduText = "میں اور یتیم کا سرپرست جنت میں اس طرح قریب ہوں گے۔[اور آپ ﷺ نے اپنی سب سے پہلی اور درمیانی انگلی ملا کر دکھائی]";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Combine both texts with a separator
  const fullText = `${englishText} • ${urduText} • `;
  
  // Width calculation for smooth loop
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    // Calculate text width for animation timing
    const tempElement = document.createElement('span');
    tempElement.style.visibility = 'hidden';
    tempElement.style.position = 'absolute';
    tempElement.style.whiteSpace = 'nowrap';
    tempElement.style.fontSize = '14px';
    tempElement.style.fontWeight = 'bold';
    tempElement.textContent = fullText + fullText; // Double for seamless loop
    document.body.appendChild(tempElement);
    setTextWidth(tempElement.offsetWidth / 2);
    document.body.removeChild(tempElement);
  }, [fullText]);

  const containerVariants = {
    animate: {
      x: [-textWidth, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: textWidth / 50, // Speed based on text length
          ease: "linear",
        },
      },
    },
    paused: {
      x: 0,
      transition: {
        duration: 0
      }
    }
  };

  return (
    <section
      className="hadith-headline bg-success text-white py-2"
      style={{
        marginTop: "0px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: scrolled ? "0" : "50px",
        left: 0,
        right: 0,
        zIndex: 9999,
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        transition: "top 0.3s ease"
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-fluid px-0" style={{ overflow: "hidden" }}>
        <motion.div
          className="d-flex align-items-center"
          variants={containerVariants}
          animate={isPaused ? "paused" : "animate"}
          initial="animate"
          style={{
            whiteSpace: "nowrap",
            paddingLeft: "100%", // Start off-screen right
          }}
        >
          {/* Display text twice for seamless loop */}
          <span style={{ paddingRight: "50px" }}>
            <span className="fw-bold" style={{ fontSize: "14px" }}>
              {fullText}
            </span>
            <span className="fw-bold" style={{ fontSize: "14px" }}>
              {fullText}
            </span>
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default HadithHeadline;