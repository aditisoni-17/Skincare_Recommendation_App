import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import SkinTest from './pages/SkinTest';
import SkinCareRoutine from './pages/SkinCareRoutine';
import SkinAnalysis from './pages/SkinAnalysis';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile user={user} setUser={setUser} />
                </PrivateRoute>
              }
            />
            <Route
              path="/skin-test"
              element={
                <PrivateRoute>
                  <SkinTest user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path="/skin-care-routine"
              element={
                <PrivateRoute>
                  <SkinCareRoutine user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path="/skin-analysis"
              element={
                <PrivateRoute>
                  <SkinAnalysis user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
