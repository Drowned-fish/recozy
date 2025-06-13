// demo/src/advanced/shopping/App.tsx
import React from 'react';
import ProductList from './components/productList';
import Cart from './components/cart';
import './index.css';

const ShoppingApp: React.FC = () => {
  return (
    <div className="shopping-app">
      <div className="main-content">
        <ProductList />
      </div>
      <Cart />
    </div>
  );
};

export default ShoppingApp;