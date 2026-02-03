import React from 'react';

function ExecutiveDirectorMessage() {
  return (
    <section className="py-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0 rounded-3 overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
              <div className="card-body p-5">
                <div className="row align-items-center">
                  <div className="col-md-4 text-center mb-4 mb-md-0">
                    <img
                      src="/assets/images/5.jpeg" // Placeholder for CEO picture; replace with actual path
                      alt="Syed Shahid Ali Zaidi - Executive Director"
                      className="img-fluid rounded-circle shadow"
                      style={{ width: '150px', height: '150px', objectFit: 'cover', border: '5px solid #28a745' }}
                    />
                  </div>
                  <div className="col-md-8">
                    <h2 className="card-title text-success mb-4 fw-bold">Message from the Executive Director</h2>
                    <p className="card-text lead mb-4 text-dark">
                      At Ali Zaib Orphan Home, we shelter children who have lost their families and childhoods and now carry silent pain and grief no child should endure. Each child arrives with a story of heartbreak, loneliness, and dreams stolen before they could even take root. Through education, nutritious meals, healthcare, and emotional support, we strive to turn their tears into smiles and their pain into strength. Every child deserves a chance to grow with dignity and love, and we are committed to giving them that chance.
                    </p>
                    <p className="card-text lead mb-4 text-dark">
                      We invite all compassionate hearts, donors, and volunteers to join us in transforming lives and building a future filled with hope for those who need it most.
                    </p>
                    <div className="text-end">
                      <p className="mb-0 fw-bold text-success fs-5">Syed Shahid Ali Zaidi</p>
                      <p className="mb-0 text-muted">Executive Director, Ali Zaib Orphan Home</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExecutiveDirectorMessage;
