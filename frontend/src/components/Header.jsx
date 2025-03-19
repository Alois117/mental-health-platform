import { FaPhone, FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom"; 
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  return (
    <header>
      {/* Top Info Bar */}
      <div className="bg-gray-100 text-gray-700 text-sm py-2 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-yellow-500 mr-2 text-lg" />
            <span>Westside Towers, Nairobi, Kenya</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-yellow-500 mr-2 text-lg" />
            <span>hello@amanicare.com</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
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
      <nav className="bg-[#1E3A5F] text-white py-4 px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <RouterLink to="/" className="hover:text-yellow-500 transition duration-300">
            Amanicare
          </RouterLink>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-lg">
          <li>
            <ScrollLink to="hero" smooth={true} duration={800} className="cursor-pointer hover:text-yellow-500 transition duration-300">
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="about" smooth={true} duration={800} className="cursor-pointer hover:text-yellow-500 transition duration-300">
              About Us
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="services" smooth={true} duration={800} className="cursor-pointer hover:text-yellow-500 transition duration-300">
              Services
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="blog" smooth={true} duration={800} className="cursor-pointer hover:text-yellow-500 transition duration-300">
              Blog
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="contact" smooth={true} duration={800} className="cursor-pointer hover:text-yellow-500 transition duration-300">
              Contact Us
            </ScrollLink>
          </li>
        </ul>

        {/* Sign In Button */}
        <RouterLink
          to="/login"
          className="ml-4 px-5 py-2 border border-white rounded-lg text-white transition duration-300 hover:bg-yellow-500 hover:text-black"
        >
          Sign In
        </RouterLink>
      </nav>
    </header>
  );
};

export default Header;