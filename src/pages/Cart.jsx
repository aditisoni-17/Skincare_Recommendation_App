import { useNavigate } from 'react-router-dom';
import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext.jsx';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, subtotal, updateQuantity, removeItem } = useCart();

  if (cart.length === 0) {
    return (
      <div className="page-shell">
        <div className="page-container">
          <section className="surface-card px-6 py-16 text-center sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-50 text-pink-600">
              <ShoppingCartIcon className="h-8 w-8" />
            </div>
            <h1 className="mt-6 text-2xl font-semibold text-slate-900">Your cart is empty</h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
              Start exploring products to build your skincare routine. Items you add will appear here with a clean order summary.
            </p>
            <button onClick={() => navigate('/products')} className="btn-primary mt-8">
              Continue shopping
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
            <h1 className="page-title">Shopping cart</h1>
            <p className="page-subtitle">
              Review quantities, remove products, and head to checkout with a clearer summary layout.
            </p>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.5fr_0.8fr]">
          <section className="surface-card overflow-hidden">
            <ul className="divide-y divide-slate-200">
              {cart.map((item) => (
                <li key={item.id} className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
                  <div className="h-28 w-full overflow-hidden rounded-2xl bg-slate-100 sm:h-24 sm:w-24">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900">{item.name}</h2>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{item.description}</p>
                      </div>
                      <p className="text-lg font-semibold text-slate-900">
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="inline-flex w-fit items-center gap-3 rounded-2xl border border-pink-100 bg-pink-50/80 p-2">
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="rounded-full bg-white p-2 text-pink-700 transition hover:bg-pink-100"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold text-slate-900">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="rounded-full bg-white p-2 text-pink-700 transition hover:bg-pink-100"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600 transition hover:text-rose-700"
                      >
                        <TrashIcon className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <aside className="surface-card h-fit p-6 sm:p-7">
            <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Shipping</span>
                <span className="font-semibold text-slate-900">Calculated at checkout</span>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-slate-900">Estimated total</span>
                  <span className="text-xl font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button onClick={() => navigate('/checkout')} className="btn-primary mt-8 w-full">
              Checkout
            </button>
            <button onClick={() => navigate('/products')} className="btn-secondary mt-3 w-full">
              Continue shopping
            </button>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              Taxes and shipping options will be confirmed in the next step.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
