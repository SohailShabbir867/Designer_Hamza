import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Profile from "../assets/profile.webp";
import { SOCIAL_LINKS } from "../data/constants";

const Home = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  const roles = [
    "Creative Graphic Designer",
    "Brand Identity Specialist",
    "Social Media Content Creator",
    "Adobe Photoshop Expert",
    "Visual Storyteller",
  ];

  useEffect(() => {
    if (charIndex < roles[textIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + roles[textIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 65);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCharIndex(0);
        setDisplayedText("");
        setTextIndex((prev) => (prev + 1) % roles.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, textIndex]);

  const stats = [
    { value: "4+", label: "Years Experience" },
    { value: "100+", label: "Design Projects" },
    { value: "50+", label: "Happy Clients" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  // Floating design tool icons data
  const floatingTools = [
    { label: "Ps", color: "#31A8FF", x: "8%",  y: "12%", size: 44, duration: 7, delay: 0 },
    { label: "Ai", color: "#FF9A00", x: "4%",  y: "65%", size: 38, duration: 8, delay: 1 },
    { label: "Cn", color: "#00C4CC", x: "15%", y: "82%", size: 34, duration: 6, delay: 2 },
    { label: "Fg", color: "#A259FF", x: "92%", y: "15%", size: 36, duration: 9, delay: 0.5 },
    { label: "Id", color: "#FF3366", x: "88%", y: "70%", size: 32, duration: 7.5, delay: 1.5 },
    { label: "Pr", color: "#9999FF", x: "45%", y: "90%", size: 30, duration: 8.5, delay: 3 },
    { label: "Cc", color: "#00E5FF", x: "25%", y: "5%",  size: 28, duration: 6.5, delay: 2.5 },
  ];

  // Small orange dots scattered in background
  const orangeDots = [
    { x: "75%", y: "12%", size: 10 },
    { x: "55%", y: "85%", size: 7 },
    { x: "12%", y: "45%", size: 6 },
    { x: "85%", y: "50%", size: 8 },
    { x: "35%", y: "15%", size: 5 },
    { x: "65%", y: "60%", size: 6 },
  ];

  return (
    <section
      id="home"
      className="relative w-full min-h-[calc(100vh-64px)] md:min-h-screen flex items-center bg-dark overflow-hidden"
    >
      {/* ── Small Orange Dots ── */}
      {orangeDots.map((dot, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute rounded-full bg-accent"
          style={{
            width: dot.size,
            height: dot.size,
            left: dot.x,
            top: dot.y,
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── Floating Design Tool Icons ── */}
      {floatingTools.map((tool, i) => (
        <motion.div
          key={`tool-${i}`}
          className="absolute z-[1] flex items-center justify-center rounded-xl backdrop-blur-sm font-display font-bold"
          style={{
            left: tool.x,
            top: tool.y,
            width: tool.size,
            height: tool.size,
            fontSize: tool.size * 0.3,
            background: `${tool.color}12`,
            color: `${tool.color}`,
            border: `1px solid ${tool.color}25`,
            boxShadow: `0 0 20px ${tool.color}10`,
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, 6, -6, 0],
            rotate: [0, 4, -4, 0],
            opacity: [0.5, 0.85, 0.5],
          }}
          transition={{
            duration: tool.duration,
            repeat: Infinity,
            delay: tool.delay,
            ease: "easeInOut",
          }}
        >
          {tool.label}
        </motion.div>
      ))}

      {/* ── Subtle ambient glow ── */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent/[0.04] blur-[150px] rounded-full" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-accent/[0.03] blur-[120px] rounded-full" />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full px-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

          {/* ── LEFT — Text Content ── */}
          <motion.div
            className="order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={itemVariants}
              className="mb-2 text-sm tracking-wide text-gray-500 font-display sm:text-base"
            >
              Hi, I am
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="mb-2 font-display font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem] leading-[1.08] text-white"
            >
              Designer Hamza
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="mb-7 font-display font-bold text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] text-accent min-h-[2rem] sm:min-h-[2.5rem]"
            >
              {displayedText}
              <span className="animate-pulse">|</span>
            </motion.h2>

            {/* Social Icons */}
            <motion.div
              variants={itemVariants}
              className="flex items-center mb-7 space-x-3"
            >
              {[
                { icon: FaInstagram, href: SOCIAL_LINKS.instagram },
                { icon: FaLinkedin, href: SOCIAL_LINKS.linkedin },
                { icon: FaFacebook, href: SOCIAL_LINKS.facebook },
                { icon: HiOutlineMail, href: SOCIAL_LINKS.email },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-10 h-10 text-gray-400 transition-all duration-300 border rounded-full border-dark-300 hover:text-accent hover:border-accent/50"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 mb-10 sm:gap-4"
            >
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-7 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-full bg-accent hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/25 sm:px-8"
              >
                Hire Me
              </motion.a>
              <motion.a
                href="#gallery"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-7 py-3 text-sm font-semibold text-white transition-all duration-300 border rounded-full border-dark-300 hover:border-accent/50 hover:text-accent sm:px-8"
              >
                View My Designs
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex divide-x divide-dark-300"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="px-5 sm:px-6 first:pl-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.15, duration: 0.6 }}
                >
                  <p className="text-2xl font-extrabold font-display text-accent sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[10px] sm:text-xs text-gray-500 italic">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Profile Image with Large Circle ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex items-center justify-center order-1 lg:order-2"
          >
            <div className="relative">
              {/* ── Large Dark Circle (like reference) ── */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "clamp(280px, 55vw, 480px)",
                  height: "clamp(280px, 55vw, 480px)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "radial-gradient(circle, #1a1611 0%, #13110e 40%, #0d0b09 80%, transparent 100%)",
                }}
              />

              {/* ── Thin circle ring ── */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: "clamp(300px, 58vw, 510px)",
                  height: "clamp(300px, 58vw, 510px)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  border: "1px solid rgba(255, 102, 0, 0.08)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />

              {/* ── Second thin ring ── */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "clamp(320px, 62vw, 540px)",
                  height: "clamp(320px, 62vw, 540px)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  border: "1px dashed rgba(255, 102, 0, 0.04)",
                }}
              />

              {/* ── Profile Image ── */}
              <motion.img
                src={Profile}
                alt="Designer Hamza"
                width={450}
                height={450}
                fetchPriority="high"
                decoding="sync"
                className="relative z-10 w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] h-auto object-contain brightness-[1.12] contrast-[1.18] saturate-[0.88]"
                style={{
                  filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.7))",
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6 }}
              />

              {/* ── Bottom fade ── */}
              <div className="absolute bottom-0 left-0 right-0 z-20 h-24 bg-gradient-to-t from-dark via-dark/70 to-transparent" />

              {/* ── Small floating tool badges near profile ── */}
              <motion.div
                className="absolute z-20 flex items-center justify-center w-9 h-9 text-xs font-bold rounded-xl backdrop-blur-sm font-display top-4 right-4 sm:right-0"
                style={{ background: "#31A8FF15", color: "#31A8FF", border: "1px solid #31A8FF30" }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Ps
              </motion.div>
              <motion.div
                className="absolute z-20 flex items-center justify-center w-8 h-8 text-[10px] font-bold rounded-xl backdrop-blur-sm font-display bottom-28 -left-2 sm:-left-6"
                style={{ background: "#FF9A0015", color: "#FF9A00", border: "1px solid #FF9A0030" }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                Ai
              </motion.div>
              <motion.div
                className="absolute z-20 flex items-center justify-center rounded-xl backdrop-blur-sm font-display font-bold w-7 h-7 text-[9px] top-1/3 -right-4 sm:-right-8"
                style={{ background: "#A259FF15", color: "#A259FF", border: "1px solid #A259FF30" }}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                Fg
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute flex-col items-center hidden -translate-x-1/2 bottom-8 left-1/2 sm:flex"
      >
        <div className="flex items-start justify-center w-6 h-10 p-1 border-2 rounded-full border-accent/25">
          <motion.div
            className="w-1.5 h-3 rounded-full bg-accent"
            animate={{ y: [0, 18, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Home;
