import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0c2025] text-gray-300 py-10 px-6 md:px-16 mt-16 border-t border-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">eCart</h2>
          <p className="text-sm leading-relaxed">
            Discover trendy and comfortable fashion that fits your lifestyle.
            Style that inspires, quality that lasts.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/collections" className="hover:text-white">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="hover:text-white">FAQs</a>
            </li>
            <li>
              <a className="hover:text-white">Shipping & Returns</a>
            </li>
            <li>
              <a className="hover:text-white">Privacy Policy</a>
            </li>
            <li>
              <a className="hover:text-white">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Get in Touch
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <MdMail size={18} />
            <span className="text-sm">support@ecart.com</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <FaSquarePhone size={18} />
            <span className="text-sm">+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-4">
            <a className="hover:text-white">
              <FaFacebookSquare size={20} />
            </a>
            <a className="hover:text-white">
              <FaInstagram size={20} />
            </a>
            <a className="hover:text-white">
              <FaTwitterSquare size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} eCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
