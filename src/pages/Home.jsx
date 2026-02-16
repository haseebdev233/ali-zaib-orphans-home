import { lazy, Suspense } from "react";
import Hero from "../Components/Hero";
import LazySection from "../Components/LazySection";

const WhoWeAre = lazy(() => import("../Components/WhoWeAre"));
const ButtonsSection = lazy(() => import("../Components/ButtonsSection"));
const PremiumJoinSection = lazy(() => import("../Components/JoinSection"));
const ExecutiveDirectorMessage = lazy(() => import("../Components/ExecutiveDirectorMessage"));
const Services = lazy(() => import("../Components/Services"));
const PowerSection = lazy(() => import("../Components/PowerSection"));


function Home() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <Hero />
      <LazySection minHeight={320}>
        <Suspense fallback={null}>
          <WhoWeAre />
        </Suspense>
      </LazySection>
      <LazySection minHeight={200}>
        <Suspense fallback={null}>
          <ButtonsSection />
        </Suspense>
      </LazySection>
      <LazySection minHeight={520}>
        <Suspense fallback={null}>
          <PremiumJoinSection />
        </Suspense>
      </LazySection>
      <LazySection minHeight={520}>
        <Suspense fallback={null}>
          <ExecutiveDirectorMessage />
        </Suspense>
      </LazySection>
      <LazySection minHeight={520}>
        <Suspense fallback={null}>
          <Services />
        </Suspense>
      </LazySection>
      <LazySection minHeight={320}>
        <Suspense fallback={null}>
          <PowerSection />
        </Suspense>
      </LazySection>
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-4">
              <h2 className="fw-bold text-success">Bank Details</h2>
              <p className="text-muted mb-0">You can donate directly using the details below.</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="p-4 rounded-3 border bg-white h-100">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3 p-2 rounded bg-warning text-white">
                    <i className="bi bi-phone fs-4"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">JazzCash Wallet</h6>
                    <small className="text-muted">Mobile Wallet Transfer</small>
                  </div>
                </div>
                <div className="mb-3">
                  <small className="text-muted">JazzCash Number:</small>
                  <div className="fw-bold">0321 9920015</div>
                </div>
                <div className="mb-3">
                  <small className="text-muted">Account Title:</small>
                  <div className="fw-bold">Ali Zaib Orphan Home</div>
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <small className="text-muted">Till ID:</small>
                    <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => copyToClipboard('982298606')}
                    >
                      <i className="bi bi-copy me-1"></i>
                      Copy
                    </button>
                  </div>
                  <div className="fw-bold">9 8 2 2 9 8 6 0 6</div>
                  <small className="text-muted d-block mt-1">
                    Dial <strong>*786*10#</strong> and enter <strong>TILL ID</strong> to pay via JazzCash account.
                  </small>
                </div>
                <div className="text-center mt-3">
                  <p className="fw-bold text-warning mb-2">QR Payments Accepted</p>
                  <img
                    src="/assets/donate/Till-id.jpeg"
                    alt="JazzCash QR Code - Till ID 982298606"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxWidth: '280px', border: '3px solid #f5c518' }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="p-4 rounded-3 border bg-white h-100">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3 p-2 rounded bg-primary text-white">
                    <i className="bi bi-bank fs-4"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">BankIslami</h6>
                    <small className="text-muted">Bank Account Transfer</small>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <small className="text-muted">Account Number:</small>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => copyToClipboard('218500047820005')}
                    >
                      <i className="bi bi-copy me-1"></i>
                      Copy
                    </button>
                  </div>
                  <div className="fw-bold">218500047820005</div>
                </div>
                <div className="mb-3">
                  <small className="text-muted">IBAN Number:</small>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="fw-bold">PK73BKIP0218500047820005</div>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => copyToClipboard('PK73BKIP0218500047820005')}
                    >
                      <i className="bi bi-copy me-1"></i>
                      Copy
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <small className="text-muted">Account Title:</small>
                  <div className="fw-bold">Ali Zaib Foundation (Orphan Home)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
