import React from 'react';
import './Loader.css'; // We'll create this CSS file for the loader styles

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="spinner"></div>
        <p className="loader-text">Loading Ali-Zaib Orphan Home...</p>
      </div>
    </div>
  );
};

export default Loader;
