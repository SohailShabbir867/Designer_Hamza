import { motion } from "framer-motion";
import Profile from "../assets/profile.webp";

const infoItems = [
  { label: "Name", value: "Designer Hamza" },
  { label: "Email", value: "hr59281@gmail.com" },
  { label: "Phone", value: "+92 303 9219730" },
  { label: "Country", value: "Pakistan" },
  { label: "City", value: "Bahawalpur" },
];

const smoothEase = [0.25, 0.46, 0.45, 0.94];

const Intro = () => {
  return (
    <div className="grid items-center grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="flex justify-center"
      >
        <div className="relative group">
          {/* Background glow */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/12 via-transparent to-accent/8 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="w-[220px] h-[300px] sm:w-[260px] sm:h-[340px] md:w-[280px] md:h-[380px] rounded-2xl overflow-hidden border border-dark-300 group-hover:border-accent/30 transition-all duration-500 shadow-2xl shadow-black/40"
          >
            <img
              src={Profile}
              alt="Designer Hamza"
              width={300}
              height={420}
              loading="lazy"
              className="object-cover w-full h-full brightness-110 contrast-[1.12] saturate-[0.9] transition-all duration-700 group-hover:scale-105 group-hover:brightness-[1.15]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent" />
          </motion.div>

          {/* Decorative corners */}
          <div className="absolute w-14 h-14 border-t-2 border-l-2 -top-3 -left-3 border-accent/60 rounded-tl-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute w-14 h-14 border-b-2 border-r-2 -bottom-3 -right-3 border-accent/60 rounded-br-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </motion.div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: smoothEase }}
      >
        <h3 className="mb-3 text-2xl font-bold text-white sm:text-3xl font-display">
          Who am I?
        </h3>
        <p className="mb-3 text-xs leading-relaxed text-gray-400 sm:text-sm">
          A passionate Graphic Designer dedicated to crafting visually compelling
          and impactful designs using Adobe Photoshop, Adobe Illustrator, Canva,
          and other modern creative tools. I specialize in creating engaging
          social media content that captures attention, strengthens brand
          identity, and drives audience interaction.
        </p>
        <p className="mb-6 text-xs leading-relaxed text-gray-400 sm:text-sm">
          With over 4 years of freelancing experience on Fiverr, I have
          successfully delivered a wide range of graphic design projects,
          including ebook design, workbooks, lead magnets, flyers, posters,
          brochures, and company profiles.
        </p>

        <div className="space-y-0">
          {infoItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: smoothEase }}
              className="flex items-center gap-4 py-3 border-b border-dark-200/60 last:border-0"
            >
              <span className="text-xs font-semibold font-display text-accent min-w-[70px] sm:min-w-[80px] sm:text-sm">
                {item.label}
              </span>
              <span className="text-xs text-gray-300 sm:text-sm">{item.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Intro;
