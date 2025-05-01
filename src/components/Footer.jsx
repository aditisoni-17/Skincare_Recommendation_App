import { Link } from 'react-router-dom';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ScreenCare</h3>
            <p className="text-gray-400">
              Your trusted partner in screen protection and eye care solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/screen-test" className="text-gray-400 hover:text-white">
                  Screen Test
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-400">support@screencare.com</span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-400">+918448843999</span>
              </li>
              <li className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-400">123 Screen Care Ave, San Francisco, CA</span>
              </li>
              <li className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-400">Mon-Fri: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <ChatBubbleLeftRightIcon className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <ChatBubbleLeftRightIcon className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <ChatBubbleLeftRightIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">
              © {currentYear} ScreenCare. All rights reserved.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-400 hover:text-white"
            >
              <ArrowUpIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 