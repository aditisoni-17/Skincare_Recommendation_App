import { createElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, ShoppingBagIcon, HeartIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getOrders } from '../services/orderService.js';

const tabs = [
  { id: 'profile', label: 'Profile', icon: UserIcon },
  { id: 'orders', label: 'Orders', icon: ShoppingBagIcon },
  { id: 'favorites', label: 'Favorites', icon: HeartIcon },
  { id: 'settings', label: 'Settings', icon: Cog6ToothIcon },
];

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser, logout, toggleFavorite } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [profileForm, setProfileForm] = useState({
    skinType: '',
    skinConcerns: '',
    allergies: '',
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');

  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate, user]);

  useEffect(() => {
    if (!user) return;

    setProfileForm({
      skinType: user.skinType || '',
      skinConcerns: user.skinConcerns || '',
      allergies: user.allergies || '',
    });

    let isMounted = true;
    setLoadingOrders(true);

    getOrders()
      .then((data) => {
        if (isMounted) setOrders(data.orders || []);
      })
      .catch(() => {
        if (isMounted) setOrders([]);
      })
      .finally(() => {
        if (isMounted) setLoadingOrders(false);
      });

    return () => {
      isMounted = false;
    };
  }, [user]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((current) => ({ ...current, [name]: value }));
    setProfileError('');
    setProfileSuccess('');
  };

  const startEditingProfile = () => {
    setProfileForm({
      skinType: user.skinType || '',
      skinConcerns: user.skinConcerns || '',
      allergies: user.allergies || '',
    });
    setProfileError('');
    setProfileSuccess('');
    setIsEditingProfile(true);
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();

    if (!profileForm.skinType.trim()) {
      setProfileError('Skin type is required.');
      setProfileSuccess('');
      return;
    }

    setUser((currentUser) => ({
      ...currentUser,
      skinType: profileForm.skinType.trim(),
      skinConcerns: profileForm.skinConcerns.trim(),
      allergies: profileForm.allergies.trim(),
    }));

    setProfileError('');
    setProfileSuccess('Skin profile updated successfully.');
    setIsEditingProfile(false);
  };

  return (
    <div className="page-shell">
      <div className="page-container">
        <section className="surface-card overflow-hidden">
          <div className="border-b border-slate-200 bg-gradient-to-r from-rose-900 via-pink-700 to-rose-500 px-6 py-10 text-white sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                <UserIcon className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">{user.name}</h1>
                <p className="mt-2 text-sm text-rose-50/90">{user.email}</p>
                <p className="mt-1 text-sm text-rose-50/80">
                  Personal skincare preferences and account activity in one place.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
            <aside className="border-b border-slate-200 p-4 lg:border-b-0 lg:border-r lg:p-6">
              <div className="flex gap-2 overflow-x-auto lg:flex-col">
                {tabs.map(({ id, label, icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      activeTab === id
                        ? 'bg-pink-50 text-pink-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {createElement(icon, { className: 'h-5 w-5' })}
                    {label}
                  </button>
                ))}
              </div>
            </aside>

            <div className="p-6 sm:p-8">
              {activeTab === 'profile' && (
                <div className="max-w-3xl">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900">Skin profile</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Keep these details updated so the app can show more relevant recommendations and routines.
                      </p>
                    </div>
                    {!isEditingProfile && (
                      <button type="button" onClick={startEditingProfile} className="btn-primary">
                        Edit skin profile
                      </button>
                    )}
                  </div>

                  {profileError && <div className="status-banner status-banner-error mt-6">{profileError}</div>}
                  {profileSuccess && <div className="status-banner mt-6">{profileSuccess}</div>}

                  {isEditingProfile ? (
                    <form className="mt-8 space-y-6" onSubmit={handleProfileSubmit}>
                      <div>
                        <label htmlFor="skinType" className="field-label">Skin type</label>
                        <select
                          id="skinType"
                          name="skinType"
                          value={profileForm.skinType}
                          onChange={handleProfileChange}
                          className="input-base"
                        >
                          <option value="">Select skin type</option>
                          <option value="dry">Dry</option>
                          <option value="oily">Oily</option>
                          <option value="combination">Combination</option>
                          <option value="normal">Normal</option>
                          <option value="sensitive">Sensitive</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="skinConcerns" className="field-label">Skin concerns</label>
                        <input
                          id="skinConcerns"
                          name="skinConcerns"
                          value={profileForm.skinConcerns}
                          onChange={handleProfileChange}
                          className="input-base"
                          placeholder="Acne, aging, redness"
                        />
                      </div>

                      <div>
                        <label htmlFor="allergies" className="field-label">Allergies</label>
                        <input
                          id="allergies"
                          name="allergies"
                          value={profileForm.allergies}
                          onChange={handleProfileChange}
                          className="input-base"
                          placeholder="Fragrance, essential oils, none"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button type="submit" className="btn-primary">
                          Update profile
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditingProfile(false);
                            setProfileError('');
                          }}
                          className="btn-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                      {[
                        { label: 'Skin type', value: user.skinType || 'Not specified' },
                        { label: 'Skin concerns', value: user.skinConcerns || 'Not specified' },
                        { label: 'Allergies', value: user.allergies || 'None specified' },
                        { label: 'Phone', value: user.phone || 'Not provided' },
                      ].map((item) => (
                        <div key={item.label} className="soft-panel p-5">
                          <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                          <p className="mt-3 text-base font-semibold capitalize text-slate-900">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Order history</h2>
                  <p className="mt-2 text-sm text-slate-600">Track previous purchases and revisit your shopping activity.</p>
                  <div className="mt-6 space-y-4">
                    {loadingOrders ? (
                      Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="soft-panel animate-pulse p-5">
                          <div className="h-4 w-40 rounded bg-slate-200" />
                          <div className="mt-3 h-4 w-28 rounded bg-slate-100" />
                        </div>
                      ))
                    ) : orders.length > 0 ? (
                      orders.map((order) => (
                        <div key={order.id} className="soft-panel p-5">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-base font-semibold text-slate-900">Order #{order.id}</p>
                              <p className="mt-1 text-sm text-slate-500">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-base font-semibold text-slate-900">
                              ${Number(order.total || 0).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="soft-panel p-6">
                        <p className="text-base font-semibold text-slate-900">No orders yet</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          Once you complete a purchase, your order details will appear here.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Favorites</h2>
                  <p className="mt-2 text-sm text-slate-600">A place for saved products and future wishlist improvements.</p>
                  <div className="mt-6">
                    {user.favorites?.length > 0 ? (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {user.favorites.map((product) => (
                          <div key={product.id} className="soft-panel p-5">
                            <p className="font-semibold text-slate-900">{product.name}</p>
                            <p className="mt-2 text-sm text-slate-500">${product.price}</p>
                            <div className="mt-4 flex gap-3">
                              <button
                                onClick={() => navigate('/products')}
                                className="btn-secondary"
                              >
                                View products
                              </button>
                              <button
                                onClick={() => toggleFavorite(product)}
                                className="btn-primary bg-rose-600 hover:bg-rose-700"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="soft-panel p-6">
                        <p className="text-base font-semibold text-slate-900">No favorite products yet</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          Save products here in the future to make repurchasing easier.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="max-w-xl">
                  <h2 className="text-xl font-semibold text-slate-900">Account settings</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Keep account actions minimal and clear, with a single prominent logout action.
                  </p>
                  <div className="mt-6 soft-panel p-5">
                    <p className="text-sm text-slate-600">
                      Signed in as <span className="font-semibold text-slate-900">{user.email}</span>
                    </p>
                    <button onClick={handleLogout} className="btn-primary mt-5 bg-rose-600 hover:bg-rose-700">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
