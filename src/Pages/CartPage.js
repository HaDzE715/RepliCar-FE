import React, { useEffect } from "react";
import { useCart } from "../Components/CartContext";
import "../Style/CartPage.css"; // Make sure to create and import the CSS file
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current cart state after removal:", cart);
  }, [cart]); // This will log the updated cart state whenever it changes

  const handleRemoveFromCart = (_id) => {
    console.log("Removing item with id:", _id);
    console.log("Current cart state before removal:", cart);
    dispatch({ type: "REMOVE_FROM_CART", id: _id });
  };

  const handleIncreaseQuantity = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", id });
  };

  const handleDecreaseQuantity = (id) => {
    const product = cart.find((item) => item._id === id);
    if (product.quantity === 1) {
      handleRemoveFromCart(id);
    } else {
      dispatch({ type: "DECREASE_QUANTITY", id });
    }
  };

  const calculateSubtotal = () => {
    return cart
      .reduce((total, item) => {
        const itemPrice = item.discount ? item.discount_price : item.price;
        return total + itemPrice * item.quantity;
      }, 0)
      .toFixed(2); // Ensure two decimal places
  };

  const calculateShipping = () => {
    return 0;
  };

  const calculateTotal = () => {
    return (parseFloat(calculateSubtotal()) + calculateShipping()).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    // Scroll to the top using getElementById
    const element = document.getElementById("cart-page");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Navigate to the checkout page after the scroll
    setTimeout(() => {
      navigate("/checkout");
    }, 100);
  };

  return (
    <div id="cart-page" className="cart-page">
      <h2
        style={{
          marginBottom: "20px",
          fontFamily: "Noto Sans Hebrew",
          direction: "rtl",
        }}
      >
        הסל שלך
      </h2>
      {cart.length === 0 ? (
        <p style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}>
          הסל שלך ריק.
        </p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                {item.discount ? (
                  <div>
                    <p className="cart-original-price">{item.price}₪</p>
                    <p className="cart-discount-price">
                      {item.discount_price}₪
                    </p>
                  </div>
                ) : (
                  <p>{item.price}₪</p>
                )}
                <div className="cart-action-section">
                  <div className="cart-quantity-section">
                    <button onClick={() => handleDecreaseQuantity(item._id)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(item._id)}>
                      +
                    </button>
                  </div>
                  <button
                    className="cart-remove-button"
                    onClick={() => handleRemoveFromCart(item._id)}
                    style={{
                      fontFamily: "Noto Sans Hebrew",
                      direction: "rtl",
                    }}
                  >
                    מחק
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-totals">
        <div className="totals-row">
          <span className="totals-text">סיכום ביניים:</span>
          <span className="totals-text" style={{ fontSize: "16px" }}>
            {calculateSubtotal()}₪
          </span>
        </div>
        <div className="totals-row">
          <span className="totals-text">משלוח וטיפול:</span>
          <span className="totals-text" style={{ fontSize: "16px" }}>
            {calculateShipping()}₪
          </span>
        </div>
        <div className="totals-row">
          <span className="totals-text">סך הכל:</span>
          <span className="totals-text" style={{ fontSize: "16px" }}>
            {calculateTotal()}₪
          </span>
        </div>
        <button className="checkout-button" onClick={handleProceedToCheckout}>
          המשך לקופה
        </button>
      </div>
    </div>
  );
};

export default CartPage;
