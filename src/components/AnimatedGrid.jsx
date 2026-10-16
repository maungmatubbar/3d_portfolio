import React from "react";

// Decorative animated grid backdrop: a slowly drifting grid, drifting aurora
// blobs and sweeping scan beams. Purely presentational (aria-hidden) and
// GPU-composited. `variant="subtle"` drops the beams for calmer, contained use.
const AnimatedGrid = ({ variant = "full", className = "" }) => (
  <div className={`animated-grid ${className}`} aria-hidden="true">
    <div className={`ag-grid ${variant === "subtle" ? "ag-grid--slow" : ""}`} />
    <span className="ag-aurora ag-aurora-1" />
    <span className="ag-aurora ag-aurora-2" />
    {variant === "full" && (
      <>
        <span className="ag-beam ag-beam-v" style={{ left: "28%" }} />
        <span className="ag-beam ag-beam-h" style={{ top: "40%" }} />
      </>
    )}
  </div>
);

export default AnimatedGrid;
