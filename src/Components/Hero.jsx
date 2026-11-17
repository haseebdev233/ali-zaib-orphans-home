import SiteImage from './SiteImage';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TRANSITION_MS = 3000;
const INTERVAL_MS = 2500;

function Hero({ content }) {
  const slides = content.heroSlides;
  const slideCount = slides.length;
  const currentFallback = "/assets/hero-carousel/hero-01.jpeg";
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false);
  const saveData = navigator.connection?.saveData;
  const isSlowConnection = ['slow-2g', '2g'].includes(navigator.connection?.effectiveType);

  // Detect screen size for mobile adjustments
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event) => setPrefersReducedMotion(event.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      mediaQuery.addListener(handler);
    }
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, []);

  const shouldAnimate = !prefersReducedMotion && !saveData && !isSlowConnection;
  const visibleIndex = currentIndex % Math.max(1, slideCount);
  const nextIndex = (visibleIndex + 1) % Math.max(1, slideCount);
  const fallbackSlide = { src: currentFallback, fit: "cover", position: "center center" };
  const slide = slides[visibleIndex] ?? fallbackSlide;
  const nextSlide = slides[nextIndex] ?? fallbackSlide;

  useEffect(() => {
    if (!shouldAnimate || slideCount < 2) return;
    let transitionTimeout;
    const intervalTimeout = setTimeout(() => {
      setIsTransitioning(true);
      transitionTimeout = setTimeout(() => {
        setCurrentIndex(nextIndex);
        setIsTransitioning(false);
      }, TRANSITION_MS);
    }, INTERVAL_MS);

    return () => {
      clearTimeout(intervalTimeout);
      if (transitionTimeout) clearTimeout(transitionTimeout);
    };
  }, [nextIndex, shouldAnimate, slideCount]);

  // CSS custom properties for responsive values
  const parallaxIntensity = isMobile ? 0.5 : 1;

  return (
    <section
      className="hero-section text-white d-flex align-items-center"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        '--parallax-intensity': parallaxIntensity,
        paddingTop: isMobile ? '0px' : '90px', // 0 on mobile, 90px on desktop to account for navbar
      }}
    >
      <div
        className="hero-bg-fade"
        style={{
          position: 'absolute',
          top: '0',
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      >
        <SiteImage
          source={slide.src}
          fallback={currentFallback}
          alt="Hero background"
          aria-hidden="true"
          decoding="async"
          fetchPriority="high"
          loading="eager"
          width="1920"
          height="1080"
          sizes="100vw"
          className={`hero-carousel-img ${!isTransitioning ? 'active' : ''}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: slide.fit,
            objectPosition: slide.position,
          }}
        />
        <SiteImage
          source={nextSlide.src}
          fallback={currentFallback}
          alt=""
          aria-hidden="true"
          decoding="async"
          fetchPriority="auto"
          loading="lazy"
          width="1920"
          height="1080"
          sizes="100vw"
          className={`hero-carousel-img ${isTransitioning ? 'active' : ''}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: nextSlide.fit,
            objectPosition: nextSlide.position,
          }}
        />
      </div>
      <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
        <h1
          className="fw-bold text-danger display-5 fade-up"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,0,0.8), 0 0 20px rgba(255,255,0,0.6)' }}
        >
          {content.heroTitle}
        </h1>
        <p
          className="mt-3 text-center fs-3 fw-semibold fade-up delay-1"
          style={{ textShadow: '2px 2px 4px yellow'}}
        >
          {content.heroIntro}
        </p>
        <div className="mt-4 fade-up delay-2">
          <Link to="/donate" className="btn btn-success px-4 me-3 mb-2 rounded-pill fw-bold">
            <i className="bi bi-heart-fill me-2"></i>DONATE NOW
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
