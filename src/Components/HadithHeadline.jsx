import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HadithHeadline = () => {
  const englishText = "The Prophet (ﷺ) said, \"I and the person who looks after an orphan and provides for him, will be in Paradise like this,\" putting his index and middle fingers together Sahih al-Bukhari 6005.";
  const urduText = "نبی کریم ﷺ نے فرمایا: میں اور وہ شخص جو یتیم کی دیکھ بھال کرتا ہے اور اس کی کفالت کرتا ہے، جنت میں اس طرح ہوں گے، اپنی انگلیاں ایک ساتھ ملا کر۔ صحیح البخاری 6005۔";

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
        marginTop: "20px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: scrolled ? "45px" : "90px",
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
      
      {/* Optional: Breaking News Icon */}
      <div 
        style={{
          position: "absolute",
          left: "15px",
          background: "#d32f2f",
          padding: "2px 10px",
          borderRadius: "3px",
          fontSize: "12px",
          fontWeight: "bold",
          zIndex: 10000,
          display: "flex",
          alignItems: "center",
          gap: "5px"
        }}
      >
        <span className="bi bi-broadcast me-1"></span>
        HADITH
      </div>
    </section>
  );
};

export default HadithHeadline;