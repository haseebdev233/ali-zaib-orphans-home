import SiteImage from '../Components/SiteImage';
import { galleryDefaults } from '../data/siteContent';
import { usePageContent } from '../data/usePageContent';
import { useState } from "react";


const INITIAL_VISIBLE = 8;
const LOAD_STEP = 8;

function Gallery() {
  const content = usePageContent('gallery', galleryDefaults);
  const sections = content.sections;
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [visibleCounts, setVisibleCounts] = useState({});

  function loadMore(id) {
    setVisibleCounts((counts) => ({ ...counts, [id]: (counts[id] || INITIAL_VISIBLE) + LOAD_STEP }));
  }

  return (
    <>
      <div className="container py-5">
        <h2 className="text-center text-success fw-bold mb-5">
          {content.title}
        </h2>

        {sections.map((section) => (
          <div key={section.id} className="mb-5">
            <h3 className="text-center text-success mb-4">
              {section.title}
            </h3>

            <div className="row">
              {(section.media || []).slice(0, visibleCounts[section.id] || INITIAL_VISIBLE).map((item) => (
                <div
                  key={item.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                >
                  <div className="card shadow-sm border-0 h-100">

                    {/* IMAGE */}
                    {item.type === "image" && (
                      <SiteImage
                        source={item.src}
                        alt={item.alt}
                        className="card-img-top"
                        style={{
                          height: "220px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        loading="lazy"
                        decoding="async"
                        width="440"
                        height="220"
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

            {(visibleCounts[section.id] || INITIAL_VISIBLE) < (section.media || []).length && (
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-outline-success rounded-pill px-4"
                  onClick={() => loadMore(section.id)}
                >
                  Load more
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedMedia && (
        <div
          className="modal show d-block"
          role="dialog" aria-modal="true" aria-label="Gallery preview"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">{selectedMedia.alt}</h5>
                <button
                  type="button"
                  className="btn-close" aria-label="Close preview"
                  onClick={() => setSelectedMedia(null)}
                ></button>
              </div>

              <div className="modal-body text-center">
                {selectedMedia.type === "image" ? (
                  <SiteImage
                    source={selectedMedia.src}
                    alt={selectedMedia.alt}
                    className="img-fluid"
                    decoding="async"
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
