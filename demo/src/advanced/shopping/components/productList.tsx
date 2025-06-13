
import React from 'react';
import useShoppingStore from '../store';

const ProductList: React.FC = () => {
  const [state, methods] = useShoppingStore.useUniqueState();

  console.log('loading', state.isLoading);
  return (
    <div className="product-list">
      <div className="product-list-header">
        <h2>Products</h2>
        <button 
          onClick={() => methods.fetchProducts()}
          disabled={state.isLoading}
        >
          {state.isLoading ? 'Loading...' : 'Load Products'}
        </button>
      </div>

      {state.error && (
        <div className="error-message">
          {state.error}
        </div>
      )}

      {state.isLoading ? (
        <div className="loading">Loading products...</div>
      ) : state.products.length === 0 ? (
        <div className="empty-state">
          No products available. Click "Load Products" to fetch them.
        </div>
      ) : (
        state.products.map(product => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => methods.addToCart(product.id)}>
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;