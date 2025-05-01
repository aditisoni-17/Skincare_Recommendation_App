import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PhotoIcon,
  SparklesIcon,
  ArrowPathIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';

const SkinAnalysis = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      // In a real app, you would upload this to your backend for analysis
      setLoading(true);
      // Simulate analysis delay
      setTimeout(() => {
        setAnalysis({
          skinType: 'Combination',
          concerns: ['Acne', 'Dark Spots', 'Fine Lines'],
          recommendations: [
            {
              id: 1,
              name: 'Gentle Foaming Cleanser',
              category: 'cleansers',
              reason: 'Suitable for combination skin, helps control oil while maintaining moisture',
            },
            {
              id: 3,
              name: 'Vitamin C Serum',
              category: 'serums',
              reason: 'Helps brighten dark spots and improve skin texture',
            },
            {
              id: 4,
              name: 'Night Cream',
              category: 'moisturizers',
              reason: 'Provides deep hydration and helps with fine lines',
            },
          ],
        });
        setLoading(false);
      }, 2000);
    }
  };

  const handleRetake = () => {
    setSelectedImage(null);
    setAnalysis(null);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Skin Analysis
          </h2>

          {!selectedImage ? (
            <div className="text-center">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
                    >
                      <span>Upload a photo</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Take a well-lit photo of your face for accurate analysis
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Uploaded skin photo"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  onClick={handleRetake}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-50"
                >
                  <ArrowPathIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Analyzing your skin...</p>
                </div>
              ) : analysis ? (
                <div className="space-y-6">
                  <div className="bg-pink-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Your Skin Profile
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Skin Type:</span>{' '}
                        {analysis.skinType}
                      </p>
                      <p>
                        <span className="font-medium">Main Concerns:</span>{' '}
                        {analysis.concerns.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Recommended Products
                    </h3>
                    <div className="space-y-4">
                      {analysis.recommendations.map((product) => (
                        <div
                          key={product.id}
                          className="border rounded-lg p-4 hover:bg-gray-50"
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <SparklesIcon className="h-5 w-5 text-pink-500" />
                            </div>
                            <div className="ml-4">
                              <h4 className="text-base font-medium text-gray-900">
                                {product.name}
                              </h4>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.reason}
                              </p>
                              <button
                                onClick={() => navigate('/products')}
                                className="mt-2 inline-flex items-center text-sm text-pink-600 hover:text-pink-500"
                              >
                                <ShoppingCartIcon className="h-4 w-4 mr-1" />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={handleRetake}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Retake Analysis
                    </button>
                    <button
                      onClick={() => navigate('/products')}
                      className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
                    >
                      View All Products
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkinAnalysis; 