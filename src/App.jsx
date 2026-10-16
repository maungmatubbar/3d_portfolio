import {
  About,
  Approach,
  CanvasErrorBoundary,
  Contact,
  Education,
  Experience,
  Feedbacks,
  Footer,
  Hero,
  Navbar,
  ScrollProgress,
  SystemMap,
  StarsCanvas,
  Tech,
  Works,
} from "./components";

const App = () => {
  return (
    <div className="relative z-0 app-bg">
      <ScrollProgress />
      <Navbar />
      <Hero />

      <main className="relative z-10">
        <About />
        <SystemMap />
        <Approach />
        <Experience />
        <Education />
        <Works />
        <Tech />
        <Feedbacks />

        <div className="relative z-0">
          <Contact />
          <CanvasErrorBoundary fallback={null}>
            <StarsCanvas />
          </CanvasErrorBoundary>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
