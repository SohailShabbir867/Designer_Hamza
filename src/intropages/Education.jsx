import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const smoothEase = [0.25, 0.46, 0.45, 0.94];

const educationData = [
  {
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
    degree: "Intermediate in FSc Pre-Engineering",
    institution: "Al Quaid Boys and Girls College",
    date: "2019 – 2021",
    description: [
      "Studied Mathematics and Physics for engineering preparation.",
      "Achieved high grades and actively engaged in science clubs.",
    ],
  },
  {
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
      {educationData.map((edu, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            delay: index * 0.12,
            duration: 0.6,
            ease: smoothEase,
          }}
          whileHover={{ y: -4, transition: { duration: 0.3 } }}
          className="relative p-5 transition-all duration-300 border group rounded-2xl bg-dark-100 border-dark-200 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 sm:p-6 lg:p-8"
        >
          {/* Timeline dot */}
          <div className="absolute w-3 h-3 rounded-full -left-1.5 top-8 bg-accent hidden lg:block shadow-lg shadow-accent/30" />

          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-start md:gap-5">
            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/10 group-hover:bg-accent/15 transition-colors"
            >
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
            </motion.div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="mb-1 text-lg font-bold text-white font-display sm:text-xl">
                {edu.degree}
              </h3>
              <p className="mb-1 text-xs font-medium sm:text-sm text-accent">
                {edu.institution}
              </p>
              <p className="mb-3 text-[10px] font-medium text-gray-600 sm:text-xs sm:mb-4">
                {edu.date}
              </p>
              <ul className="space-y-2">
                {edu.description.map((desc, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                    className="flex items-start gap-2 text-xs text-gray-400 sm:text-sm"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/50 flex-shrink-0" />
                    {desc}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Education;
