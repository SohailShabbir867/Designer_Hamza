import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const navLinks = ["Home", "About", "Gallery", "Experience"];

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const sectionIds = ["home", "about", "gallery", "experience", "contact"];

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom > 150) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section — prevents router from intercepting
  const scrollToSection = useCallback((e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (isMenuOpen) setIsMenuOpen(false);
  }, [isMenuOpen, setIsMenuOpen]);

  // Don't show navbar on admin page
  if (location.pathname === "/hamza-design") return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dark/90 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-white/[0.03]"
          : "bg-dark md:bg-transparent"
      }`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "home")}
            className="relative z-10"
          >
            <span className="text-xl font-extrabold tracking-tight font-display sm:text-2xl">
              <span className="text-white">DESIGNER</span>{" "}
              <span className="text-accent">HAMZA</span>
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="items-center hidden space-x-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => scrollToSection(e, link.toLowerCase())}
                className={`relative text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                  activeSection === link.toLowerCase()
                    ? "text-accent"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link}
                {activeSection === link.toLowerCase() && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                  />
                )}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 rounded-xl bg-accent hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
            >
              Let&apos;s Create
            </a>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 flex flex-col items-center justify-center w-10 h-10 md:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white mb-1.5 transition-colors"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-white mb-1.5"
            />
            <motion.span
              animate={
                isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              className="block w-6 h-0.5 bg-white"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden border-t md:hidden bg-dark/95 backdrop-blur-xl border-white/[0.03]"
          >
            <div className="flex flex-col items-center py-8 space-y-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => scrollToSection(e, link.toLowerCase())}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`text-lg font-medium font-display tracking-wider transition-colors duration-300 ${
                    activeSection === link.toLowerCase()
                      ? "text-accent"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="px-6 py-2.5 mt-2 text-sm font-semibold text-white rounded-xl bg-accent hover:bg-accent-dark transition-all"
              >
                Let&apos;s Create
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
