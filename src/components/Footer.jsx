import { Link } from 'react-router-dom';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  GlobeAltIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="page-container px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Noorify</h3>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Modern skincare guidance, curated products, and personalized routines designed to make healthy skin feel approachable.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="badge bg-white/10 text-white">
                <SparklesIcon className="mr-1.5 h-4 w-4" />
                Tailored routines
              </span>
              <span className="badge bg-white/10 text-white">
                <ShieldCheckIcon className="mr-1.5 h-4 w-4" />
                Trusted essentials
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link to="/" className="text-slate-400 transition hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 transition hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/skin-test" className="text-slate-400 transition hover:text-white">
                  Skin Test
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-slate-400 transition hover:text-white">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start">
                <EnvelopeIcon className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400" />
                <span className="text-slate-400">support@noorify.com</span>
              </li>
              <li className="flex items-start">
                <PhoneIcon className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400" />
                <span className="text-slate-400">+91 84488 43999</span>
              </li>
              <li className="flex items-start">
                <MapPinIcon className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400" />
                <span className="text-slate-400">123 Wellness Lane, San Francisco, CA</span>
              </li>
              <li className="flex items-start">
                <ClockIcon className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400" />
                <span className="text-slate-400">Mon to Fri, 9:00 AM to 6:00 PM</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Explore</h3>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Browse best sellers, build a personalized routine, and checkout confidently from any device.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://github.com/lostinnlight/Skincare_jsx.git"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                aria-label="Open repository"
              >
                <GlobeAltIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            © {currentYear} Noorify. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Built for personalized skincare shopping and guidance.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex h-10 w-10 items-center justify-center self-start rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white sm:self-auto"
            aria-label="Scroll to top"
          >
            <ArrowUpIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
