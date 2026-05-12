import React, { useEffect, useState } from "react";
import newBannerImg from "../assets/newbanners.jpeg";
import "./WelcomeBanner.css";


const STORAGE_KEY = "ali-zaib-welcome-banner-dismissed";

export default function WelcomeBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Show on each browser session unless the user dismisses it.
    // If storage is blocked/cleared, the banner will still show.
    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY) === "true";
      setVisible(!dismissed);
    } catch {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  };

  if (!visible) return null;

  return (
    <div
      className="welcome-banner-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome banner"
    >
      <div className="welcome-banner-card">
        <button
          type="button"
          className="welcome-banner-close"
          aria-label="Close banner"
          onClick={handleClose}
        >
          ×
        </button>

        <img
          src={newBannerImg}
          alt="Welcome"
          className="welcome-banner-image"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
}

