import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { motion } from 'framer-motion';

const ProductFilter = () => {
  const {
    searchTerm,
    setSearchTerm,
    categories,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption
  } = useContext(ProductContext);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortOption('default');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#010D1F] p-6 rounded-lg shadow-lg border border-[#021F44]"
    >
      <h2 className="text-xl font-semibold mb-6 text-[#E2E2B6]">Filter Products</h2>
      
      <div className="space-y-6">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium mb-2 text-[#E2E2B6]">
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-[#021526] border border-[#6EACDA] rounded-lg text-[#E2E2B6] focus:outline-none focus:ring-2 focus:ring-[#6EACDA]"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2 text-[#E2E2B6]">
            Category
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

        {/* Active Filters Indicator */}
        {(searchTerm || selectedCategory !== 'all' || sortOption !== 'default') && (
          <div className="pt-4 border-t border-[#6EACDA]">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#6EACDA]">
                Active filters: 
                {searchTerm && ` "${searchTerm}"`}
                {selectedCategory !== 'all' && ` ${selectedCategory}`}
                {sortOption !== 'default' && (
                  sortOption === 'price-low' ? ' Price: Low to High' :
                  sortOption === 'price-high' ? ' Price: High to Low' : ' Newest'
                )}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResetFilters}
                className="text-sm text-[#6EACDA] hover:text-[#E2E2B6] font-medium"
              >
                Reset all
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductFilter;