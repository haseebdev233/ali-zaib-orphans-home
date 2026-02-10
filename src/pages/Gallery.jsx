﻿import { useState, useCallback, useMemo } from "react";
import SECTIONS from "../data/gallery-sections.js";

// Move inline styles to constants for better performance
const mediaCardStyle = {
  height: "220px",
  objectFit: "cover",
  cursor: "pointer",
};

const playButtonContainerStyle = {
  position: "relative"
};

const playButtonStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "38px",
  color: "#fff",
  pointerEvents: "none",
};

const modalBackdropStyle = {
  backgroundColor: "rgba(0,0,0,0.85)"
};

function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Memoize close handler to prevent re-creation on every render
  const handleCloseModal = useCallback(() => {
    setSelectedMedia(null);
  }, []);

  // Memoize modal content to prevent unnecessary re-renders
  const modalContent = useMemo(() => {
    if (!selectedMedia) return null;

    return (
      <div className="modal show d-block" style={modalBackdropStyle}>
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedMedia.alt}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
              ></button>
            </div>

            <div className="modal-body text-center">
              {selectedMedia.type === "image" ? (
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.alt}
                  className="img-fluid"
                />
              ) : (
                <video
                  src={selectedMedia.src}
                  controls
                  autoPlay
                  className="img-fluid"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }, [selectedMedia, handleCloseModal]);

  return (
    <>
      <div className="container py-5">
        <h2 className="text-center text-success fw-bold mb-5">
          Our Gallery
        </h2>

        {SECTIONS.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-5">
            <h3 className="text-center text-success mb-4">
              {section.title}
            </h3>

            <div className="row">
              {section.media.map((item, index) => (
                <div
                  key={`${sectionIndex}-${index}`}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                >
                  <div className="card shadow-sm border-0 h-100">

                    {/* IMAGE */}
                    {item.type === "image" && (
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="card-img-top"
                        style={mediaCardStyle}
                        loading="lazy"
                        onClick={() => setSelectedMedia(item)}
                      />
                    )}

                    {/* VIDEO */}
                    {item.type === "video" && (
                      <div style={playButtonContainerStyle}>
                        <video
                          src={item.src}
                          className="card-img-top"
                          style={mediaCardStyle}
                          muted
                          preload="metadata"
                          onClick={() => setSelectedMedia(item)}
                        />
                        <div style={playButtonStyle}>
                          ▶
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modalContent}
    </>
  );
}

export default Gallery;
