import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext.jsx';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const order = location.state?.order;

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="mx-auto max-w-3xl">
          <section className="surface-card p-8 text-center sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
              <CheckCircleIcon className="h-8 w-8" />
            </div>
            <h1 className="mt-6 text-3xl font-semibold text-slate-900">Order confirmed</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Thanks for your purchase. Your order has been placed successfully and the cart has been prepared for your next visit.
            </p>

            {order ? (
              <div className="mt-8 grid gap-4 text-left sm:grid-cols-3">
                <div className="soft-panel p-5">
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">Order ID</p>
                  <p className="mt-3 break-all [overflow-wrap:anywhere] text-base font-semibold text-slate-900">{order.id}</p>
                </div>
                <div className="soft-panel p-5">
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">Date</p>
                  <p className="mt-3 text-base font-semibold text-slate-900">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="soft-panel p-5">
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">Total</p>
                  <p className="mt-3 text-base font-semibold text-slate-900">
                    ${Number(order.total || 0).toFixed(2)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="status-banner status-banner-info mt-8">
                We couldn&apos;t find order details for this session, but your checkout flow completed.
              </div>
            )}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/products" className="btn-primary">
                Continue shopping
              </Link>
              <button
                onClick={() => {
                  clearCart();
                  navigate('/profile');
                }}
                className="btn-secondary"
              >
                View profile
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
