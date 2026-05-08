import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Send, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { FadeUp } from "../animations/MotionWrappers";
import { SOCIAL_LINKS, SITE_DATA } from "../data/constants";

// ── EmailJS config ──
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const smoothEase = [0.25, 0.46, 0.45, 0.94];

const Contact = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    const name    = form.current.name.value.trim();
    const email   = form.current.email.value.trim();
    const message = form.current.message.value.trim();
    if (!name)             errors.name    = "Name is required";
    else if (name.length < 2) errors.name = "Name must be at least 2 characters";
    if (!email)            errors.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email";
    if (!message)          errors.message = "Message is required";
    else if (message.length < 10) errors.message = "Message must be at least 10 characters";
    return errors;
  };

  const sendForm = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      document.getElementById(Object.keys(errors)[0])?.focus();
      return;
    }
    setIsLoading(true);
    setNotification(null);
    setFormErrors({});

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_PUBLIC_KEY
      );
      setNotification({ type: "success", message: "Message sent successfully! ✅" });
      form.current.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      setNotification({
        type: "error",
        message: "Failed to send. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name } = e.target;
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  const contactInfo = [
    { icon: Mail,   label: "Email",    value: SITE_DATA.email },
    { icon: Phone,  label: "Phone",    value: SITE_DATA.phone },
    { icon: MapPin, label: "Location", value: SITE_DATA.location },
  ];

  const socials = [
    { icon: FaInstagram,  href: SOCIAL_LINKS.instagram, label: "Instagram" },
    { icon: FaLinkedin,   href: SOCIAL_LINKS.linkedin,  label: "LinkedIn"  },
    { icon: FaFacebook,   href: SOCIAL_LINKS.facebook,  label: "Facebook"  },
    { icon: HiOutlineMail,href: SOCIAL_LINKS.email,     label: "Email"     },
  ];

  const inputClasses = (field) =>
    `w-full px-4 py-3 text-sm rounded-xl bg-dark border transition-all duration-300 text-white placeholder-gray-600 focus:outline-none sm:py-3.5 ${
      formErrors[field] ? "border-red-500/60" : "border-dark-200 focus:border-accent"
    }`;

  return (
    <section id="contact" className="relative w-full py-20 lg:py-28 bg-dark-50">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full border border-accent/[0.04] w-[350px] h-[350px] top-10 -right-32" />
        <div className="absolute rounded-full border border-dashed border-accent/[0.03] w-[250px] h-[250px] -bottom-10 left-10" />
        <motion.div
          className="absolute w-[300px] h-[300px] bg-accent/[0.02] rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.15, 1], opacity: [0.02, 0.04, 0.02] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container relative max-w-6xl px-5 mx-auto sm:px-6 lg:px-8">
        <FadeUp>
          <div className="mb-14 text-center sm:mb-16">
            <h2 className="mb-4 font-display text-section gradient-text">
              Let&apos;s Create Together
            </h2>
            <p className="text-xs text-gray-500 sm:text-sm">
              Have a design project in mind? Let&apos;s bring it to life
            </p>
            <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-accent to-accent-light" />
          </div>
        </FadeUp>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="space-y-7 lg:col-span-2 sm:space-y-8"
          >
            <div className="space-y-4 sm:space-y-5">
              {contactInfo.map((item, i) => {
                const IconComp = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: smoothEase }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="flex items-center gap-4 cursor-default"
                  >
                    <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-accent/10 text-accent">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-gray-600 uppercase tracking-wider sm:text-xs">
                        {item.label}
                      </p>
                      <p className="text-xs text-white sm:text-sm">{item.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div>
              <p className="mb-3 text-xs font-medium text-gray-500 sm:text-sm sm:mb-4">Follow me</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {socials.map((social, i) => {
                  const SocialIcon = social.icon;
                  return (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center w-9 h-9 text-gray-500 transition-all duration-300 border sm:w-10 sm:h-10 rounded-xl border-dark-200 hover:text-accent hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10"
                    >
                      <SocialIcon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: smoothEase }}
            className="lg:col-span-3"
          >
            <form
              ref={form}
              onSubmit={sendForm}
              className="p-5 space-y-4 border sm:p-6 rounded-2xl bg-dark border-dark-200 lg:p-8 sm:space-y-5"
            >
              {notification && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`p-3 text-sm font-medium text-center rounded-xl sm:p-4 ${
                    notification.type === "success"
                      ? "bg-green-500/10 text-green-400 border border-green-500/15"
                      : "bg-red-500/10 text-red-400 border border-red-500/15"
                  }`}
                >
                  {notification.message}
                </motion.div>
              )}

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    className={inputClasses("name")}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.name && (
                    <span className="block mt-1 text-[10px] text-red-400 sm:text-xs">{formErrors.name}</span>
                  )}
                </div>
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    className={inputClasses("email")}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.email && (
                    <span className="block mt-1 text-[10px] text-red-400 sm:text-xs">{formErrors.email}</span>
                  )}
                </div>
              </div>

              <div>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Tell me about your design project..."
                  className={inputClasses("message")}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.message && (
                  <span className="block mt-1 text-[10px] text-red-400 sm:text-xs">{formErrors.message}</span>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center w-full gap-2 py-3 text-sm font-semibold text-white transition-all duration-300 font-display rounded-xl bg-accent hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-accent/25 sm:py-3.5"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
