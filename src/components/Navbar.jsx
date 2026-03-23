import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useCart } from '../contexts/CartContext.jsx';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Skin Analysis', href: '/skin-analysis' },
    { name: 'Skin Test', href: '/skin-test' },
    { name: 'Skin Care Routine', href: '/skin-care-routine' },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-white/60 bg-white/85 backdrop-blur-xl">
      <div className="page-container px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[72px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-8">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold tracking-tight text-pink-600">
                Noorify
              </Link>
            </div>
            <div className="hidden lg:flex lg:items-center lg:gap-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-pink-50 text-pink-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex lg:items-center">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/cart"
                  className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                  aria-label="Open cart"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute right-0 top-0 inline-flex h-5 min-w-[1.25rem] -translate-y-1/3 translate-x-1/3 items-center justify-center rounded-full bg-pink-600 px-1.5 text-[11px] font-bold leading-none text-white">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <Link
                  to="/profile"
                  className="btn-ghost"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-secondary px-4 py-2.5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="btn-ghost"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary px-4 py-2.5"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            {user && (
              <Link
                to="/cart"
                className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                aria-label="Open cart"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute right-0 top-0 inline-flex h-5 min-w-[1.25rem] -translate-y-1/3 translate-x-1/3 items-center justify-center rounded-full bg-pink-600 px-1.5 text-[11px] font-bold leading-none text-white">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} border-t border-slate-200 bg-white lg:hidden`}>
        <div className="page-container px-4 py-4 sm:px-6">
          <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-pink-50 text-pink-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          </div>
        <div className="mt-4 border-t border-slate-200 pt-4">
          {user ? (
            <div className="space-y-2">
              <Link
                to="/profile"
                className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Login in
              </Link>
              <Link
                to="/signup"
                className="btn-primary flex w-full"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
