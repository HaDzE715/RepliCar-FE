import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Style/PaymentSuccessPage.css";
import { useCart } from "../Components/CartContext";
import axios from "axios";
import ProgressBar from "../Components/ProgressBar";
import ReactGA from "react-ga";

const PaymentSuccessPage = () => {
  if (window.top !== window.self) {
    window.top.location.href = window.location.href;
    // return null;
  }

  const { cart, dispatch } = useCart();
  const [orderCreated, setOrderCreated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || {}; // Default to empty object if not found
  const storedImages = useMemo(() => {
    return JSON.parse(localStorage.getItem("uploadedImages")) || [];
  }, []);
  const uploadedImages = storedImages.map((image) => image.url);
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
      if (orderCreated) return;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/orders`,
          {
            user: { name: clientName, email, phone },
            products: cart.map((item) => ({
              product: item._id,
              quantity: item.quantity,
              variant: item.selectedVariant ? item.selectedVariant : null,
            })),
            orderNumber,
            totalPrice,
            shippingAddress: {
              streetAddress: shippingAddress.streetAddress,
              city: shippingAddress.city,
            },
            orderNotes,
            transaction_uid,
            uploadedImages,
          }
        );
        setOrderCreated(true);
        console.log("Order created successfully:", response.data);

        // Clear the cart after the order is successfully created
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
      localStorage.removeItem("uploadedImages");
      dispatch({ type: "CLEAR_CART" });
    } else {
      console.error("Missing required order details. Cannot create order.");
    }
  }, [
    dispatch,
    clientName,
    email,
    phone,
    cart,
    shippingAddress,
    shippingAddress.streetAddress,
    shippingAddress.city,
    orderNumber,
    totalPrice,
    orderNotes,
    orderCreated,
    navigate, // Track changes in navigate for redirects
    location.search, // Track changes in query parameters
    uploadedImages,
  ]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  });
  return (
    <div className="payment-success-container">
      <ProgressBar currentStep="3" />
      <div className="success-box">
        <div className="success-message-container">
          <h1 className="success-message-title">
            היי {clientName} 👋, ההזמנה שלך התקבלה!
          </h1>
          <h2 className="delivery-info">
            השליח יצור איתך קשר לפני ההגעה, וזמן האספקה הוא בין 3 ל-7 ימי עסקים.
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
