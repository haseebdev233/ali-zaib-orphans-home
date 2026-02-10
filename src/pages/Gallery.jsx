﻿import { useState } from "react";
import SECTIONS from "../data/gallery-sections.js";

function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState(null);

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
                        style={{
                          height: "220px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        loading="lazy"
                        onClick={() => setSelectedMedia(item)}
                      />
                    )}

                    {/* VIDEO */}
                    {item.type === "video" && (
                      <div style={{ position: "relative" }}>
                        <video
                          src={item.src}
                          className="card-img-top"
                          style={{
                            height: "220px",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          muted
                          preload="metadata"
                          onClick={() => setSelectedMedia(item)}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            fontSize: "38px",
                            color: "#fff",
                            pointerEvents: "none",
                          }}
                        >
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
      {selectedMedia && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">{selectedMedia.alt}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedMedia(null)}
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
      )}
    </>
  );
}

export default Gallery;
