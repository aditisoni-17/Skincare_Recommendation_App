import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SunIcon,
  MoonIcon,
  SparklesIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/outline';

const SkinCareRoutine = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('morning');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const routines = {
    morning: [
      {
        step: 1,
        title: 'Cleanse',
        description: 'Start your day with a gentle cleanser to remove overnight buildup.',
        products: ['Gentle Foaming Cleanser', 'Micellar Water'],
      },
      {
        step: 2,
        title: 'Tone',
        description: 'Apply a hydrating toner to balance your skin pH.',
        products: ['Hydrating Toner', 'Rose Water Mist'],
      },
      {
        step: 3,
        title: 'Treat',
        description: 'Apply your serums and treatments.',
        products: ['Vitamin C Serum', 'Hyaluronic Acid'],
      },
      {
        step: 4,
        title: 'Moisturize',
        description: 'Lock in hydration with a moisturizer suitable for your skin type.',
        products: ['Lightweight Moisturizer', 'Gel Cream'],
      },
      {
        step: 5,
        title: 'Protect',
        description: 'Always finish with SPF, even on cloudy days.',
        products: ['SPF 30+ Sunscreen', 'Tinted Moisturizer with SPF'],
      },
    ],
    evening: [
      {
        step: 1,
        title: 'Double Cleanse',
        description: 'First with an oil-based cleanser, then with a water-based one.',
        products: ['Cleansing Oil', 'Gentle Cleanser'],
      },
      {
        step: 2,
        title: 'Exfoliate',
        description: 'Use a gentle exfoliant 2-3 times per week.',
        products: ['Chemical Exfoliant', 'Gentle Scrub'],
      },
      {
        step: 3,
        title: 'Treat',
        description: 'Apply your night treatments and serums.',
        products: ['Retinol Serum', 'Niacinamide'],
      },
      {
        step: 4,
        title: 'Moisturize',
        description: 'Use a richer moisturizer at night.',
        products: ['Night Cream', 'Sleeping Mask'],
      },
    ],
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Personalized Skin Care Routine
          </h2>

          <div className="mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('morning')}
                className={`flex items-center px-4 py-2 rounded-md ${
                  activeTab === 'morning'
                    ? 'bg-pink-100 text-pink-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <SunIcon className="h-5 w-5 mr-2" />
                Morning Routine
              </button>
              <button
                onClick={() => setActiveTab('evening')}
                className={`flex items-center px-4 py-2 rounded-md ${
                  activeTab === 'evening'
                    ? 'bg-pink-100 text-pink-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <MoonIcon className="h-5 w-5 mr-2" />
                Evening Routine
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {routines[activeTab].map((step) => (
              <div key={step.step} className="border rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-100">
                      <span className="text-pink-600 font-medium">
                        {step.step}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-gray-600">{step.description}</p>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        Recommended Products:
                      </h4>
                      <ul className="mt-2 space-y-2">
                        {step.products.map((product) => (
                          <li
                            key={product}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <SparklesIcon className="h-4 w-4 text-pink-500 mr-2" />
                            {product}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => navigate('/products')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Shop Products
            </button>
            <button
              onClick={() => navigate('/skin-test')}
              className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
            >
              Update Skin Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinCareRoutine; 