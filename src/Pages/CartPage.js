import React, { useEffect, useState, useRef } from "react";
import { useCart } from "../Components/CartContext";
import "../Style/CartPage.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const timeoutRef = useRef(null); // Track timeout ID
  const errorActiveRef = useRef(false); // Track whether an error is active

  useEffect(() => {
    console.log("Current cart state after removal:", cart);
  }, [cart]); 

  const handleRemoveFromCart = (_id) => {
    console.log("Removing item with id:", _id);
    console.log("Current cart state before removal:", cart);
    dispatch({ type: "REMOVE_FROM_CART", id: _id });
  };

  const handleIncreaseQuantity = async (id) => {
    try {
      // Find the product in the cart
      const productInCart = cart.find((item) => item._id === id);
      let cart_quantity = productInCart ? productInCart.quantity : 1;

      // Call your API to get the product details by ID
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/products/${id}`
      );
      const product = await response.json();

      if (cart_quantity >= product.quantity) {
        // If the error message is already active, do not set a new one
        if (!errorActiveRef.current) {
          setErrorMessage(
            `המלאי מוגבל. אינך יכול להוסיף יותר מ-${product.quantity} יחידות.`
          );
          errorActiveRef.current = true;
          console.log("First trigger");

          // Clear any existing timeout to prevent multiple timeouts from being set
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          // Set a timeout to clear the message after 2 seconds
          timeoutRef.current = setTimeout(() => {
            setErrorMessage("");
            errorActiveRef.current = false; // Allow future errors
            timeoutRef.current = null; // Reset the timeout ref
          }, 2000);
        }
      } else {
        // Clear the error message if allowed to add
        cart_quantity++;
        setErrorMessage("");
        errorActiveRef.current = false; // Reset the error state
        dispatch({ type: "INCREASE_QUANTITY", id });
      }
    } catch (error) {
      console.error("Error fetching product data:", error);

      // If an error message is not already active
      if (!errorActiveRef.current) {
        setErrorMessage("שגיאה בטעינת המוצר. נסה שנית מאוחר יותר.");
        errorActiveRef.current = true;

        // Clear any existing timeout before setting a new one
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setErrorMessage("");
          errorActiveRef.current = false; // Allow future errors
          timeoutRef.current = null; // Reset the timeout ref
        }, 2000);
      }
    }
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
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        items: cart.map((item) => ({
          item_name: item.name,
          item_id: item._id,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    });
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
            חינם!
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
      {/* Error message popup */}
      {errorMessage && <div className="error-popup">{errorMessage}</div>}
    </div>
  );
};

export default CartPage;
