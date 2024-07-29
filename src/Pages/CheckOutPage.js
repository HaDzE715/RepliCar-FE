import React, { useState } from "react";
import { useCart } from "../Components/CartContext";
import "../Style/CheckoutPage.css";

const CheckoutPage = () => {
  const { cart, dispatch } = useCart();
  const [isCartVisible, setIsCartVisible] = useState(false);

  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateShipping = () => {
    return cart.length > 0 ? 20 : 0; // Example fixed shipping cost
  };

  const calculateTotalPrice = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleRemoveFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  const handleIncreaseQuantity = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", id });
  };

  const handleDecreaseQuantity = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", id });
  };

  return (
    <div className="checkout-page">
      <div className={`checkout-header ${isCartVisible ? "expanded" : ""}`}>
        <div className="checkout-summary">
          <span className="product-quantity">
            כמות מוצרים - {calculateTotalQuantity()}
          </span>
          <span className="total-price">סך הכל - {calculateTotalPrice()}₪</span>
        </div>
        <button onClick={toggleCartVisibility} className="view-cart-link">
          לחץ לצפייה בעגלה{" "}
          <span className={`arrow ${isCartVisible ? "up" : "down"}`}></span>
        </button>
      </div>
      {isCartVisible && (
        <div className="checkout-cart-dropdown">
          <div className="checkout-cart-items">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item._id} className="checkout-cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="checkout-cart-item-details">
                    <h3>{item.name}</h3>
                    <p>כמות: {item.quantity}</p>
                    <p>מחיר: {item.price}₪</p>
                    <div className="checkout-cart-action-section">
                      <div className="checkout-cart-quantity-section">
                        <button
                          onClick={() => handleIncreaseQuantity(item._id)}
                        >
                          +
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleDecreaseQuantity(item._id)}
                        >
                          -
                        </button>
                      </div>
                      <button
                        className="checkout-cart-remove-button"
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        מחק
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ fontFamily: "Noto Sans Hebrew" }}>אין מוצרים בעגלה</p>
            )}
          </div>
          <div className="checkout-cart-totals">
            <div className="totals-row">
              <span>סכום ביניים:</span>
              <span>{calculateSubtotal()}₪</span>
            </div>
            <div className="totals-row">
              <span>משלוח:</span>
              <span>{calculateShipping()}₪</span>
            </div>
            <div className="totals-row">
              <span style={{ fontWeight: "600" }}>סך הכל:</span>
              <span style={{ fontWeight: "600" }}>
                {calculateTotalPrice()}₪
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
