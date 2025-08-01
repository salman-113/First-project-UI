import { useContext } from 'react';
import ProductCard from './ProductCard';
import { ProductContext } from '../context/ProductContext';
import { motion } from 'framer-motion';

const ProductList = () => {
  const { 
    filteredProducts, 
    loading, 
    searchTerm, 
    setSearchTerm, 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    sortOption, 
    setSortOption 
  } = useContext(ProductContext);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 border-t-4 border-b-4 border-[#6EACDA] rounded-full"
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#03346E] p-6 rounded-lg shadow-lg border border-[#6EACDA]"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search Input */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium mb-2 text-[#E2E2B6]">
              Search Products
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-[#021526] border border-[#6EACDA] rounded-lg text-[#E2E2B6] focus:outline-none focus:ring-2 focus:ring-[#6EACDA]"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2 text-[#E2E2B6]">
              Filter by Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 bg-[#021526] border border-[#6EACDA] rounded-lg text-[#E2E2B6] focus:outline-none focus:ring-2 focus:ring-[#6EACDA]"
            >
              <option value="all" className="bg-[#021526]">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category} className="bg-[#021526]">
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium mb-2 text-[#E2E2B6]">
              Sort By
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full px-4 py-2 bg-[#021526] border border-[#6EACDA] rounded-lg text-[#E2E2B6] focus:outline-none focus:ring-2 focus:ring-[#6EACDA]"
            >
              <option value="default" className="bg-[#021526]">Default</option>
              <option value="price-low" className="bg-[#021526]">Price: Low to High</option>
              <option value="price-high" className="bg-[#021526]">Price: High to Low</option>
              <option value="newest" className="bg-[#021526]">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Product Count */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-[#6EACDA]"
      >
        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        {searchTerm && ` matching "${searchTerm}"`}
        {selectedCategory !== 'all' && ` in category "${selectedCategory}"`}
      </motion.div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-[#03346E] rounded-lg shadow-lg border border-[#6EACDA]"
        >
          <h3 className="text-lg font-medium text-[#E2E2B6] mb-2">No products found</h3>
          <p className="text-[#6EACDA]">Try adjusting your search or filter criteria</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSortOption('default');
            }}
            className="mt-4 px-6 py-2 bg-[#6EACDA] text-[#021526] rounded-lg font-medium hover:bg-[#E2E2B6] transition-colors"
          >
            Reset Filters
          </motion.button>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ProductList;