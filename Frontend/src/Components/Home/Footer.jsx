import React from "react";
import { FaPhoneAlt, FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa";
import "./footer.css";

const Footer = ({ isDarkMode }) => {
  return (
    <div className="flex flex-col justify-center items-center my-5 md:my-0 lg:my-6">
      <h3 className={"text-xl font-light mb-3 ${isDarkMode ? 'text-black' : 'text-white'}"}>
        LET'S CONNECT
      </h3>
      <p className={"text-sm font-light mb-3 ${isDarkMode ? 'text-black' : 'text-white'} text-center px-4"}>
        I'm always open to artworks, collaboration, commissions, or just a chat
        about art!
      </p>
      <div className="flex space-x-4">
        <a href="tel:+917034349362" className="text-xl" aria-label="Phone">
          <FaPhoneAlt className={"${isDarkMode ? 'text-black' : 'text-white'} hover:text-gray-500"} />
        </a>
        <a href="https://www.instagram.com/abijith_e_a" target="_blank" rel="noopener noreferrer" className="text-xl" aria-label="Instagram">
          <FaInstagram className={"${isDarkMode ? 'text-black' : 'text-white'} hover:text-gray-500"} />
        </a>
        <a href="https://www.youtube.com/@abijith.e.a" target="_blank" rel="noopener noreferrer" className="text-xl" aria-label="YouTube">
          <FaYoutube className={"${isDarkMode ? 'text-black' : 'text-white'} hover:text-gray-500"} />
        </a>
        <a href="mailto:eaabijith3@gmail.com" target="_blank" rel="noopener noreferrer" className="text-xl" aria-label="Email">
          <FaEnvelope className={"${isDarkMode ? 'text-black' : 'text-white'} hover:text-gray-500"} />
        </a>
      </div>
      <div className={"mt-5 text-sm ${isDarkMode ? 'text-black' : 'text-white'}"}>
        © {new Date().getFullYear()} Abijith E.A. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
