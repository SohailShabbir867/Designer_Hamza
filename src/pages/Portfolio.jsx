import { motion } from "framer-motion";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "../animations/MotionWrappers";
import { ArrowUpRight, Eye } from "lucide-react";

const projects = [
  {
    title: "Lead Magnet Design",
    description:
      "Professionally designed lead magnets with clean layouts, modern typography, and visually engaging elements. Showcases a variety of lead magnet styles tailored for different niches and audiences.",
    tags: ["Canva", "Adobe Photoshop", "Adobe Illustrator"],
    color: "#FF6600",
  },
  {
    title: "Workbook Design",
    description:
      "Professionally designed workbooks with clean layouts, modern typography, and visually engaging elements. Created to support learning, exercises, and structured content across different niches.",
    tags: ["Canva", "Adobe Photoshop", "Adobe Illustrator"],
    color: "#FF8533",
  },
  {
    title: "Company Profile",
    description:
      "Professionally designed company profiles with clean layouts, modern typography, and visually engaging elements. Showcasing well-structured corporate presentations tailored to different industries.",
    tags: ["Canva", "Adobe Photoshop", "Adobe Illustrator"],
    color: "#FFB366",
  },
  {
    title: "Ebook Design",
    description:
      "Professionally designed ebooks with clean layouts, modern typography, and visually engaging elements. Showcases a variety of ebook styles tailored for different niches and audiences.",
    tags: ["Canva", "Adobe Photoshop", "Adobe Illustrator"],
    color: "#E65100",
  },
  {
    title: "Planner / Guide Design",
    description:
      "Professionally designed planners and guides with clean layouts, modern typography, and visually engaging elements. Showcases a variety of styles tailored for different niches and audiences.",
    tags: ["Canva", "Adobe Photoshop", "Adobe Illustrator"],
    color: "#FF6600",
  },
  {
    title: "Social Media Content",
    description:
      "Eye-catching social media posts, stories, and carousels designed to boost engagement and build brand identity across Instagram, Facebook, and LinkedIn.",
    tags: ["Canva", "CapCut", "Adobe Photoshop"],
    color: "#FF8533",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="w-full py-20 lg:py-28 bg-dark-100">
      <div className="container max-w-6xl px-6 mx-auto lg:px-8">
        {/* Header */}
        <FadeUp>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl gradient-text">
              My Projects
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              A collection of creative graphic design projects showcasing
              expertise in branding, social media content, and high-quality
              visual design
            </p>
            <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-accent" />
          </div>
        </FadeUp>

        {/* Projects Grid */}
        <StaggerContainer
          staggerDelay={0.15}
          className="grid gap-8 md:grid-cols-2"
        >
          {projects.map((project, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -8 }}
                className="relative overflow-hidden transition-all duration-500 border group rounded-2xl bg-dark border-dark-200 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 origin-left scale-x-0 bg-gradient-to-r from-accent via-accent-light to-accent group-hover:scale-x-100" />

                {/* Colored abstract header */}
                <div
                  className="relative h-56 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}15, ${project.color}05, #0D0D0D)`,
                  }}
                >
                  {/* Abstract design elements */}
                  <div className="absolute inset-0">
                    <motion.div
                      className="absolute w-32 h-32 rounded-full blur-[60px]"
                      style={{
                        background: `${project.color}20`,
                        top: "20%",
                        right: "10%",
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute w-20 h-20 rounded-full blur-[40px]"
                      style={{
                        background: `${project.color}15`,
                        bottom: "20%",
                        left: "15%",
                      }}
                      animate={{
                        scale: [1.1, 0.9, 1.1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    />
                  </div>

                  {/* Large project initial */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-[80px] font-extrabold opacity-10 select-none"
                      style={{ color: project.color }}
                    >
                      {project.title.charAt(0)}
                    </span>
                  </div>

                  {/* Project number badge */}
                  <div className="absolute flex items-center justify-center w-10 h-10 text-sm font-bold border rounded-full top-4 left-4 text-accent bg-dark/80 backdrop-blur-sm border-accent/30">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* View details overlay */}
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-lg bg-accent/90 backdrop-blur-sm border border-accent">
                      <Eye size={16} />
                      View Details
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className="transition-all duration-300 text-dark-300 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-gray-400">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-dark-200">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-xs font-semibold tracking-wide rounded-lg text-accent bg-accent/10 border border-accent/20 group-hover:border-accent/40 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export { Portfolio };
