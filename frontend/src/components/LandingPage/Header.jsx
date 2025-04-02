import { useState, useEffect } from "react";
import { FaPhone, FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom"; 
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Prevent scrolling when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        {/* Top Info Bar */}
        <div className="bg-gray-100 text-gray-700 text-sm px-4 flex justify-between items-center py-2">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-yellow-500 mr-2 text-lg" />
              <span>Westside Towers, Nairobi, Kenya</span>
            </div>
            <div className="hidden md:flex items-center">
              <FaEnvelope className="text-yellow-500 mr-2 text-lg" />
              <span>hello@amanicare.com</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-yellow-500 transition duration-300" />
            </a>
            <a href="https://X.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-yellow-500 transition duration-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-yellow-500 transition duration-300" />
            </a>
            <a href="tel:+254711840122" className="flex items-center space-x-2">
              <FaPhone className="hover:text-yellow-500 transition duration-300" />
              <span>+254-711-840-122</span>
            </a>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className={`w-full px-6 flex justify-between items-center transition-all duration-300 ${isScrolled ? "bg-[#1E3A5F]/40 backdrop-blur-md py-3 shadow-md" : "bg-[#1E3A5F] py-4"}`}>
          {/* Logo */}
          <div className="text-2xl font-bold text-white">
            <RouterLink to="/" className="hover:text-yellow-500 transition duration-300">
              Amanicare
            </RouterLink>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex space-x-6 text-lg text-white">
            <li><ScrollLink to="hero" smooth={true} duration={800} className="cursor-pointer hover:text-yellow-500 transition duration-300">Home</ScrollLink></li>
            <li><ScrollLink to="about" smooth={true} duration={800} className="cursor-pointer hover:text-yellow-500 transition duration-300">About Us</ScrollLink></li>
            <li><ScrollLink to="services" smooth={true} duration={800} className="cursor-pointer hover:text-yellow-500 transition duration-300">Services</ScrollLink></li>
            <li><ScrollLink to="blog" smooth={true} duration={800} className="cursor-pointer hover:text-yellow-500 transition duration-300">Blog</ScrollLink></li>
            <li><ScrollLink to="contact" smooth={true} duration={800} className="cursor-pointer hover:text-yellow-500 transition duration-300">Contact Us</ScrollLink></li>
          </ul>

          {/* Sign In Button (Hidden on Mobile) */}
          <RouterLink
            to="/login"
            className="hidden md:block ml-4 px-5 py-2 border border-white rounded-lg text-white transition duration-300 hover:bg-yellow-500 hover:text-black"
          >
            Sign In
          </RouterLink>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-black bg-opacity-70 z-40 transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="absolute top-0 left-0 w-3/4 max-w-sm h-full bg-[#1E3A5F] overflow-y-auto">
            <button className="absolute top-4 right-4 text-white text-3xl" onClick={() => setIsMenuOpen(false)}>
              <FaTimes />
            </button>
            <div className="flex flex-col items-center justify-center h-full space-y-6 text-white text-xl">
              <ScrollLink to="hero" smooth={true} duration={800} className="cursor-pointer hover:text-yellow-500 transition duration-300" onClick={() => setIsMenuOpen(false)}>Home</ScrollLink>
              <ScrollLink to="about" smooth={true} duration={800} className="cursor-pointer hover:text-yellow-500 transition duration-300" onClick={() => setIsMenuOpen(false)}>About Us</ScrollLink>
              <ScrollLink to="services" smooth={true} duration={800} className="cursor-pointer hover:text-yellow-500 transition duration-300" onClick={() => setIsMenuOpen(false)}>Services</ScrollLink>
              <ScrollLink to="blog" smooth={true} duration={800} className="cursor-pointer hover:text-yellow-500 transition duration-300" onClick={() => setIsMenuOpen(false)}>Blog</ScrollLink>
              <ScrollLink to="contact" smooth={true} duration={800} className="cursor-pointer hover:text-yellow-500 transition duration-300" onClick={() => setIsMenuOpen(false)}>Contact Us</ScrollLink>
              <RouterLink to="/login" className="border border-white px-5 py-2 rounded-lg text-white transition duration-300 hover:bg-yellow-500 hover:text-black" onClick={() => setIsMenuOpen(false)}>Sign In</RouterLink>
            </div>
          </div>
        </div>
      </header>

      {/* Adjust top padding to prevent content from being hidden */}
      <div className="pt-24"></div>
    </>
  );
};

export default Header;
