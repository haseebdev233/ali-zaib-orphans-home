import { useEffect, useRef, useState } from "react";

function LazySection({ children, minHeight = 200, rootMargin = "200px 0px" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (isVisible) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div ref={ref} style={{ minHeight }} className="cv-auto">
      {isVisible ? children : <div className="section-skeleton" aria-hidden="true" />}
    </div>
  );
}

export default LazySection;
