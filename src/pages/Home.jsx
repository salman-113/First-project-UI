import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/Product/ProductCard';

const Home = () => {
  const { filteredProducts } = useContext(ProductContext);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="bg-blue-600 text-white p-8 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">Welcome to E-Shop</h1>
          <p className="text-xl mb-6">Discover amazing products at unbeatable prices</p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
            Shop Now
          </button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 4)
            .map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>

      <section className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
            <p>We source only the highest quality products from trusted suppliers.</p>
          </div>
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p>Competitive pricing without compromising on quality.</p>
          </div>
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
            <p>Quick and reliable delivery to your doorstep.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;