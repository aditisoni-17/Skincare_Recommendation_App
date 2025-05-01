import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserIcon,
  HeartIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserIcon className="h-12 w-12 text-pink-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {user.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'profile'
                      ? 'bg-pink-100 text-pink-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'orders'
                      ? 'bg-pink-100 text-pink-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'favorites'
                      ? 'bg-pink-100 text-pink-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Favorites
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'settings'
                      ? 'bg-pink-100 text-pink-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Settings
                </button>
              </div>
            </div>

            <div className="px-4 py-5 sm:px-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      Skin Type
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {user.skinType || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      Skin Concerns
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {user.skinConcerns || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      Allergies
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {user.allergies || 'None specified'}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {user.orders?.length > 0 ? (
                    user.orders.map((order) => (
                      <div
                        key={order.id}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Order #{order.id}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="font-medium">${order.total}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No orders yet</p>
                  )}
                </div>
              )}

              {activeTab === 'favorites' && (
                <div className="space-y-4">
                  {user.favorites?.length > 0 ? (
                    user.favorites.map((product) => (
                      <div
                        key={product.id}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          ${product.price}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No favorite products yet</p>
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 