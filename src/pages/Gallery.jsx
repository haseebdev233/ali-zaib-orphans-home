import { useState, useRef, useEffect } from 'react';

const MEDIA = [
  // Hero images (prefer WebP variants)
  { src: '/assets/images-webp/1.webp', alt: 'Hero Image 1', type: 'image' },
  { src: '/assets/images-webp/2.webp', alt: 'Hero Image 2', type: 'image' },
  { src: '/assets/images-webp/3.webp', alt: 'Hero Image 3', type: 'image' },
  { src: '/assets/images-webp/4.webp', alt: 'Hero Image 4', type: 'image' },
  { src: '/assets/images-webp/5.webp', alt: 'Hero Image 5', type: 'image' },
  { src: '/assets/images-webp/6.webp', alt: 'Hero Image 6', type: 'image' },
  { src: '/assets/images-webp/7.webp', alt: 'Hero Image 7', type: 'image' },
  { src: '/assets/images-webp/hadees.webp', alt: 'Hadees Image', type: 'image' },
  // Gallery images
  { src: '/assets/images/1.jpeg', alt: 'Gallery Image 1', type: 'image' },
  { src: '/assets/images/2.jpeg', alt: 'Gallery Image 2', type: 'image' },
  { src: '/assets/images/3.jpeg', alt: 'Gallery Image 3', type: 'image' },
  { src: '/assets/images/5.jpeg', alt: 'Gallery Image 5', type: 'image' },
  { src: '/assets/images/6.jpeg', alt: 'Gallery Image 6', type: 'image' },
  { src: '/assets/images/7.jpeg', alt: 'Gallery Image 7', type: 'image' },
  // CEO image (prefer WebP)
  { src: '/assets/images-webp/ceo.webp', alt: 'CEO Image', type: 'image' },
  // Logo
  { src: '/assets/images/Ali-zaib-Logo.webp', alt: 'Ali Zaib Logo', type: 'image' },
  // Videos
  { src: '/assets/videos/city-41.mp4', alt: 'City Video 41', type: 'video' },
  { src: '/assets/videos/wats-1.mp4', alt: 'Wats Video 1', type: 'video' },
  { src: '/assets/videos/wats-2.mp4', alt: 'Wats Video 2', type: 'video' },
  { src: '/assets/videos/wats-3.mp4', alt: 'Wats Video 3', type: 'video' },
  { src: '/assets/videos/wats-4.mp4', alt: 'Wats Video 4', type: 'video' },
  { src: '/assets/videos/wats-5.mp4', alt: 'Wats Video 5', type: 'video' },
  { src: '/assets/videos/wats-6.mp4', alt: 'Wats Video 6', type: 'video' },
  { src: '/assets/videos/wats-7.mp4', alt: 'Wats Video 7', type: 'video' },
];

function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [loadedVideos, setLoadedVideos] = useState(new Set());
  const videoRefs = useRef([]);


  const openModal = (mediaItem) => {
    setSelectedMedia(mediaItem);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'));
            if (MEDIA[index] && MEDIA[index].type === 'video') {
              setLoadedVideos(prev => new Set(prev).add(index));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    videoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="container py-5">
        <h2 className="text-center text-bold text-success mb-4">GALLERY</h2>
        <div className="row">
          {MEDIA.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="card">
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className={`card-img-top img-fluid gallery-image ${loadedImages.has(index) ? 'loaded' : ''}`}
                    style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => openModal(item)}
                    onLoad={() => handleImageLoad(index)}
                    loading="lazy"
                    width="300"
                    height="200"
                  />
                ) : (
                  <div style={{ position: 'relative' }} ref={(el) => (videoRefs.current[index] = el)} data-index={index}>
                    {loadedVideos.has(index) ? (
                      <video
                        src={item.src}
                        className="card-img-top"
                        style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                        onClick={() => openModal(item)}
                        muted
                        preload="metadata"
                      />
                    ) : (
                      <div style={{ height: '200px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span>Loading...</span>
                      </div>
                    )}
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontSize: '48px',
                        opacity: 0.8,
                        pointerEvents: 'none',
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

      {selectedMedia && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedMedia.alt}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body text-center">
                {selectedMedia.type === 'image' ? (
                  <img src={selectedMedia.src} alt={selectedMedia.alt} className="img-fluid" />
                ) : (
                  <video src={selectedMedia.src} controls className="img-fluid" />
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

