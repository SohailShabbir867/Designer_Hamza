import { motion } from "framer-motion";
import { FaPalette, FaPhotoVideo, FaPenNib, FaInstagram } from "react-icons/fa";
import { MdOutlineDesignServices, MdBrandingWatermark } from "react-icons/md";

const smoothEase = [0.25, 0.46, 0.45, 0.94];

const hobbies = [
  {
    icon: FaPalette,
    gradient: "from-orange-500/20 to-pink-500/10",
    iconColor: "text-orange-400",
    ringColor: "group-hover:border-orange-400/40",
    shadowColor: "group-hover:shadow-orange-500/10",
    title: "Graphic Design & Visual Creativity",
    highlight: "Canva · Adobe Photoshop · Adobe Illustrator",
    description: [
      "I enjoy creating visually appealing designs for brands, social media, and marketing.",
      "I focus on clean layouts, color balance, and modern design trends.",
    ],
  },
  {
    icon: FaInstagram,
    gradient: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-pink-400",
    ringColor: "group-hover:border-pink-400/40",
    shadowColor: "group-hover:shadow-pink-500/10",
    title: "Social Media Content Creation",
    highlight: "Canva · CapCut · Reels & Stories",
    description: [
      "I design engaging posts, reels, and short-form content for social media platforms.",
      "I focus on creating content that attracts attention and increases engagement.",
    ],
  },
  {
    icon: FaPhotoVideo,
    gradient: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-cyan-400",
    ringColor: "group-hover:border-cyan-400/40",
    shadowColor: "group-hover:shadow-cyan-500/10",
    title: "Photo Editing & Manipulation",
    highlight: "Adobe Photoshop · Lightroom",
    description: [
      "I work on photo retouching, background editing, and creative manipulations.",
      "I enjoy transforming simple images into high-quality visuals.",
    ],
  },
  {
    icon: MdBrandingWatermark,
    gradient: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
    ringColor: "group-hover:border-emerald-400/40",
    shadowColor: "group-hover:shadow-emerald-500/10",
    title: "Branding & Identity Design",
    highlight: "Adobe Illustrator · Logo Design · Canva",
    description: [
      "I explore logo design, brand identity, and creative concepts.",
      "This helps me build strong visual communication and professional design skills.",
    ],
  },
  {
    icon: MdOutlineDesignServices,
    gradient: "from-accent/20 to-orange-400/10",
    iconColor: "text-accent",
    ringColor: "group-hover:border-accent/40",
    shadowColor: "group-hover:shadow-accent/10",
    title: "Ebook & Workbook Design",
    highlight: "Adobe InDesign · Canva · Photoshop",
    description: [
      "I design professional ebooks, workbooks, and lead magnets for digital products.",
      "Clean typography, structured layouts, and premium finishes define my work.",
    ],
  },
  {
    icon: FaPenNib,
    gradient: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-400",
    ringColor: "group-hover:border-violet-400/40",
    shadowColor: "group-hover:shadow-violet-500/10",
    title: "Typography & Layout Exploration",
    highlight: "InDesign · Illustrator · Figma",
    description: [
      "I constantly explore font pairings, hierarchy, and creative layouts.",
      "Typography is the backbone of my design — every detail matters.",
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: smoothEase },
  }),
};

const Hobbies = () => {
  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-2">
      {hobbies.map((item, index) => {
        const IconComp = item.icon;
        return (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className={`p-5 transition-all duration-300 border group rounded-2xl bg-dark-100 border-dark-200 ${item.ringColor} hover:shadow-xl ${item.shadowColor} sm:p-6`}
          >
            {/* Icon box with gradient bg */}
            <motion.div
              whileHover={{ rotate: -8, scale: 1.12 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${item.gradient} border border-white/5 shadow-inner`}
            >
              <IconComp className={`w-5 h-5 sm:w-6 sm:h-6 ${item.iconColor}`} />
            </motion.div>

            <h3 className="mb-1 text-base font-bold text-white font-display sm:text-lg">
              {item.title}
            </h3>
            <p className={`mb-3 text-[10px] font-semibold sm:text-xs ${item.iconColor} opacity-80`}>
              {item.highlight}
            </p>
            <ul className="space-y-2 sm:space-y-2.5">
              {item.description.map((desc, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-gray-400 sm:text-sm">
                  <span className={`mt-0.5 flex-shrink-0 text-base leading-none font-bold ${item.iconColor}`}>▸</span>
                  {desc}
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Hobbies;
