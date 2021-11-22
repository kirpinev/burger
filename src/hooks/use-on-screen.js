import { useState, useEffect, useRef } from "react";

export const useOnScreen = (ref) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(([entry]) =>
      setIsIntersecting(entry.isIntersecting)
    );

    observer.current.observe(ref.current);

    return () => {
      observer.current.disconnect();
    };
  }, [ref]);

  return isIntersecting;
};
