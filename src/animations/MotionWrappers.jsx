import { motion } from "framer-motion"; // eslint-disable-line

// Premium easing curve
const smoothEase = [0.25, 0.46, 0.45, 0.94];

// Fade up animation for sections
export const FadeUp = ({
  children,
  delay = 0,
  duration = 0.7,
  className = "",
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration, delay, ease: smoothEase }}
    className={className}
  >
    {children}
  </motion.div>
);

// Fade in from left
export const FadeLeft = ({
  children,
  delay = 0,
  duration = 0.7,
  className = "",
}) => (
  <motion.div
    initial={{ opacity: 0, x: -60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration, delay, ease: smoothEase }}
    className={className}
  >
    {children}
  </motion.div>
);

// Fade in from right
export const FadeRight = ({
  children,
  delay = 0,
  duration = 0.7,
  className = "",
}) => (
  <motion.div
    initial={{ opacity: 0, x: 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration, delay, ease: smoothEase }}
    className={className}
  >
    {children}
  </motion.div>
);

// Scale up animation
export const ScaleUp = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration, delay, ease: smoothEase }}
    className={className}
  >
    {children}
  </motion.div>
);

// Stagger container for children animations
export const StaggerContainer = ({
  children,
  staggerDelay = 0.12,
  className = "",
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: staggerDelay } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Individual stagger item with hover
export const StaggerItem = ({ children, className = "" }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: smoothEase },
      },
    }}
    whileHover={{ y: -6, transition: { duration: 0.3 } }}
    className={className}
  >
    {children}
  </motion.div>
);

// Smooth fade in (for contact, general sections)
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.8,
  className = "",
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);
