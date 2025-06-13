import React from 'react';
import useShoppingStore from '../store';

const Cart: React.FC = () => {
  const [state, methods] = useShoppingStore.useUniqueState();

  console.log('Cart state:', state.cart); 

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {state.cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {state.cart.map(item => {
            const product = state.products.find(p => p.id === item.productId);
            if (!product) return null;

            return (
              <div key={item.productId} className="cart-item">
                <span>{product.name}</span>
                <span>Quantity: {item.quantity}</span>
                <span>${product.price * item.quantity}</span>
                <button onClick={() => methods.removeFromCart(item.productId)}>
                  Remove
                </button>
              </div>
            );
          })}
          <div className="cart-total">
            <h3>Total: ${state.cartTotal}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;