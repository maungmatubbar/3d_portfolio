import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Footer,
  Hero,
  Navbar,
  StarsCanvas,
  Tech,
  Works,
} from "./components";

const App = () => {
  return (
    <div className="relative z-0 app-bg">
      <Navbar />
      <Hero />

      <main className="relative z-10">
        <About />
        <Experience />
        <Works />
        <Tech />
        <Feedbacks />

        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
