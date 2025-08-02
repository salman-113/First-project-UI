import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Orders from './pages/Orders';
import About from './pages/About';
import OrderDetail from './pages/OrderDetail';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ProductProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/about" element={<About />} />
                <Route path="/orders/:id" element={<OrderDetail />} />
              </Routes>
              <Footer />
              <ToastContainer
                position="bottom-left"
                autoClose={1000}
                style={{
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(0, 0, 0, 1)',
                  borderRadius: '12px',
                  border: '1px solid rgba',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  padding: '12px',
                  color: '#fff',
                }}
                toastStyle={{
                  background: 'transparent',
                  boxShadow: 'none',
                  margin: '4px 0',
                }}
              />            </ProductProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
