import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Eye, Sparkles, ExternalLink } from "lucide-react";
import { FadeUp } from "../animations/MotionWrappers";
import { API_BASE } from "../data/constants";

const smoothEase = [0.25, 0.46, 0.45, 0.94];

const DesignGallery = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [likedDesigns, setLikedDesigns] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("likedDesigns") || "[]");
    } catch {
      return [];
    }
  });
  const [activeFilter, setActiveFilter] = useState("All");
  const [heartAnimating, setHeartAnimating] = useState(null);

  const categories = [
    "All", "Branding", "Social Media", "Ebook", "Workbook",
    "Company Profile", "Lead Magnet", "Planner", "Flyer", "Poster", "Brochure", "Other",
  ];

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      const res = await fetch(`${API_BASE}/designs`);
      if (res.ok) {
        const data = await res.json();
        setDesigns(data);
      }
    } catch (err) {
      console.error("Failed to fetch designs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (designId) => {
    if (likedDesigns.includes(designId)) return;
    setHeartAnimating(designId);
    setTimeout(() => setHeartAnimating(null), 600);
    try {
      const res = await fetch(`${API_BASE}/designs/${designId}/like`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setDesigns((prev) => prev.map((d) => (d._id === designId ? { ...d, likes: data.likes } : d)));
        const updated = [...likedDesigns, designId];
        setLikedDesigns(updated);
        localStorage.setItem("likedDesigns", JSON.stringify(updated));
      }
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  const filteredDesigns = activeFilter === "All"
    ? designs
    : designs.filter((d) => d.category === activeFilter);

  if (loading) {
    return (
      <section id="gallery" className="relative w-full py-20 lg:py-28 bg-dark-50">
        <div className="absolute top-0 left-0 right-0 section-divider" />
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 rounded-full border-accent border-t-transparent animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="relative w-full py-20 lg:py-28 bg-dark-50">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full border border-accent/[0.05] w-[500px] h-[500px] -top-32 -right-40" />
        <div className="absolute rounded-full border border-dashed border-accent/[0.03] w-[350px] h-[350px] top-1/2 -left-28" />
        <div className="absolute rounded-full border border-accent/[0.04] w-[250px] h-[250px] bottom-20 right-20" />
        <motion.div
          className="absolute w-[400px] h-[400px] bg-accent/[0.02] rounded-full blur-[120px] top-1/3 left-1/2 -translate-x-1/2"
          animate={{ scale: [1, 1.1, 1], opacity: [0.02, 0.04, 0.02] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container relative max-w-6xl px-5 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <FadeUp>
          <div className="mb-14 text-center sm:mb-16">
            <h2 className="mb-4 font-display text-section gradient-text">
              Design Gallery
            </h2>
            <p className="max-w-2xl mx-auto text-xs text-gray-500 sm:text-sm">
              Explore my latest design work — like the ones you love!
            </p>
            <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-accent to-accent-light" />
          </div>
        </FadeUp>

        {/* Category Filters */}
        {designs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-12"
          >
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 text-[10px] font-medium font-display rounded-full transition-all duration-300 sm:px-4 sm:py-2 sm:text-xs ${
                  activeFilter === cat
                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                    : "bg-dark-100 text-gray-500 border border-dark-200 hover:border-accent/30 hover:text-gray-300"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {designs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="flex flex-col items-center justify-center py-16 text-center sm:py-20"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center justify-center w-16 h-16 mb-5 sm:w-20 sm:h-20 sm:mb-6 rounded-2xl bg-accent/10"
            >
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
            </motion.div>
            <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl font-display">
              Coming Soon
            </h3>
            <p className="max-w-md text-xs text-gray-500 sm:text-sm">
              Fresh designs are being crafted. Check back soon to see the latest creative work!
            </p>
          </motion.div>
        )}

        {/* Design Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDesigns.map((design, index) => (
              <motion.div
                key={design._id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.08, duration: 0.6, ease: smoothEase }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative overflow-hidden transition-all duration-500 border group rounded-2xl bg-dark-100 border-dark-200 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/8"
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden cursor-pointer h-60 sm:h-72 lg:h-80 bg-dark-200"
                  onClick={() => setSelectedDesign(design)}
                >
                  <img
                    src={`${API_BASE.replace('/api', '')}${design.image}`}
                    alt={design.title}
                    loading="lazy"
                    className="object-contain w-full h-full transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-dark via-dark/40 to-transparent group-hover:opacity-100" />

                  {/* View overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white sm:text-sm rounded-xl bg-accent/80 backdrop-blur-sm font-display">
                      <Eye size={15} />
                      View
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-bold text-white transition-colors font-display line-clamp-1 group-hover:text-accent sm:text-lg lg:text-xl">
                      {design.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(design._id);
                      }}
                      disabled={likedDesigns.includes(design._id)}
                      className="flex items-center gap-1 flex-shrink-0 transition-all duration-300 sm:gap-1.5"
                    >
                      <Heart
                        size={16}
                        className={`transition-all duration-300 ${
                          likedDesigns.includes(design._id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-500 hover:text-red-400"
                        } ${heartAnimating === design._id ? "heart-beat" : ""}`}
                      />
                      <span className="text-[10px] font-medium text-gray-500 sm:text-xs">
                        {design.likes}
                      </span>
                    </button>
                  </div>

                  <p className="mb-3 text-xs text-gray-400 line-clamp-2 sm:text-sm">
                    {design.description}
                  </p>

                  {design.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3 sm:gap-1.5">
                      {design.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-[10px] font-semibold rounded-md text-accent bg-accent/8 border border-accent/12 sm:px-2.5 sm:py-1 sm:text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* View Design Button */}
                  {design.viewUrl && (
                    <a
                      href={design.viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center w-full gap-2 py-2.5 mt-1 text-xs font-semibold text-white transition-all duration-300 rounded-lg sm:text-sm bg-accent/90 hover:bg-accent hover:shadow-lg hover:shadow-accent/20 font-display"
                    >
                      <ExternalLink size={12} />
                      View Design
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedDesign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedDesign(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: smoothEase }}
              className="relative w-full max-w-4xl overflow-hidden border rounded-2xl bg-dark border-dark-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedDesign(null)}
                className="absolute z-10 flex items-center justify-center w-9 h-9 text-white transition-colors rounded-full sm:w-10 sm:h-10 top-3 right-3 sm:top-4 sm:right-4 bg-dark/80 backdrop-blur-sm hover:bg-accent"
              >
                <X size={18} />
              </button>

              <div className="max-h-[50vh] sm:max-h-[60vh] overflow-hidden">
                <img
                  src={`${API_BASE.replace('/api', '')}${selectedDesign.image}`}
                  alt={selectedDesign.title}
                  className="object-contain w-full h-full"
                />
              </div>

              <div className="p-4 sm:p-5 lg:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="text-lg font-bold text-white font-display sm:text-xl lg:text-2xl">
                    {selectedDesign.title}
                  </h3>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Heart
                      size={18}
                      className={
                        likedDesigns.includes(selectedDesign._id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-500"
                      }
                    />
                    <span className="text-xs font-medium text-gray-400 sm:text-sm">
                      {selectedDesign.likes}
                    </span>
                  </div>
                </div>
                <p className="mb-3 text-xs leading-relaxed text-gray-400 sm:mb-4 sm:text-sm">
                  {selectedDesign.description}
                </p>
                {selectedDesign.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedDesign.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-[10px] font-semibold rounded-lg text-accent bg-accent/10 border border-accent/15 sm:px-3 sm:py-1.5 sm:text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-[10px] text-gray-600 sm:text-xs">
                    Category: {selectedDesign.category}
                  </p>
                  {selectedDesign.viewUrl && (
                    <a
                      href={selectedDesign.viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white transition-all duration-300 rounded-lg sm:text-sm bg-accent hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25 font-display"
                    >
                      <ExternalLink size={14} />
                      View Design
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DesignGallery;
