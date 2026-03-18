import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCardIcon,
  LockClosedIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext.jsx';
import { createOrder } from '../services/orderService.js';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: '',
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart } = useCart();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const summary = useMemo(
    () =>
      cart.reduce(
        (acc, item) => acc + (Number(item.quantity) || 1),
        0
      ),
    [cart]
  );

  const validate = () => {
    const nextErrors = {};

    if (!formData.firstName.trim()) nextErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) nextErrors.lastName = 'Last name is required.';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextErrors.email = 'Enter a valid email address.';
    if (!formData.address.trim()) nextErrors.address = 'Street address is required.';
    if (!formData.city.trim()) nextErrors.city = 'City is required.';
    if (!formData.state.trim()) nextErrors.state = 'State is required.';
    if (!/^[A-Za-z0-9 -]{4,10}$/.test(formData.zipCode.trim())) {
      nextErrors.zipCode = 'Enter a valid ZIP or postal code.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        items: cart,
        shipping: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
      };

      const { order } = await createOrder(payload);
      clearCart();
      navigate('/order-confirmation', { state: { order } });
    } catch (error) {
      setSubmitError(error.message || 'We could not complete your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (name) => `input-base ${errors[name] ? 'input-error' : ''}`;

  if (cart.length === 0) {
    return (
      <div className="page-shell">
        <div className="page-container">
          <section className="surface-card px-6 py-16 text-center sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-50 text-pink-600">
              <ShoppingBagIcon className="h-8 w-8" />
            </div>
            <h1 className="mt-6 text-2xl font-semibold text-slate-900">Your cart is empty</h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
              Add a few products before checking out. Once you do, your shipping and payment summary will appear here.
            </p>
            <button onClick={() => navigate('/products')} className="btn-primary mt-8">
              Browse products
            </button>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Checkout</h1>
            <p className="page-subtitle">
              Complete your order with clearer form grouping, stronger validation feedback, and a more stable responsive summary layout.
            </p>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.35fr_0.85fr]">
          <section className="surface-card p-6 sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {submitError && <div className="status-banner status-banner-error">{submitError}</div>}

              <div>
                <h2 className="text-xl font-semibold text-slate-900">Shipping information</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="field-label">First name</label>
                    <input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} className={fieldClass('firstName')} />
                    {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="field-label">Last name</label>
                    <input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} className={fieldClass('lastName')} />
                    {errors.lastName && <p className="error-text">{errors.lastName}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="field-label">Email address</label>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className={fieldClass('email')} />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="field-label">Street address</label>
                    <input id="address" name="address" value={formData.address} onChange={handleInputChange} className={fieldClass('address')} />
                    {errors.address && <p className="error-text">{errors.address}</p>}
                  </div>
                  <div>
                    <label htmlFor="city" className="field-label">City</label>
                    <input id="city" name="city" value={formData.city} onChange={handleInputChange} className={fieldClass('city')} />
                    {errors.city && <p className="error-text">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="state" className="field-label">State</label>
                    <input id="state" name="state" value={formData.state} onChange={handleInputChange} className={fieldClass('state')} />
                    {errors.state && <p className="error-text">{errors.state}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="zipCode" className="field-label">ZIP / Postal code</label>
                    <input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className={fieldClass('zipCode')} />
                    {errors.zipCode && <p className="error-text">{errors.zipCode}</p>}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-8">
                <h2 className="text-xl font-semibold text-slate-900">Payment information</h2>
                <p className="mt-2 text-sm text-slate-500">
                  This is a demo. Payments are not processed.
                </p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="cardNumber" className="field-label">Card number</label>
                    <div className="relative">
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        value="4242 4242 4242 4242"
                        disabled
                        readOnly
                        className="input-base cursor-not-allowed bg-slate-100 pr-12 text-slate-400"
                      />
                      <CreditCardIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="cardName" className="field-label">Name on card</label>
                    <input
                      id="cardName"
                      name="cardName"
                      value="Demo Cardholder"
                      disabled
                      readOnly
                      className="input-base cursor-not-allowed bg-slate-100 text-slate-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="expiryDate" className="field-label">Expiry date</label>
                    <input
                      id="expiryDate"
                      name="expiryDate"
                      value="12/34"
                      disabled
                      readOnly
                      className="input-base cursor-not-allowed bg-slate-100 text-slate-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="field-label">CVV</label>
                    <input
                      id="cvv"
                      name="cvv"
                      value="123"
                      disabled
                      readOnly
                      className="input-base cursor-not-allowed bg-slate-100 text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <button type="button" onClick={() => navigate('/cart')} className="btn-ghost justify-start px-0 sm:px-4">
                  Back to cart
                </button>
                <button type="submit" disabled={isSubmitting} className="btn-primary min-w-[190px]">
                  {isSubmitting ? 'Processing order...' : 'Complete purchase'}
                </button>
              </div>
            </form>
          </section>

          <aside className="surface-card h-fit p-6 sm:p-7">
            <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
            <p className="mt-2 text-sm text-slate-500">{summary} item{summary > 1 ? 's' : ''} in your order</p>

            <div className="mt-6 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
                  <div className="h-16 w-16 overflow-hidden rounded-xl bg-slate-100">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-slate-900">{item.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">Qty: {item.quantity || 1}</p>
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-slate-200 pt-6">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                <LockClosedIcon className="h-5 w-5 flex-shrink-0 text-slate-400" />
                Your payment details are processed through a secure encrypted flow.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
