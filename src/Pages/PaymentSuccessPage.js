import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import navigate to redirect
import "../Style/PaymentSuccessPage.css";
import { useCart } from "../Components/CartContext";
import axios from "axios";
import ProgressBar from "../Components/ProgressBar";

const PaymentSuccessPage = () => {
  const { cart, dispatch } = useCart(); // Use the cart from context
  const [orderCreated, setOrderCreated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || {}; // Default to empty object if not found
  const {
    clientName = "",
    orderNumber = "",
    email = "",
    phone = "",
    shippingAddress = { streetAddress: "", city: "" },
    orderNotes = "",
    totalPrice = 0,
  } = orderDetails;

  useEffect(() => {
    const getQueryParams = (param) => {
      const value = new URLSearchParams(location.search).get(param);
      return value;
    };

    const transaction_uid = getQueryParams("transaction_uid");
    const status = getQueryParams("status");

    // Redirect to homepage if transaction_uid is missing or status is not 'approved'
    if (!transaction_uid || status !== "approved") {
      console.warn(
        "Transaction UID missing or status not approved. Redirecting..."
      );
      navigate("/"); // Redirect to homepage
      return;
    }

    const createOrder = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/orders`,
          {
            user: { name: clientName, email, phone },
            products: cart.map((item) => ({
              product: item._id, // Assuming each product in the cart has an _id
              quantity: item.quantity,
            })), // Use the cart for products
            orderNumber,
            totalPrice,
            shippingAddress: {
              streetAddress: shippingAddress.streetAddress,
              city: shippingAddress.city,
            },
            orderNotes,
            transaction_uid,
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

    if (
      clientName &&
      email &&
      phone &&
      cart.length > 0 && // Check if the cart has items
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
    cart, // Include cart in dependency array
    shippingAddress,
    shippingAddress.streetAddress,
    shippingAddress.city,
    orderNumber,
    totalPrice,
    orderNotes,
    orderCreated,
    navigate, // Track changes in navigate for redirects
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
