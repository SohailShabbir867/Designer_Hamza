import { motion } from "framer-motion";
import { Palette, Layers, Image, PenTool } from "lucide-react";

const smoothEase = [0.25, 0.46, 0.45, 0.94];

const hobbies = [
  {
    icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />,
    title: "Graphic Design & Visual Creativity",
    highlight: "Canva, Adobe Photoshop, Adobe Illustrator",
    description: [
      "I enjoy creating visually appealing designs for brands, social media, and marketing.",
      "I focus on clean layouts, color balance, and modern design trends.",
    ],
  },
  {
    icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />,
    title: "Social Media Content Creation",
    highlight: "Canva, CapCut",
    description: [
      "I design engaging posts, reels, and short-form content for social media platforms.",
      "I focus on creating content that attracts attention and increases engagement.",
    ],
  },
  {
    icon: <Image className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />,
    title: "Photo Editing & Manipulation",
    highlight: "Adobe Photoshop",
    description: [
      "I work on photo retouching, background editing, and creative manipulations.",
      "I enjoy transforming simple images into high-quality visuals.",
    ],
  },
  {
    icon: <PenTool className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />,
    title: "Branding & Creative Design Exploration",
    highlight: "Adobe Illustrator, Canva",
    description: [
      "I explore logo design, brand identity, and creative concepts.",
      "This helps me build strong visual communication and professional design skills.",
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: smoothEase,
    },
  }),
};

const Hobbies = () => {
  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
      {hobbies.map((item, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          whileHover={{ y: -6, transition: { duration: 0.3 } }}
          className="p-5 transition-all duration-300 border group rounded-2xl bg-dark-100 border-dark-200 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 sm:p-6"
        >
          <motion.div
            whileHover={{ rotate: -5, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center w-11 h-11 mb-3 transition-colors sm:w-12 sm:h-12 sm:mb-4 rounded-xl bg-accent/10 group-hover:bg-accent/15"
          >
            {item.icon}
          </motion.div>
          <h3 className="mb-1 text-base font-bold text-white font-display sm:text-lg">{item.title}</h3>
          <p className="mb-3 text-[10px] font-medium sm:text-xs text-accent/80">
            {item.highlight}
          </p>
          <ul className="space-y-1.5 sm:space-y-2">
            {item.description.map((desc, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-gray-400 sm:text-sm"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/40 flex-shrink-0" />
                {desc}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default Hobbies;
