import React, { useEffect, useState } from "react";
import "../Style/PaymentSuccessPage.css";
import { useCart } from "../Components/CartContext";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
import ProgressBar from "../Components/ProgressBar";

const PaymentSuccessPage = () => {
  const { dispatch } = useCart();
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const location = useLocation();
  const [orderCreated, setOrderCreated] = useState(false); // Flag to ensure order is created only once

  const transactionUid = new URLSearchParams(location.search).get(
    "transaction_uid"
  ); // Get the transaction UID from the URL

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
    const verifyTransactionAndCreateOrder = async () => {
      try {
        // Check transaction validity from the backend
        const verifyResponse = await axios.post(
          "https://restapi.payplus.co.il/api/v1.0/TransactionReports/TransactionsApproval",
          {
            terminal_uid: process.env.TERMINAL_UID,
            filter: {
              uuid: transactionUid,
            },
            currency_code: "ILS",
          }
        );

        // If the transaction is invalid, redirect the user to the homepage
        if (verifyResponse.data.transactions.length === 0) {
          console.error("Transaction is invalid, redirecting to home");
          navigate("/"); // Redirect to homepage
          return;
        }

        // If the transaction is valid, create the order
        const createOrderResponse = await axios.post(
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
            transactionUid, // Add the transactionUid to track the transaction
          }
        );
        console.log("Order created:", createOrderResponse.data);

        // Clear the cart after the order is successfully created
        dispatch({ type: "CLEAR_CART" });

        // Mark order as created to avoid multiple requests
        setOrderCreated(true);
      } catch (error) {
        console.error(
          "Error creating order:",
          error.response?.data || error.message
        );
        navigate("/"); // Redirect to homepage if any error occurs
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
      transactionUid &&
      !orderCreated // Ensure the order is only created once
    ) {
      verifyTransactionAndCreateOrder();
    } else if (!clientName || !orderNumber) {
      console.error("Missing required order details.");
      navigate("/"); // Redirect if order details are missing
    }
  }, [
    dispatch,
    clientName,
    email,
    phone,
    products,
    shippingAddress.streetAddress,
    shippingAddress.city,
    orderNumber,
    totalPrice,
    orderNotes,
    orderCreated,
    transactionUid, // Track transaction UID changes
    navigate, // Ensure navigate is in the dependency array
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
