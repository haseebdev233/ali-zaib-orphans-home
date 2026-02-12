﻿import { useState } from "react";

/* 
   ✅ IMPORTANT:
   Paste your FULL SECTIONS array here.
   (The big one you already provided with all videos & images)
*/
const SECTIONS = [{ title: 'Birthdays of Orphans', media: [{ src: '/assets/Gallary/Birthdays of Orphans/1.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Birthdays of Orphans/2.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Birthdays of Orphans/3.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Birthdays of Orphans/4.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Birthdays of Orphans/5.mp4', alt: 'Video', type: 'video' },] }, { title: 'Events', media: [{ src: '/assets/Gallary/Events/Inauguration of computer lab.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Events/WhatsApp Image 2026-02-10 at 2.03.23 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Events/WhatsApp Image 2026-02-10 at 2.03.23 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Events/WhatsApp Image 2026-02-10 at 2.03.24 PM (2).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Events/WhatsApp Image 2026-02-10 at 2.03.24 PM (3).jpeg', alt: 'Image', type: 'image' },] }, { title: 'Life at Ali Zaib Orphan Home', media: [{ src: '/assets/Gallary/Life at Ali Zaib Orphan Home/AQM-OwLMfn6_eH9h6Tabmw5SiQ5RTMlRr6ZFfNXo9o5vE83nVb-cfx4VOVTdn-GNbVMtgG_KdrcSw2bcGGuKII5GjYIfPYzq_Edj_3NmDkM25Q.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/AQMCZMj74pvRIRanYxtFZWlyj_J_Tet9WSR5JDWN8N8IVkx6jOW_lqpg5H5eBS-vceJw3vRMmwCLwYKxZwigXnU79_YMykRPjGNZw8EqhXqVxA.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/AQMwauWUCAAQNnQjnkzEAtZ6HplGGSB0pewYOUsT0idu4eeo7X4ARfyR3kDBBy34jFbGVmapBbDtpuwt8MXXFvmN10vv-k10KjlLUGG5Ww5_JQ.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/AQOU_0-niv1Jp3bdq7VruZ_8tYIYqHkFdTsRU7-HXrrL1QuuMDBV2t9YQXXY27tq4DDvWZceDcPTgxFMDPChvNpqwIMn1tnC5NlEZzCXkx0ETQ.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/AQOytVcDNXyxNBalUSeRSOXUsLdsKBcb0SOptjDuQRZkiVLnWyKewsLL9x9oD0cy7E2yNKxQ_HMes1PAYaeCndfVoAIF-70TYdFdCokQdGlIrg.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/Donation of Fruits for orphans.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/Shab E barat Iftaari by orphans at ali zaib orphan home.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-01-19 at 10.18.15 AM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-01-19 at 10.18.16 AM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.03 PM (2).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.03 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.04 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.04 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.05 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.05 PM (2).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.05 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.06 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.06 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.07 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.07 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.09 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.09 PM (2).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.09 PM (3).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.09 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.10 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.10 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.11 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.11 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.12 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.12 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.13 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.13 PM (2).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.13 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.14 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.14 PM (2).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.14 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.15 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.15 PM (2).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.15 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.16 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.16 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.17 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.17 PM (2).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.17 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.20 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.20 PM (2).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.20 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Image 2026-02-10 at 2.03.21 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Video 2026-01-24 at 1.52.41 PM (1).mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Video 2026-01-24 at 1.52.41 PM.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Video 2026-01-28 at 12.24.00 PM.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Video 2026-01-30 at 10.36.22 AM.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Video 2026-01-30 at 10.39.47 AM.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Life at Ali Zaib Orphan Home/WhatsApp Video 2026-01-30 at 10.40.06 AM.mp4', alt: 'Video', type: 'video' },] }, { title: 'News and media', media: [{ src: '/assets/Gallary/News and media/WhatsApp Video 2026-01-30 at 11.39.59 AM.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/News and media/WhatsApp Video 2026-01-30 at 11.39.59 AM1.mp4', alt: 'Video', type: 'video' },] }, { title: 'Recreational Visits', media: [{ src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.22 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.22 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.25 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.25 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.26 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.26 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.27 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.27 PM (2).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.27 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.28 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.28 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.29 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.30 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.30 PM (2).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.30 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.31 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.31 PM (2).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.31 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.32 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.32 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.33 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.33 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.34 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.34 PM (2).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.34 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.35 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.35 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.36 PM (1).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.36 PM (2).jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Image 2026-02-10 at 2.03.36 PM.jpeg', alt: 'Image', type: 'image' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Video 2026-02-10 at 2.03.17 PM.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Video 2026-02-10 at 2.03.20 PM.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Video 2026-02-10 at 2.03.22 PM.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Video 2026-02-10 at 2.03.25 PM.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Video 2026-02-10 at 2.03.26 PM.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Video 2026-02-10 at 2.03.28 PM.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Video 2026-02-10 at 2.03.29 PM.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Video 2026-02-10 at 2.03.31 PM.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Video 2026-02-10 at 2.03.33 PM.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Video 2026-02-10 at 2.03.34 PM.mp4', alt: 'Video', type: 'video' }, { src: '/assets/Gallary/Recreational Visits/WhatsApp Video 2026-02-10 at 2.04.21 PM.mp4', alt: 'Video', type: 'video' },] }];

const INITIAL_VISIBLE = 8;
const LOAD_STEP = 8;

function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [visibleCounts, setVisibleCounts] = useState(() =>
    SECTIONS.map((section) => Math.min(INITIAL_VISIBLE, section.media.length))
  );

  const handleLoadMore = (sectionIndex) => {
    setVisibleCounts((prev) =>
      prev.map((count, index) => {
        if (index !== sectionIndex) return count;
        return Math.min(count + LOAD_STEP, SECTIONS[sectionIndex].media.length);
      })
    );
  };

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
              {section.media.slice(0, visibleCounts[sectionIndex]).map((item, index) => (
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

            {visibleCounts[sectionIndex] < section.media.length && (
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-outline-success rounded-pill px-4"
                  onClick={() => handleLoadMore(sectionIndex)}
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
