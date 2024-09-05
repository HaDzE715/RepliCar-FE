import React, { useEffect } from "react";
import "../Style/PaymentSuccessPage.css";
import { useCart } from "../Components/CartContext";
import axios from "axios";
import ProgressBar from "../Components/ProgressBar";

const PaymentSuccessPage = () => {
  const { dispatch } = useCart();
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  const {
    clientName = "",
    orderNumber = "",
    email = "",
    phone = "",
    shippingAddress = { streetAddress: "", city: "" }, // Ensure this matches backend
    orderNotes = "",
    products = [],
    totalPrice = 0,
  } = orderDetails || {};

  useEffect(() => {
    dispatch({ type: "CLEAR_CART" });

    const createOrder = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/orders`,
          {
            user: { name: clientName, email, phone },
            products, // Ensure products is an array of { product: productId, quantity }
            orderNumber,
            totalPrice,
            shippingAddress: {
              streetAddress: shippingAddress.streetAddress,
              city: shippingAddress.city,
            }, // Correctly formatted shipping address
            orderNotes,
          }
        );
        console.log("Order created:", response.data);
      } catch (error) {
        console.error("Error creating order:", error);
      }
    };

    createOrder();
  }, [
    dispatch,
    clientName,
    orderNumber,
    email,
    phone,
    shippingAddress.streetAddress, // Track changes to individual fields
    shippingAddress.city,
    products,
    totalPrice,
    orderNotes,
  ]);
  console.log(
    "Order details saved to localStorage:",
    localStorage.getItem("orderDetails")
  );

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
