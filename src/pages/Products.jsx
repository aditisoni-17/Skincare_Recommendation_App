import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCartIcon,
  HeartIcon,
  StarIcon,
  FunnelIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Hydrating Cleanser',
      price: 24.99,
      rating: 4.8,
      reviewCount: 128,
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Gentle cleanser that removes impurities while maintaining skin\'s moisture barrier.',
      category: 'cleansers',
      isNew: true,
      isSale: false,
    },
    {
      id: 2,
      name: 'Vitamin C Serum',
      price: 39.99,
      rating: 4.9,
      reviewCount: 256,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Brightening serum with 20% vitamin C for radiant, even-toned skin.',
      category: 'serums',
      isNew: false,
      isSale: true,
    },
    {
      id: 3,
      name: 'Moisturizing Cream',
      price: 29.99,
      rating: 4.7,
      reviewCount: 89,
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Rich cream that deeply hydrates and nourishes dry skin.',
      category: 'moisturizers',
      isNew: false,
      isSale: false,
    },
    {
      id: 4,
      name: 'Sunscreen SPF 50',
      price: 34.99,
      rating: 4.6,
      reviewCount: 167,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Broad-spectrum protection with a lightweight, non-greasy formula.',
      category: 'sunscreen',
      isNew: true,
      isSale: false,
    },
    {
      id: 5,
      name: 'Retinol Night Cream',
      price: 49.99,
      rating: 4.5,
      reviewCount: 92,
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Anti-aging cream with encapsulated retinol for gentle yet effective results.',
      category: 'moisturizers',
      isNew: false,
      isSale: true,
    },
    {
      id: 6,
      name: 'Clay Mask',
      price: 27.99,
      rating: 4.8,
      reviewCount: 143,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      description: 'Purifying mask that draws out impurities and refines pores.',
      category: 'masks',
      isNew: false,
      isSale: false,
    },
  ]);

  const [cart, setCart] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [minRating, setMinRating] = useState(0);

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
          ? { ...item, quantity: (item.quantity || 1) + 1 }
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

  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    const newCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const filteredProducts = products.filter((product) => {
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
  });

  const categories = ['all', 'cleansers', 'serums', 'moisturizers', 'sunscreen', 'masks'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-25', label: 'Under $25' },
    { value: '25-50', label: '$25 - $50' },
    { value: '50-100', label: '$50 - $100' },
  ];
  const ratings = ['all', '4.5', '4.0', '3.5', '3.0'];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Our Products</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filters
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                >
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                >
                  {ratings.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating === 'all' ? 'All Ratings' : `${rating}+ Stars`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <HeartIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center mb-4">
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
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {cartItem ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, cartItem.quantity - 1)
                          }
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-medium">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(product.id, cartItem.quantity + 1)
                          }
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-medium text-gray-900">
                {selectedProduct.name}
              </h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div>
                <p className="text-gray-500 mb-4">
                  {selectedProduct.description}
                </p>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.round(selectedProduct.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    ({selectedProduct.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-medium text-gray-900">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  {cart.find((item) => item.id === selectedProduct.id) ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            selectedProduct.id,
                            cart.find((item) => item.id === selectedProduct.id)
                              .quantity - 1
                          )
                        }
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-medium">
                        {
                          cart.find((item) => item.id === selectedProduct.id)
                            .quantity
                        }
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            selectedProduct.id,
                            cart.find((item) => item.id === selectedProduct.id)
                              .quantity + 1
                          )
                        }
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Benefits
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-500">
                      <li>Gentle on all skin types</li>
                      <li>Dermatologist tested</li>
                      <li>Cruelty-free</li>
                      <li>Vegan formula</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Ingredients
                    </h4>
                    <p className="text-sm text-gray-500">
                      Key ingredients: Hyaluronic Acid, Niacinamide, Ceramides
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products; 