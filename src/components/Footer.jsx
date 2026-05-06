import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { SOCIAL_LINKS } from "../data/constants";

const navLinks = ["Home", "About", "Gallery", "Experience", "Contact"];

const socials = [
  { icon: <FaInstagram size={17} />, href: SOCIAL_LINKS.instagram },
  { icon: <FaLinkedin size={17} />, href: SOCIAL_LINKS.linkedin },
  { icon: <FaFacebook size={17} />, href: SOCIAL_LINKS.facebook },
  { icon: <HiOutlineMail size={17} />, href: SOCIAL_LINKS.email },
];

const scrollToSection = (e, id) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Footer = () => {
  return (
    <footer className="relative py-10 border-t sm:py-12 bg-dark border-dark-200/50">
      <div className="container flex flex-col items-center gap-6 px-5 mx-auto max-w-7xl sm:px-6 lg:px-8 md:flex-row md:justify-between sm:gap-8">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "home")}
          className="text-lg font-extrabold tracking-tight font-display sm:text-xl"
        >
          <span className="text-white">DESIGNER</span>{" "}
          <span className="text-accent">HAMZA</span>
        </a>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={(e) => scrollToSection(e, link.toLowerCase())}
              className="text-xs text-gray-500 transition-colors duration-300 sm:text-sm hover:text-white"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-2 sm:gap-3">
          {socials.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 text-gray-500 transition-all duration-300 border sm:w-9 sm:h-9 rounded-lg border-dark-200 hover:text-accent hover:border-accent/40"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 text-[10px] text-center text-gray-600 sm:mt-8 sm:text-xs">
        &copy; {new Date().getFullYear()} Designer Hamza. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
