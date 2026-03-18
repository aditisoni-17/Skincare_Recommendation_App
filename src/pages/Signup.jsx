import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  KeyIcon,
  FaceSmileIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext.jsx';
import { signup as signupApi } from '../services/authService.js';

const Signup = () => {
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    skinType: '',
    skinConcerns: '',
    allergies: '',
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = 'Full name is required.';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextErrors.email = 'Enter a valid email address.';
    if (formData.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    if (formData.password !== formData.confirmPassword) nextErrors.confirmPassword = 'Passwords do not match.';
    if (formData.phone && !/^[0-9+\-() ]{8,}$/.test(formData.phone)) {
      nextErrors.phone = 'Enter a valid phone number.';
    }

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
      const { token, user } = await signupApi({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        skinType: formData.skinType,
        skinConcerns: formData.skinConcerns,
        allergies: formData.allergies,
      });
      setToken(token);
      setUser(user);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (name) => `input-base ${errors[name] ? 'input-error' : ''}`;

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="mx-auto max-w-3xl">
          <section className="surface-card p-6 sm:p-8 lg:p-10">
            <div className="text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Create your account</h1>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Set up your profile so the app can deliver more relevant skincare guidance, product suggestions, and smoother checkout details.
              </p>
            </div>

            <form className="mt-8 space-y-8" onSubmit={handleSubmit} noValidate>
              {error && <div className="status-banner status-banner-error">{error}</div>}

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="field-label">Full name</label>
                  <div className="relative">
                    <UserIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input id="name" name="name" value={formData.name} onChange={handleChange} className={`${fieldClass('name')} pl-11`} placeholder="Aditi Sharma" />
                  </div>
                  {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="field-label">Email address</label>
                  <div className="relative">
                    <EnvelopeIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={`${fieldClass('email')} pl-11`} placeholder="you@example.com" />
                  </div>
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="field-label">Phone number</label>
                  <div className="relative">
                    <PhoneIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className={`${fieldClass('phone')} pl-11`} placeholder="+91 98765 43210" />
                  </div>
                  <p className="helper-text">Optional.</p>
                  {errors.phone && <p className="error-text">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="field-label">Password</label>
                  <div className="relative">
                    <KeyIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className={`${fieldClass('password')} pl-11`} placeholder="Minimum 6 characters" />
                  </div>
                  {errors.password && <p className="error-text">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="field-label">Confirm password</label>
                  <div className="relative">
                    <ShieldCheckIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className={`${fieldClass('confirmPassword')} pl-11`} placeholder="Repeat password" />
                  </div>
                  {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                </div>

                <div>
                  <label htmlFor="skinType" className="field-label">Skin type</label>
                  <div className="relative">
                    <FaceSmileIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <select id="skinType" name="skinType" value={formData.skinType} onChange={handleChange} className={`${fieldClass('skinType')} pl-11`}>
                      <option value="">Select skin type</option>
                      <option value="dry">Dry</option>
                      <option value="oily">Oily</option>
                      <option value="combination">Combination</option>
                      <option value="normal">Normal</option>
                      <option value="sensitive">Sensitive</option>
                    </select>
                  </div>
                  <p className="helper-text">Optional.</p>
                </div>

                <div>
                  <label htmlFor="skinConcerns" className="field-label">Skin concerns</label>
                  <div className="relative">
                    <ExclamationTriangleIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input id="skinConcerns" name="skinConcerns" value={formData.skinConcerns} onChange={handleChange} className={`${fieldClass('skinConcerns')} pl-11`} placeholder="Acne, aging, redness" />
                  </div>
                  <p className="helper-text">Optional, but helpful for more relevant recommendations.</p>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="allergies" className="field-label">Allergies</label>
                  <div className="relative">
                    <ExclamationTriangleIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input id="allergies" name="allergies" value={formData.allergies} onChange={handleChange} className={`${fieldClass('allergies')} pl-11`} placeholder="Fragrance, essential oils, none" />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-pink-600 transition hover:text-pink-700">
                Sign in
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Signup;
