import { createElement, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SparklesIcon,
  HeartIcon,
  ShieldCheckIcon,
  StarIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext.jsx';
import { getProducts } from '../services/productService.js';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Beauty Blogger',
    content:
      "The Vitamin C Serum completely transformed my skin. The routine feels premium and easy to stick to.",
  },
  {
    name: 'Michael Chen',
    role: 'Dermatologist',
    content:
      "The ingredient choices and routine recommendations feel thoughtful, clear, and practical for everyday use.",
  },
  {
    name: 'Emma Davis',
    role: 'Makeup Artist',
    content:
      "The cleanser is now part of my daily prep kit. It feels gentle, effective, and consistently reliable.",
  },
];

const howItWorks = [
  {
    icon: ClipboardDocumentCheckIcon,
    title: 'Take Skin Test',
    description:
      'Answer a few guided questions so Noorify can understand your skin type, environment, and priorities.',
  },
  {
    icon: SparklesIcon,
    title: 'Get Recommendations',
    description:
      'Receive personalized product suggestions and simple daily guidance tailored to your current needs.',
  },
  {
    icon: HeartIcon,
    title: 'Build Routine',
    description:
      'Turn recommendations into a practical skincare routine and add the right essentials to your cart.',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState('');

  useEffect(() => {
    let isMounted = true;

    getProducts()
      .then((data) => {
        if (!isMounted) return;
        setFeaturedProducts((data.products || []).slice(0, 4));
      })
      .catch((error) => {
        if (!isMounted) return;
        setProductsError(error.message || 'Unable to load featured products right now.');
        setFeaturedProducts([]);
      })
      .finally(() => {
        if (isMounted) setProductsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const safeFeaturedProducts = useMemo(() => featuredProducts, [featuredProducts]);

  const handleAddToCart = (product) => {
    addItem(product, 1);
    setShowSuccess(true);
    window.setTimeout(() => setShowSuccess(false), 2200);
  };

  const handleImageError = (event) => {
    event.currentTarget.src = 'https://placehold.co/800x800/fdf2f8/9d174d?text=Noorify';
  };

  return (
    <div className="overflow-hidden">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-rose-900 via-pink-700 to-rose-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,241,242,0.16),transparent_30%)]" />
        <div className="page-container relative px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <span className="badge bg-white/15 text-white ring-1 ring-white/20">
              Personalized skincare, simplified
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover a skincare routine that feels tailored, clean, and easy to trust.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-rose-50/90 sm:text-lg">
              Take a quick skin test, explore curated essentials, and build a routine that matches your skin type and goals.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => navigate('/skin-test')}
                className="btn-primary min-w-[180px] bg-white text-pink-700 hover:bg-rose-50"
              >
                Take Skin Test
              </button>
              <button
                onClick={() => navigate('/products')}
                className="btn-secondary min-w-[180px] border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white"
              >
                Shop Products
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell">
        <div className="page-container">
          <div className="page-header">
            <div>
              <h2 className="page-title">Why people choose Noorify</h2>
              <p className="page-subtitle">
                Clean recommendations, trusted essentials, and a shopping experience designed to feel calm on every screen size.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                icon: SparklesIcon,
                title: 'Personalized guidance',
                description:
                  'Skincare routines are tailored to your skin type, environment, and current concerns.',
              },
              {
                icon: ShieldCheckIcon,
                title: 'Thoughtful product selection',
                description:
                  'Product curation focuses on everyday essentials with clear descriptions and practical benefits.',
              },
              {
                icon: HeartIcon,
                title: 'Made for daily use',
                description:
                  'Every screen is simplified to help users browse, compare, and purchase without friction.',
              },
            ].map(({ icon, title, description }) => (
              <article key={title} className="interactive-card p-6 sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                  {createElement(icon, { className: 'h-6 w-6' })}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell">
        <div className="page-container">
          <div className="page-header">
            <div>
              <h2 className="page-title">How it works</h2>
              <p className="page-subtitle">
                A simple three-step flow that keeps the experience clear, guided, and consistent with the rest of the product.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {howItWorks.map(({ icon, title, description }) => (
              <article key={title} className="interactive-card p-6 sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                  {createElement(icon, { className: 'h-6 w-6' })}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell">
        <div className="page-container">
          <div className="page-header">
            <div>
              <h2 className="page-title">Featured products</h2>
              <p className="page-subtitle">
                A small set of live products from the backend, presented with cleaner hierarchy, clearer actions, and more consistent card spacing.
              </p>
            </div>
            <button onClick={() => navigate('/products')} className="btn-secondary self-start">
              View all products
            </button>
          </div>

          {productsError && <div className="status-banner status-banner-error mb-6">{productsError}</div>}

          {productsLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="surface-card overflow-hidden">
                  <div className="h-64 animate-pulse bg-slate-200" />
                  <div className="space-y-4 p-6">
                    <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                    <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : safeFeaturedProducts.length === 0 ? (
            <section className="surface-card px-6 py-14 text-center">
              <h3 className="text-xl font-semibold text-slate-900">No featured products yet</h3>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
                Products will appear here automatically once the backend returns available items.
              </p>
            </section>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {safeFeaturedProducts.map((product) => (
                <article key={product.id} className="product-card">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-64 w-full object-cover"
                      onError={handleImageError}
                    />
                    <div className="absolute left-4 top-4 flex gap-2">
                      {product.isNew && <span className="badge bg-white text-pink-700">New</span>}
                      {product.isSale && <span className="badge bg-rose-600 text-white">Sale</span>}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
                      </div>
                      <span className="text-lg font-semibold text-slate-900">${product.price.toFixed(2)}</span>
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
                      <span>{product.rating.toFixed(1)}</span>
                      <span>({product.reviewCount} reviews)</span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn-primary mt-6 w-full"
                    >
                      Add to cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-rose-100/60 py-20">
        <div className="page-container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="page-title">What customers say</h2>
            <p className="page-subtitle mx-auto">
              Social proof and review content are spaced more intentionally so the page feels lighter and easier to scan.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="surface-card p-6">
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} className="h-5 w-5" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">"{testimonial.content}"</p>
                <div className="mt-6">
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell">
        <div className="page-container">
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-rose-900 via-pink-700 to-rose-500 px-6 py-12 text-center text-white shadow-xl shadow-pink-200/50 sm:px-10 sm:py-16">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Start your skincare journey today
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-rose-50/90 sm:text-base">
              Take the skin test, get tailored recommendations, and build a routine that feels easy to follow.
            </p>
            <button
              onClick={() => navigate('/skin-test')}
              className="btn-primary mt-8 min-w-[190px] bg-white text-pink-700 hover:bg-rose-50"
            >
              Take Skin Test
            </button>
          </div>
        </div>
      </section>

      {showSuccess && (
        <div className="fixed right-4 top-24 z-50 max-w-sm rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-lg shadow-emerald-100">
          <div className="flex items-start gap-3">
            <CheckCircleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Added to cart</p>
              <p className="mt-1 text-sm text-slate-600">Your selected product is ready in the cart.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
