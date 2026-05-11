import { motion } from "framer-motion";
import { HiAcademicCap } from "react-icons/hi2";
import { MdComputer, MdScience } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";

const smoothEase = [0.25, 0.46, 0.45, 0.94];

const educationData = [
  {
    icon: FaUniversity,
    gradient: "from-accent/20 to-orange-400/10",
    iconColor: "text-accent",
    ringColor: "hover:border-accent/30",
    shadowColor: "hover:shadow-accent/5",
    degree: "BS in Computer Science",
    institution: "The Islamia University of Bahawalpur",
    date: "2021 – 2025",
    description: [
      "Specializing in Graphic Design — Adobe Photoshop, Adobe Illustrator, Canva, and other creative tools.",
      "Creating real-world design projects including branding, social media content, and marketing visuals.",
      "Designing engaging social media posts and creative campaigns to boost audience interaction.",
      "Staying updated with latest design trends to deliver modern and impactful visuals.",
    ],
  },
  {
    icon: MdScience,
    gradient: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-cyan-400",
    ringColor: "hover:border-cyan-400/30",
    shadowColor: "hover:shadow-cyan-500/5",
    degree: "Intermediate in FSc Pre-Engineering",
    institution: "Al Quaid Boys and Girls College",
    date: "2019 – 2021",
    description: [
      "Studied Mathematics and Physics for engineering preparation.",
      "Achieved high grades and actively engaged in science clubs.",
    ],
  },
  {
    icon: MdComputer,
    gradient: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
    ringColor: "hover:border-emerald-400/30",
    shadowColor: "hover:shadow-emerald-500/5",
    degree: "Matriculation in Science",
    institution: "Al Badar Islamic High School Tail Wala",
    date: "2017 – 2019",
    description: [
      "Focused on Computer Science and general sciences.",
      "Participated in technology fairs and inter-school competitions.",
    ],
  },
];

const Education = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {educationData.map((edu, index) => {
        const IconComp = edu.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.12, duration: 0.6, ease: smoothEase }}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className={`relative p-5 transition-all duration-300 border group rounded-2xl bg-dark-100 border-dark-200 ${edu.ringColor} hover:shadow-lg ${edu.shadowColor} sm:p-6 lg:p-8`}
          >
            {/* Timeline dot */}
            <div className={`absolute w-3 h-3 rounded-full -left-1.5 top-8 hidden lg:block shadow-lg ${edu.iconColor}`}
              style={{ backgroundColor: "currentColor" }} />

            <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-start md:gap-5">
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 8, scale: 1.12 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center justify-center flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${edu.gradient} border border-white/5 shadow-inner`}
              >
                <IconComp className={`w-6 h-6 sm:w-7 sm:h-7 ${edu.iconColor}`} />
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="mb-1 text-lg font-bold text-white font-display sm:text-xl">
                  {edu.degree}
                </h3>
                <p className={`mb-1 text-xs font-semibold sm:text-sm ${edu.iconColor}`}>
                  {edu.institution}
                </p>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full bg-dark-200 border border-dark-300 text-gray-400`}>
                    📅 {edu.date}
                  </span>
                </div>
                <ul className="space-y-2 sm:space-y-2.5">
                  {edu.description.map((desc, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                      className="flex items-start gap-2.5 text-xs text-gray-400 sm:text-sm"
                    >
                      <span className={`mt-0.5 flex-shrink-0 text-base leading-none font-bold ${edu.iconColor}`}>▸</span>
                      {desc}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Education;
