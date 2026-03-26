import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import AdminProducts from './pages/AdminProducts.jsx';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import SkinTest from './pages/SkinTest';
import SkinCareRoutine from './pages/SkinCareRoutine';
import SkinAnalysis from './pages/SkinAnalysis';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/skin-test"
              element={
                <PrivateRoute>
                  <SkinTest />
                </PrivateRoute>
              }
            />
            <Route
              path="/skin-care-routine"
              element={
                <PrivateRoute>
                  <SkinCareRoutine />
                </PrivateRoute>
              }
            />
            <Route
              path="/skin-analysis"
              element={
                <PrivateRoute>
                  <SkinAnalysis />
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
            <Route
              path="/order-confirmation"
              element={
                <PrivateRoute>
                  <OrderConfirmation />
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
