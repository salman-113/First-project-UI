import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Routes>
                </main>
                <Footer />
              </div>
              <ToastContainer position="bottom-right" autoClose={3000} />
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;