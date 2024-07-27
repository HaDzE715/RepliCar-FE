import React, { useEffect } from "react";
import { useCart } from "../Components/CartContext";
import "../Style/CartPage.css"; // Make sure to create and import the CSS file

const CartPage = () => {
  const { cart, dispatch } = useCart();

  useEffect(() => {
    console.log("Current cart state after removal:", cart);
  }, [cart]); // This will log the updated cart state whenever it changes

  const handleRemoveFromCart = (_id) => {
    console.log("Removing item with id:", _id);
    console.log("Current cart state before removal:", cart);
    dispatch({ type: "REMOVE_FROM_CART", id: _id });
  };

  return (
    <div className="cart-page">
      <h2 style={{marginBottom:"20px"}}>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                {item.discount ? (
                  <div>
                    <p className="original-price">{item.price}₪</p>
                    <p className="discount-price">{item.discount_price}₪</p>
                  </div>
                ) : (
                  <p>{item.price}₪</p>
                )}
                <button onClick={() => handleRemoveFromCart(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
