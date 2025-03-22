import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Style/PaymentSuccessPage.css";
import { useCart } from "../Components/CartContext";
import axios from "axios";
import ProgressBar from "../Components/ProgressBar";
import ReactGA from "react-ga";

const PaymentSuccessPage = () => {
  const { cart, dispatch } = useCart();
  const [orderCreated, setOrderCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const orderCreationAttempted = useRef(false);

  // Get query parameters once on component mount
  const urlParams = new URLSearchParams(location.search);
  const transactionUid = urlParams.get("transaction_uid");
  const status = urlParams.get("status");

  // Memoize the processOrder function with useCallback
  const processOrder = useCallback(() => {
    // Log navigation for debugging
    console.log("PaymentSuccessPage mounted, URL:", window.location.href);

    // Skip if we've already attempted to create an order
    if (orderCreationAttempted.current) {
      console.log("Order creation already attempted, skipping");
      return;
    }

    // Mark that we've attempted order creation - this prevents multiple attempts
    orderCreationAttempted.current = true;

    // Handle iframe case more reliably
    if (window.top !== window.self) {
      try {
        console.log("Page loaded in iframe, attempting to break out");
        // Store transaction info in sessionStorage before breaking out
        if (transactionUid && status) {
          sessionStorage.setItem("payment_transaction_uid", transactionUid);
          sessionStorage.setItem("payment_status", status);
        }
        window.top.location.href = window.location.href;
        return;
      } catch (e) {
        console.error("Failed to break out of iframe:", e);
        // Continue execution if we can't break out
      }
    }

    // Check for parameters in URL or fallback to sessionStorage
    const effectiveTransactionUid =
      transactionUid || sessionStorage.getItem("payment_transaction_uid");
    const effectiveStatus = status || sessionStorage.getItem("payment_status");

    console.log(
      "Transaction UID:",
      effectiveTransactionUid,
      "Status:",
      effectiveStatus
    );

    // Redirect to homepage if transaction info is missing
    if (!effectiveTransactionUid || effectiveStatus !== "approved") {
      console.warn(
        "Transaction UID missing or status not approved. Redirecting..."
      );
      navigate("/");
      return;
    }

    // Clear sessionStorage after use
    sessionStorage.removeItem("payment_transaction_uid");
    sessionStorage.removeItem("payment_status");

    // Get order details from localStorage
    let orderDetails;
    try {
      orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || {};
      console.log("Retrieved order details:", orderDetails);
    } catch (e) {
      console.error("Error parsing orderDetails:", e);
      orderDetails = {};
    }

    // Get uploaded images from localStorage
    let uploadedImages = [];
    try {
      const storedImages =
        JSON.parse(localStorage.getItem("uploadedImages")) || [];
      uploadedImages = storedImages.map((image) => image.url);
      console.log("Retrieved uploaded images:", uploadedImages);
    } catch (e) {
      console.error("Error parsing uploadedImages:", e);
    }

    const {
      clientName = "",
      orderNumber = "",
      email = "",
      phone = "",
      shippingAddress = { streetAddress: "", city: "" },
      orderNotes = "",
      totalPrice = 0,
    } = orderDetails;

    // Create order function
    const createOrder = async () => {
      // Check if we've already created this order
      if (orderCreated) {
        console.log("Order already created, skipping");
        return;
      }

      // Check if this order has been processed before (across page reloads)
      const orderStorageKey = `order_processed_${orderNumber}_${effectiveTransactionUid}`;
      if (localStorage.getItem(orderStorageKey)) {
        console.log("Order was already processed previously, skipping");
        setOrderCreated(true);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        console.log(
          "Attempting to create order with transaction_uid:",
          effectiveTransactionUid
        );

        // Validate cart before sending
        if (!cart || cart.length === 0) {
          console.error("Cart is empty, cannot create order");
          setError("לא ניתן ליצור הזמנה. סל הקניות ריק");
          setIsLoading(false);
          return;
        }

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
            transaction_uid: effectiveTransactionUid,
            uploadedImages,
          }
        );

        console.log("Order created successfully:", response.data);
        setOrderCreated(true);

        // Mark this order as processed to prevent duplicate creation
        localStorage.setItem(orderStorageKey, "true");

        // Clear data after successful order
        localStorage.removeItem("uploadedImages");
        dispatch({ type: "CLEAR_CART" });
      } catch (error) {
        // Check if error is due to duplicate order
        if (error.response?.data?.message?.includes("duplicate key error")) {
          console.log(
            "This appears to be a duplicate order, marking as created"
          );
          setOrderCreated(true);
          localStorage.setItem(orderStorageKey, "true");
        } else {
          console.error(
            "Error creating order:",
            error.response?.data || error.message
          );
          setError("אירעה שגיאה ביצירת ההזמנה. אנא צור קשר עם שירות הלקוחות");
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Check if we have all required data to create an order
    const hasRequiredData =
      clientName &&
      email &&
      phone &&
      cart &&
      cart.length > 0 &&
      shippingAddress.streetAddress &&
      shippingAddress.city &&
      orderNumber;

    if (hasRequiredData) {
      console.log("All required order details present. Creating order...");
      createOrder();
    } else {
      console.error("Missing required order details. Cannot create order.");
      // List what's missing for debugging
      console.error("Missing fields:", {
        clientName: !clientName,
        email: !email,
        phone: !phone,
        cart: !cart || cart.length === 0,
        streetAddress: !shippingAddress.streetAddress,
        city: !shippingAddress.city,
        orderNumber: !orderNumber,
      });
      setError("נתוני הזמנה חסרים. אנא נסה להזמין שוב");
      setIsLoading(false);
    }

    // Track page view
    ReactGA.pageview(window.location.pathname);
  }, [cart, dispatch, navigate, orderCreated, status, transactionUid]);

  // Execute the order processing function once on component mount
  useEffect(() => {
    processOrder();
  }, [processOrder]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="payment-success-container">
        <ProgressBar currentStep="3" />
        <div className="success-box loading">
          <div className="loading-spinner"></div>
          <p>מעבד את ההזמנה שלך...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="payment-success-container">
        <ProgressBar currentStep="3" />
        <div className="success-box error">
          <div className="error-icon">❌</div>
          <h2>שגיאה בעיבוד ההזמנה</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/")}>חזרה לדף הבית</button>
        </div>
      </div>
    );
  }

  // Get client name for display
  const orderDetails = (() => {
    try {
      return JSON.parse(localStorage.getItem("orderDetails")) || {};
    } catch (e) {
      return {};
    }
  })();

  const { clientName = "לקוח יקר", orderNumber = "" } = orderDetails;

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
