import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Intro from "../intropages/Intro";
import Education from "../intropages/Education";
import Hobbies from "../intropages/Hobbies";
import { Skills } from "../intropages/Skills";
import { FadeUp } from "../animations/MotionWrappers";

const sections = [
  { id: "intro", label: "Intro", component: <Intro /> },
  { id: "education", label: "Education", component: <Education /> },
  { id: "skills", label: "Skills", component: <Skills /> },
  { id: "hobbies", label: "Hobbies", component: <Hobbies /> },
];

const About = () => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        { threshold: 0.4, rootMargin: "-100px 0px -100px 0px" },
      );
      if (ref) observer.observe(ref);
      return observer;
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section id="about" className="relative w-full py-20 lg:py-28 bg-dark">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="container max-w-6xl px-5 mx-auto sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeUp>
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-section gradient-text">
              About Me
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-accent to-accent-light" />
          </div>
        </FadeUp>

        <div className="relative lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
          {/* Sticky side navigation */}
          <div className="hidden lg:block">
            <div className="sticky space-y-1 top-28">
              {sections.map((sec, i) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(i)}
                  className={`group flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm font-medium font-display transition-all duration-300 ${
                    activeIndex === i
                      ? "bg-accent/10 text-accent"
                      : "text-gray-500 hover:text-gray-300 hover:bg-dark-50"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === i
                        ? "bg-accent scale-125"
                        : "bg-gray-600 group-hover:bg-gray-400"
                    }`}
                  />
                  {sec.label}
                </button>
              ))}

              {/* Progress line */}
              <div className="relative h-40 ml-[11px] mt-4">
                <div className="absolute w-px h-full bg-dark-200" />
                <motion.div
                  className="absolute w-px bg-accent"
                  animate={{
                    height: `${((activeIndex + 1) / sections.length) * 100}%`,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Mobile pill indicator */}
          <div className="flex items-center justify-center gap-2 mb-10 lg:hidden">
            {sections.map((sec, i) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(i)}
                className={`relative px-3 py-2 text-xs font-medium font-display rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "text-white bg-accent shadow-lg shadow-accent/25"
                    : "text-gray-400 bg-dark-100 border border-dark-200 hover:border-accent/30"
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>

          {/* Sections */}
          <div ref={containerRef} className="space-y-24 lg:space-y-32">
            {sections.map((sec, i) => (
              <motion.div
                key={sec.id}
                ref={(el) => (sectionRefs.current[i] = el)}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              >
                {/* Section label */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-8 h-px bg-accent" />
                  <span className="text-xs font-semibold tracking-widest uppercase font-display text-accent">
                    {sec.label}
                  </span>
                </div>
                {sec.component}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
