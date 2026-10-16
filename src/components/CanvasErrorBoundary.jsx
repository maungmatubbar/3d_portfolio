import React from "react";

// Guards the Three.js canvases. If WebGL is unavailable (older devices,
// disabled GPU, headless browsers) the 3D scene throws on mount — without
// this boundary that error would blank the entire page. Here it degrades
// gracefully to a soft gradient placeholder so the site always renders.
class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    // Keep it quiet in production; useful while developing.
    if (import.meta.env.DEV) console.warn("3D canvas disabled:", error?.message);
  }

  render() {
    if (this.state.failed) {
      return (
        this.props.fallback ?? (
          <div className="w-full h-full grid place-items-center">
            <div className="w-40 h-40 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(124,92,255,0.5),rgba(79,240,197,0.15),transparent_70%)] blur-xl animate-float" />
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default CanvasErrorBoundary;
