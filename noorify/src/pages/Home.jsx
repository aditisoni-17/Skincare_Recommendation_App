import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SparklesIcon,
  HeartIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  ShoppingCartIcon,
  StarIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';

const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    let newCart;

    if (existingItem) {
      newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const featuredProducts = [
    {
      id: 1,
      name: 'Hydrating Cleanser',
      price: 24.99,
      rating: 4.8,
      reviewCount: 128,
      image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description: 'Gentle cleanser that removes impurities while maintaining skin\'s moisture barrier.',
      isNew: true,
      isSale: false,
    },
    {
      id: 2,
      name: 'Vitamin C Serum',
      price: 39.99,
      rating: 4.9,
      reviewCount: 256,
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description: 'Brightening serum with 20% vitamin C for radiant, even-toned skin.',
      isNew: false,
      isSale: true,
    },
    {
      id: 3,
      name: 'Moisturizing Cream',
      price: 29.99,
      rating: 4.7,
      reviewCount: 89,
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description: 'Rich cream that deeply hydrates and nourishes dry skin.',
      isNew: false,
      isSale: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-600 to-pink-400">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-400 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Discover Your Perfect Skin Care Routine
            </h1>
            <p className="mt-6 text-xl text-pink-100 max-w-3xl mx-auto">
              Take our skin test to get personalized recommendations and find the perfect products for your skin type.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <button
                onClick={() => navigate('/skin-test')}
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-pink-600 bg-white hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
              >
                Take Skin Test
              </button>
              <button
                onClick={() => navigate('/products')}
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-700 hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Why Choose Noorify
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Our products are carefully crafted with your skin\'s health in mind
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
            <SparklesIcon className="h-12 w-12 text-pink-600" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Natural Ingredients
            </h3>
            <p className="mt-2 text-gray-500">
              We use only the finest natural ingredients, carefully selected for their proven benefits to your skin.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
            <ShieldCheckIcon className="h-12 w-12 text-pink-600" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Dermatologist Tested
            </h3>
            <p className="mt-2 text-gray-500">
              All our products are rigorously tested by dermatologists to ensure they\'re safe and effective.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
            <HeartIcon className="h-12 w-12 text-pink-600" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Cruelty-Free
            </h3>
            <p className="mt-2 text-gray-500">
              We\'re committed to creating products that are both effective and ethical.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Discover our best-selling products
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                {product.isNew && (
                  <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-medium px-2 py-1 rounded">
                    New
                  </span>
                )}
                {product.isSale && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Sale
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.round(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    ({product.reviewCount})
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
          >
            View All Products
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Real results from real people
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Beauty Blogger',
                content: 'The Vitamin C Serum has completely transformed my skin. I\'ve never received so many compliments!',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                role: 'Dermatologist',
                content: 'As a dermatologist, I\'m impressed by the quality of ingredients and the results my patients are seeing.',
                rating: 5,
              },
              {
                name: 'Emma Davis',
                role: 'Makeup Artist',
                content: 'The Hydrating Cleanser is now a staple in my skincare routine. It\'s gentle yet effective.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`h-5 w-5 ${
                          star <= testimonial.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-gray-500">{testimonial.content}</p>
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Ready to Transform Your Skin?
            </h2>
            <p className="mt-4 text-lg text-pink-100">
              Take our skin test to get personalized recommendations
            </p>
            <div className="mt-8">
              <button
                onClick={() => navigate('/skin-test')}
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-pink-600 bg-white hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
              >
                Start Your Skin Journey
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg">
          Product added to cart successfully!
        </div>
      )}
    </div>
  );
};

export default Home; 