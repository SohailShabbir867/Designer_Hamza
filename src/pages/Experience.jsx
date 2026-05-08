import { motion } from "framer-motion";
import { MdWorkHistory, MdOutlineDesignServices } from "react-icons/md";
import { FaBriefcase, FaStar } from "react-icons/fa";
import { FadeUp } from "../animations/MotionWrappers";

const smoothEase = [0.25, 0.46, 0.45, 0.94];

const experienceData = [
  {
    icon: FaBriefcase,
    gradient: "from-accent/20 to-orange-400/10",
    iconColor: "text-accent",
    dotColor: "bg-accent",
    ringColor: "hover:border-accent/30",
    shadowColor: "hover:shadow-accent/5",
    badge: "Full-time · Remote",
    title: "Graphic Designer",
    company: "Freelancing (Fiverr)",
    date: "October 2022 – Present",
    description: [
      "Delivering high-quality graphic design services to clients worldwide, specializing in ebooks, workbooks, lead magnets, flyers, posters, brochures, and company profiles.",
      "Creating visually engaging social media content and marketing materials to boost brand presence.",
      "Designing clean, modern layouts using Adobe Photoshop, Adobe Illustrator, and Canva.",
      "Managing multiple client projects, ensuring timely delivery and satisfaction.",
      "Continuously improving design skills by following latest trends and creative techniques.",
    ],
  },
  {
    icon: MdOutlineDesignServices,
    gradient: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-400",
    dotColor: "bg-violet-400",
    ringColor: "hover:border-violet-400/30",
    shadowColor: "hover:shadow-violet-500/5",
    badge: "Internship · On-site",
    title: "Graphic Design Intern",
    company: "Enigmatix Pvt Ltd.",
    date: "October 2022 – 2023",
    description: [
      "Assisted in designing marketing materials, social media posts, and branding assets.",
      "Created and edited visuals using Photoshop, Illustrator, Canva, and CapCut.",
      "Collaborated on creative concepts, layouts, and visual strategies.",
      "Supported design projects while maintaining consistency in brand identity.",
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="relative w-full py-20 lg:py-28 bg-dark">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full border border-accent/[0.04] w-[400px] h-[400px] -top-20 -left-40" />
        <div className="absolute rounded-full border border-dashed border-accent/[0.03] w-[300px] h-[300px] bottom-10 -right-20" />
      </div>

      <div className="container relative max-w-6xl px-5 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <FadeUp>
          <div className="mb-14 text-center sm:mb-16">
            <h2 className="mb-4 font-display text-section gradient-text">
              My Experience
            </h2>
            <p className="text-xs text-gray-500 sm:text-sm">
              Professional roles and creative contributions
            </p>
            <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-accent to-accent-light" />
          </div>
        </FadeUp>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute hidden w-px h-full transform -translate-x-1/2 lg:block left-1/2 bg-dark-200" />

          <div className="space-y-8 sm:space-y-10">
            {experienceData.map((job, index) => {
              const IconComp = job.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: index * 0.2, duration: 0.7, ease: smoothEase }}
                  className={`relative flex flex-col lg:flex-row ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-6 sm:gap-8`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.4, ease: smoothEase }}
                    className={`absolute z-10 hidden w-4 h-4 transform -translate-x-1/2 border-4 rounded-full lg:block left-1/2 ${job.dotColor} border-dark shadow-lg`}
                  />

                  {/* Card */}
                  <div className="w-full lg:w-[calc(50%-2rem)]">
                    <motion.div
                      whileHover={{ y: -5, transition: { duration: 0.3 } }}
                      className={`p-5 transition-all duration-300 border group rounded-2xl bg-dark-100 border-dark-200 ${job.ringColor} hover:shadow-xl ${job.shadowColor} sm:p-6 lg:p-8`}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        {/* Icon */}
                        <motion.div
                          whileHover={{ rotate: 8, scale: 1.12 }}
                          transition={{ duration: 0.3 }}
                          className={`flex items-center justify-center flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${job.gradient} border border-white/5 shadow-inner`}
                        >
                          <IconComp className={`w-5 h-5 sm:w-6 sm:h-6 ${job.iconColor}`} />
                        </motion.div>

                        <div className="flex-1">
                          {/* Badge */}
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 mb-2 text-[10px] font-semibold rounded-full bg-dark-200 border border-dark-300 ${job.iconColor}`}>
                            <FaStar className="w-2.5 h-2.5" />
                            {job.badge}
                          </span>
                          <h3 className="mb-0.5 text-base font-bold text-white sm:text-lg font-display">
                            {job.title}
                          </h3>
                          <p className={`text-xs font-semibold sm:text-sm ${job.iconColor}`}>
                            {job.company}
                          </p>
                          <p className="mb-3 text-[10px] text-gray-600 sm:text-xs sm:mb-4">
                            📅 {job.date}
                          </p>
                          <ul className="space-y-1.5 sm:space-y-2">
                            {job.description.map((desc, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: 15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                                className="flex items-start gap-2 text-xs text-gray-400 sm:text-sm"
                              >
                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${job.iconColor} opacity-60`} />
                                {desc}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="hidden w-full lg:block lg:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
