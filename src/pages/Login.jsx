import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext.jsx';
import { login as loginApi } from '../services/authService.js';

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextErrors.email = 'Enter a valid email address.';
    if (formData.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setError('');

    try {
      const { token, user } = await loginApi(formData);
      setToken(token);
      setUser(user);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (name) => `input-base ${errors[name] ? 'input-error' : ''}`;

  return (
    <div className="page-shell flex items-center">
      <div className="page-container">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="hidden rounded-[2rem] bg-gradient-to-br from-rose-900 via-pink-700 to-rose-500 p-10 text-white lg:block">
            <span className="badge bg-white/15 text-white ring-1 ring-white/20">Member access</span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight">Welcome back to Noorify</h1>
            <p className="mt-4 text-sm leading-7 text-rose-50/90">
              Sign in to view your profile, continue your skincare journey, and manage your cart from any device.
            </p>
            <div className="mt-10 space-y-4">
              {[
                'Review previous orders and personalized routines.',
                'Access a cleaner cart and checkout experience.',
                'Jump back into the skin test anytime.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-white" />
                  <p className="text-sm text-rose-50/90">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="surface-card mx-auto w-full max-w-xl p-6 sm:p-8">
            <div className="text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Sign in</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Access your account to continue shopping and manage your skincare profile.
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
              {error && <div className="status-banner status-banner-error">{error}</div>}

              <div>
                <label htmlFor="email" className="field-label">Email address</label>
                <div className="relative">
                  <UserIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${fieldClass('email')} pl-11`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="field-label">Password</label>
                <div className="relative">
                  <KeyIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`${fieldClass('password')} pl-11 pr-12`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-pink-600 focus:ring-pink-500" />
                  Remember me
                </label>
                <span className="text-sm text-slate-400">Forgot password?</span>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="font-semibold text-pink-600 transition hover:text-pink-700">
                Create one
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
