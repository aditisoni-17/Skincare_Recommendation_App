import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCartIcon,
  HeartIcon,
  StarIcon,
  FunnelIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext.jsx';
import { PRODUCTS } from '../data/products.js';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const { cart, addItem, updateQuantity, totalItems } = useCart();

  useEffect(() => {
    setProducts(PRODUCTS);
  }, []);

  const addToCart = (product) => {
    addItem(product, 1);
    setShowSuccess(true);
    window.setTimeout(() => setShowSuccess(false), 2200);
  };

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        if (priceRange !== 'all') {
          const [min, max] = priceRange.split('-').map(Number);
          if (product.price < min || product.price > max) {
            return false;
          }
        }

        if (minRating > 0 && product.rating < minRating) {
          return false;
        }

        return true;
      }),
    [minRating, priceRange, products, selectedCategory]
  );

  const categories = ['all', 'cleansers', 'serums', 'moisturizers', 'sunscreen', 'masks'];
  const priceRanges = [
    { value: 'all', label: 'All prices' },
    { value: '0-25', label: 'Under $25' },
    { value: '25-50', label: '$25 to $50' },
    { value: '50-100', label: '$50 to $100' },
  ];
  const ratings = ['all', '4.5', '4.0', '3.5', '3.0'];

  const productInCart = (id) => cart.find((item) => item.id === id);
  const handleImageError = (event) => {
    event.currentTarget.src = 'https://placehold.co/800x800/fdf2f8/9d174d?text=Noorify';
  };

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Our products</h1>
            <p className="page-subtitle">
              Explore essentials curated for different routines, concerns, and skin types with cleaner filtering and stronger responsiveness.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="btn-secondary"
            >
              <FunnelIcon className="mr-2 h-5 w-5" />
              {showFilters ? 'Hide filters' : 'Show filters'}
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="btn-primary relative"
            >
              <ShoppingCartIcon className="mr-2 h-5 w-5" />
              Cart
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-rose-500 px-1.5 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {showFilters && (
          <section className="surface-card mb-8 p-5 sm:p-6">
            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <label className="field-label" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-base"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="priceRange">
                  Price range
                </label>
                <select
                  id="priceRange"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="input-base"
                >
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="minRating">
                  Minimum rating
                </label>
                <select
                  id="minRating"
                  value={String(minRating || 'all')}
                  onChange={(e) => setMinRating(e.target.value === 'all' ? 0 : Number(e.target.value))}
                  className="input-base"
                >
                  {ratings.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating === 'all' ? 'All ratings' : `${rating}+ stars`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>
        )}

        {filteredProducts.length === 0 ? (
          <section className="surface-card px-6 py-14 text-center">
            <h2 className="text-xl font-semibold text-slate-900">No products found</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
              Try adjusting the category, price range, or rating filters to see more results.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange('all');
                setMinRating(0);
              }}
              className="btn-secondary mt-6"
            >
              Reset filters
            </button>
          </section>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => {
              const cartItem = productInCart(product.id);
              return (
                <article key={product.id} className="product-card">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-64 w-full object-cover"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                      <div className="flex gap-2">
                        {product.isNew && <span className="badge bg-white text-pink-700">New</span>}
                        {product.isSale && <span className="badge bg-rose-600 text-white">Sale</span>}
                      </div>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="rounded-full bg-white/90 p-2 text-slate-500 shadow-sm transition hover:text-pink-600"
                        aria-label={`View ${product.name} details`}
                      >
                        <HeartIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
                      </div>
                      <span className="text-lg font-semibold text-slate-900">${Number(product.price).toFixed(2)}</span>
                    </div>

                    <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className={`h-4 w-4 ${
                              star <= Math.round(product.rating) ? 'text-amber-400' : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span>{Number(product.rating || 0).toFixed(1)}</span>
                      <span>({product.reviewCount || 0})</span>
                    </div>

                    <div className="mt-6">
                      {cartItem ? (
                        <div className="flex items-center justify-between rounded-2xl border border-pink-100 bg-pink-50/70 p-3">
                          <span className="text-sm font-medium text-pink-700">In cart</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                              className="rounded-full border border-pink-200 bg-white p-2 text-pink-700 transition hover:bg-pink-100"
                              aria-label={`Decrease ${product.name} quantity`}
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="min-w-6 text-center text-sm font-semibold text-slate-900">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                              className="rounded-full border border-pink-200 bg-white p-2 text-pink-700 transition hover:bg-pink-100"
                              aria-label={`Increase ${product.name} quantity`}
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(product)} className="btn-primary w-full">
                          Add to cart
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
          <div className="surface-card max-h-[90vh] w-full max-w-4xl overflow-y-auto p-5 sm:p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{selectedProduct.name}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  {selectedProduct.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close product details"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-72 w-full rounded-2xl object-cover sm:h-96"
                onError={handleImageError}
              />
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.round(selectedProduct.rating) ? 'text-amber-400' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span>{Number(selectedProduct.rating || 0).toFixed(1)}</span>
                    <span>({selectedProduct.reviewCount || 0} reviews)</span>
                  </div>
                  <div className="mt-6 soft-panel p-5">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Price</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">
                      ${Number(selectedProduct.price).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => addToCart(selectedProduct)}
                    className="btn-primary w-full"
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={() => navigate('/cart')}
                    className="btn-secondary w-full"
                  >
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed right-4 top-24 z-50 max-w-sm rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-lg shadow-emerald-100">
          <div className="flex items-start gap-3">
            <CheckCircleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Added to cart</p>
              <p className="mt-1 text-sm text-slate-600">Your product was added successfully.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
