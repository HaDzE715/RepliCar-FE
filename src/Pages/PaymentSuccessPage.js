import React, { useEffect } from "react";
import "../Style/PaymentSuccessPage.css"; // Ensure this import is correct
import { useLocation } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import ProgressBar from "../Components/ProgressBar";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const { clientName, orderNumber } = location.state || {};
  const { dispatch } = useCart();

  // Clear the cart when the page loads
  useEffect(() => {
    dispatch({ type: "CLEAR_CART" });
  }, [dispatch]);

  return (
    <div className="payment-success-container">
      <ProgressBar currentStep="3" />
      <div className="success-box">
        <div className="success-message-container">
          <h1 className="success-message-title">
            היי {clientName} 👋, ההזמנה שלך התקבלה!
          </h1>
          <h2 className="delivery-info">
            השליח יתקשר אליך לפני הגעה, זה בערך תוך 3-7 ימים עסקים.
          </h2>
          <p className="success-message-text">
            מספר ההזמנה שלך הוא {orderNumber}.
          </p>
        </div>
        <div className="payment-animation">
          <svg width="150" height="150">
            <circle
              fill="none"
              stroke="#68E534"
              strokeWidth="2"
              cx="75"
              cy="75"
              r="65"
              strokeLinecap="round"
              transform="rotate(-90 75 75)"
              className="success-circle"
            />
            <polyline
              fill="none"
              stroke="#68E534"
              points="45,80 65,100 105,55"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="success-tick"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
