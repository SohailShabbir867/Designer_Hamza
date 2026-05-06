import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { FadeUp } from "../animations/MotionWrappers";

const smoothEase = [0.25, 0.46, 0.45, 0.94];

const experienceData = [
  {
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
            {experienceData.map((job, index) => (
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
                  className="absolute z-10 hidden w-4 h-4 transform -translate-x-1/2 border-4 rounded-full lg:block left-1/2 bg-accent border-dark shadow-lg shadow-accent/30"
                />

                {/* Card */}
                <div className="w-full lg:w-[calc(50%-2rem)]">
                  <motion.div
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    className="p-5 transition-all duration-300 border group rounded-2xl bg-dark-100 border-dark-200 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 sm:p-6 lg:p-8"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="flex items-center justify-center flex-shrink-0 w-11 h-11 transition-colors sm:w-12 sm:h-12 rounded-xl bg-accent/10 group-hover:bg-accent/15"
                      >
                        <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                      </motion.div>
                      <div>
                        <h3 className="mb-1 text-base font-bold text-white sm:text-lg font-display">
                          {job.title}
                        </h3>
                        <p className="text-xs font-medium sm:text-sm text-accent">
                          {job.company}
                        </p>
                        <p className="mb-3 text-[10px] text-gray-600 sm:text-xs sm:mb-4">{job.date}</p>
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
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/40 flex-shrink-0" />
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
