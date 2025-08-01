import { useContext } from 'react';
import ProductCard from '../components/Product/ProductCard';
import ProductFilter from '../components/Product/ProductFilter';
import { ProductContext } from '../context/ProductContext';

const Products = () => {
  const { filteredProducts, loading, categories } = useContext(ProductContext);

  if (loading) {
    return (
      <div className="bg-black min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6EACDA]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-[#E2E2B6] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-[#E2E2B6]">All Products</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <ProductFilter categories={categories} />
          </div>
          
          <div className="md:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2 text-[#E2E2B6]">No products found</h2>
                <p className="text-[#6EACDA]">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    className="bg-[#03346E] hover:border-[#6EACDA]"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;