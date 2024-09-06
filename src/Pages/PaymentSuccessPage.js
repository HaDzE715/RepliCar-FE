import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import navigate to redirect
import "../Style/PaymentSuccessPage.css";
import { useCart } from "../Components/CartContext";
import axios from "axios";
import ProgressBar from "../Components/ProgressBar";

const PaymentSuccessPage = () => {
  const { dispatch } = useCart();
  const [orderCreated, setOrderCreated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  const {
    clientName = "",
    orderNumber = "",
    email = "",
    phone = "",
    shippingAddress = { streetAddress: "", city: "" },
    orderNotes = "",
    products = [],
    totalPrice = 0,
  } = orderDetails || {};

  useEffect(() => {
    const getQueryParams = (param) => {
      return new URLSearchParams(location.search).get(param);
    };

    const transaction_uid = getQueryParams("transaction_uid");
    const status = getQueryParams("status");

    console.log("Query param transaction_uid:", transaction_uid);
    console.log("Query param status:", status);

    // Redirect to homepage if transaction_uid is missing or status is not 'approved'
    if (!transaction_uid || status !== "approved") {
      console.error(
        "Missing transaction_uid or status not approved. Redirecting to homepage."
      );
      navigate("/"); // Redirect to homepage
      return;
    }

    console.log("Transaction UID:", transaction_uid);
    console.log("Status:", status);

    const createOrder = async () => {
      try {
        console.log("Creating order with details:", {
          clientName,
          email,
          phone,
          orderNumber,
          totalPrice,
          shippingAddress,
          products,
        });

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/orders`,
          {
            user: { name: clientName, email, phone },
            products,
            orderNumber,
            totalPrice,
            shippingAddress: {
              streetAddress: shippingAddress.streetAddress,
              city: shippingAddress.city,
            },
            orderNotes,
          }
        );
        console.log("Order created successfully:", response.data);

        // Clear the cart after the order is successfully created
        dispatch({ type: "CLEAR_CART" });
        setOrderCreated(true);
      } catch (error) {
        console.error(
          "Error creating order:",
          error.response?.data || error.message
        );
      }
    };

    // Only create the order if all the necessary data is present and the order hasn't been created yet
    if (
      clientName &&
      email &&
      phone &&
      products.length > 0 &&
      shippingAddress.streetAddress &&
      shippingAddress.city &&
      orderNumber &&
      !orderCreated
    ) {
      console.log(
        "All required order details present. Proceeding to create order..."
      );
      createOrder();
    } else {
      console.error("Missing required order details. Cannot create order.");
    }
  }, [
    dispatch,
    clientName,
    email,
    phone,
    products,
    shippingAddress,
    shippingAddress.streetAddress,
    shippingAddress.city,
    orderNumber,
    totalPrice,
    orderNotes,
    orderCreated,
    navigate,
    location.search, // Track changes in query parameters
  ]);

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
