import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Lightweight count-up that fires once when scrolled into view.
// Keeps decimals (e.g. 99.9) and wraps the value with prefix/suffix.
const Counter = ({
  to = 0,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
  className = "",
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    let raf;
    let start;
    const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic

    const tick = (now) => {
      if (start === undefined) start = now;
      const progress = Math.min((now - start) / duration, 1);
      setValue(from + (to - from) * ease(progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, from, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default Counter;
