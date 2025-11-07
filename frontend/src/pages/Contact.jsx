import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import Footer from "../components/Footer.jsx";
import Title from "../components/Title.jsx";

const Contact = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-linear-to-l from-[#141414] to-[#0c2025] text-gray-300">
      <section className="text-center py-24 px-6 md:px-16">
        <Title text1={"Contact"} text2={"US"} />
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Have a question, feedback, or collaboration idea? We'd love to hear
          from you — drop us a message or reach out directly.
        </p>
      </section>

      <section className="w-full py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-[#0f1c1f] p-8 rounded-2xl shadow-md border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Send us a message
            </h2>
            <form className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-[#141b1d] border border-gray-700 text-gray-200 focus:outline-none focus:border-teal-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-[#141b1d] border border-gray-700 text-gray-200 focus:outline-none focus:border-teal-400"
              />
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full p-3 rounded-lg bg-[#141b1d] border border-gray-700 text-gray-200 focus:outline-none focus:border-teal-400"
              ></textarea>
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center bg-[#0f1c1f] p-8 rounded-2xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Contact Information
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <MdMail size={20} className="text-teal-400" />
              <span>support@ecart.com</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <FaSquarePhone size={20} className="text-teal-400" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 mb-8">
              <FaMapMarkerAlt size={20} className="text-teal-400" />
              <span>Gurugram, Haryana, India</span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex items-center gap-5">
              <a className="hover:text-teal-400">
                <FaFacebookSquare size={22} />
              </a>
              <a className="hover:text-teal-400">
                <FaInstagram size={22} />
              </a>
              <a className="hover:text-teal-400">
                <FaTwitterSquare size={22} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
