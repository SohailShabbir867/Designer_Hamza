import { motion } from "framer-motion";
import {
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiCanva,
  SiAdobeindesign,
  SiFigma,
  SiAdobepremierepro,
} from "react-icons/si";
import { Film } from "lucide-react";

const smoothEase = [0.25, 0.46, 0.45, 0.94];

const skillsData = [
  { name: "Adobe Photoshop", icon: SiAdobephotoshop, color: "#31A8FF", level: 95 },
  { name: "Adobe Illustrator", icon: SiAdobeillustrator, color: "#FF9A00", level: 88 },
  { name: "Canva", icon: SiCanva, color: "#00C4CC", level: 92 },
  { name: "Adobe InDesign", icon: SiAdobeindesign, color: "#FF3366", level: 75 },
  { name: "Figma", icon: SiFigma, color: "#A259FF", level: 80 },
  { name: "CapCut", icon: Film, color: "#00E5FF", level: 70 },
  { name: "Premiere Pro", icon: SiAdobepremierepro, color: "#9999FF", level: 65 },
];

const Skills = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
      {skillsData.map((skill, index) => {
        const Icon = skill.icon;
        return (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.08,
              duration: 0.5,
              ease: smoothEase,
            }}
            whileHover={{ y: -8, scale: 1.05 }}
            className="flex flex-col items-center p-5 transition-all duration-300 border group rounded-2xl bg-dark-100 border-dark-200 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/8 sm:p-6"
          >
            {/* Icon */}
            <motion.div
              className="flex items-center justify-center w-14 h-14 mb-3 rounded-xl sm:w-16 sm:h-16"
              style={{
                background: `${skill.color}12`,
                border: `1px solid ${skill.color}25`,
              }}
              whileHover={{
                boxShadow: `0 0 30px ${skill.color}20`,
                scale: 1.1,
              }}
              transition={{ duration: 0.3 }}
            >
              <Icon
                size={28}
                className="sm:w-8 sm:h-8"
                style={{ color: skill.color }}
              />
            </motion.div>

            {/* Name */}
            <span className="mb-3 text-xs font-semibold text-center text-gray-400 transition-colors font-display group-hover:text-white sm:text-sm">
              {skill.name}
            </span>

            {/* Small progress bar under each skill */}
            <div className="w-full">
              <div className="h-1.5 overflow-hidden rounded-full bg-dark-200 sm:h-2">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                    boxShadow: `0 0 8px ${skill.color}25`,
                  }}
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    duration: 1,
                    ease: smoothEase,
                  }}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export { Skills };
