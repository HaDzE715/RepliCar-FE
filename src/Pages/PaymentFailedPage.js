import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/PaymentSuccessPage.css"; // Reusing the same CSS
import ProgressBar from "../Components/ProgressBar";
import ReactGA from "react-ga";

const PaymentFailedPage = () => {
  //   const location = useLocation();
  const navigate = useNavigate();

  // Get query parameters
  //   const urlParams = new URLSearchParams(location.search);
  //   const transactionUid = urlParams.get("transaction_uid");

  useEffect(() => {
    // Log navigation for debugging
    console.log("PaymentFailedPage mounted, URL:", window.location.href);

    // Handle iframe case more reliably
    if (window.top !== window.self) {
      try {
        console.log("Page loaded in iframe, attempting to break out");
        window.top.location.href = window.location.href;
        return;
      } catch (e) {
        console.error("Failed to break out of iframe:", e);
      }
    }

    // Track page view
    ReactGA.pageview(window.location.pathname);
  }, []);

  // Get client name for display
  const orderDetails = (() => {
    try {
      return JSON.parse(localStorage.getItem("orderDetails")) || {};
    } catch (e) {
      return {};
    }
  })();

  const { clientName = "לקוח יקר" } = orderDetails;

  const handleReturnToCheckout = () => {
    navigate("/checkout");
  };

  const handleReturnToHome = () => {
    navigate("/");
  };

  return (
    <div
      className="payment-success-container"
      style={{ height: "auto", minHeight: "50vh" }}
    >
      <ProgressBar currentStep="3" isPaymentFailed={true} />
      <div className="success-box error">
        <div className="success-message-container">
          <h1 className="success-message-title">
            היי {clientName} 👋, התשלום לא הושלם
          </h1>
          <h2 className="delivery-info">
            לצערנו, התשלום נכשל. זה יכול לקרות מסיבות שונות כגון:
          </h2>
          <ul style={{ textAlign: "right", paddingRight: "20px" }}>
            <li>מגבלת מסגרת אשראי</li>
            <li>פרטי כרטיס אשראי שגויים</li>
          </ul>
          <p className="success-message-text" style={{ marginTop: "10px" }}>
            ניתן לנסות שוב או ליצור איתנו קשר לעזרה.
          </p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <button
              onClick={handleReturnToCheckout}
              style={{
                backgroundColor: "#4169E1",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "10px 15px",
                cursor: "pointer",
              }}
            >
              לנסות שוב
            </button>
            <button
              onClick={handleReturnToHome}
              style={{
                backgroundColor: "#f5f5f5",
                color: "#333",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "10px 15px",
                cursor: "pointer",
              }}
            >
              חזרה לדף הבית
            </button>
          </div>
        </div>
        <div className="payment-animation">
          <svg width="150" height="150">
            <circle
              fill="none"
              stroke="#FF4136"
              strokeWidth="2"
              cx="75"
              cy="75"
              r="65"
              strokeLinecap="round"
              transform="rotate(-90 75 75)"
              className="success-circle"
              style={{ stroke: "#FF4136" }}
            />
            <path
              fill="none"
              stroke="#FF4136"
              d="M45,45 L105,105 M105,45 L45,105"
              strokeWidth="3"
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

export default PaymentFailedPage;
