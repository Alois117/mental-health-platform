// Header.js
import { FaPhone, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-[#1E3A5F] text-white py-3 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <p className="text-sm">📍 Twin Towers ., Nairobi City, Parklands 23</p>
        <p className="text-sm">✉ hello@amanicare.com</p>
      </div>
      <div className="flex items-center space-x-4">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="hover:text-yellow-400 transition duration-300" />
        </a>
        <a href="https://X.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="hover:text-yellow-400 transition duration-300" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-yellow-400 transition duration-300" />
        </a>
        <a href="tel:+254711840122">
          <FaPhone className="hover:text-yellow-400 transition duration-300" />
        </a>
        <p>+254-711-840-122</p>
      </div>
    </header>
  );
};

export default Header;
