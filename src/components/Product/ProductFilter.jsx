import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';

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
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter Products</h2>
      
      <div className="space-y-4">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>

        {/* Active Filters Indicator */}
        {(searchTerm || selectedCategory !== 'all' || sortOption !== 'default') && (
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Active filters: 
                {searchTerm && ` "${searchTerm}"`}
                {selectedCategory !== 'all' && ` ${selectedCategory}`}
                {sortOption !== 'default' && (
                  sortOption === 'price-low' ? ' Price: Low to High' :
                  sortOption === 'price-high' ? ' Price: High to Low' : ' Newest'
                )}
              </span>
              <button
                onClick={handleResetFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Reset all
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;