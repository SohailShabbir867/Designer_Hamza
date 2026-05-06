import { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

// Lazy load below-the-fold sections
const About = lazy(() => import("./about/About"));
const Experience = lazy(() => import("./pages/Experience"));
const DesignGallery = lazy(() => import("./pages/DesignGallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// Minimal fallback that doesn't cause layout shift
const SectionFallback = () => (
  <div className="flex items-center justify-center w-full py-20">
    <div className="w-8 h-8 border-2 rounded-full border-accent border-t-transparent animate-spin" />
  </div>
);

// Main portfolio page
const PortfolioPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>
        <Home />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <DesignGallery />
          <Experience />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route
          path="/post-design-mydesignposthere"
          element={
            <Suspense fallback={<SectionFallback />}>
              <AdminDashboard />
            </Suspense>
          }
        />
      </Routes>
    </LazyMotion>
  );
}

export default App;
