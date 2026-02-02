import { useState } from 'react';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: '/src/assets/images/hero-image/1.png', alt: 'Hero Image 1' },
    { src: '/src/assets/images/hero-image/2.png', alt: 'Hero Image 2' },
    { src: '/src/assets/images/hero-image/3.png', alt: 'Hero Image 3' },
    // Add more images as needed
  ];

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="container py-5">
        <h2 className="text-center mb-4">Gallery</h2>
        <div className="row">
          {images.map((image, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="card">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="card-img-top img-fluid"
                  style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => openModal(image)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedImage.alt}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body text-center">
                <img src={selectedImage.src} alt={selectedImage.alt} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Gallery;
