import React, { useState, useEffect, useMemo, useRef } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import "../Style/CardDetailsPage.css";
import ProgressBar from "../Components/ProgressBar";
import ReactGA from "react-ga";
import { FaCcVisa, FaCcAmex } from "react-icons/fa";
import { SiMastercard } from "react-icons/si";
import { v4 as uuidv4 } from "uuid";

// Environment variables (would be in .env file)
const SUPPLIER_ID = process.env.REACT_APP_TRANZILA_SUPPLIER_ID;

// Cache configurations
const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
  key: "mui",
});

const CardDetailsPage = () => {
  const [rtl] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract data with validation
  const { totalQuantity, totalPrice } = location.state || {};

  // Validate required data
  useEffect(() => {
    if (!location.state || !totalPrice || totalPrice <= 0) {
      setError("נתוני הזמנה חסרים או לא תקינים");
      ReactGA.exception({
        description: "Missing or invalid order data",
        fatal: false,
      });
    } else {
      setLoading(false);
    }
  }, [location.state, totalPrice]);

  // Retrieve orderDetails from localStorage with error handling
  const orderDetails = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("orderDetails")) || {};
    } catch (e) {
      console.error("Error parsing orderDetails from localStorage:", e);
      ReactGA.exception({
        description: "Error parsing localStorage data",
        fatal: false,
      });
      return {};
    }
  }, []);

  const { orderNumber = "N/A" } = orderDetails;

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  // Generate unique transaction ID using UUID instead of timestamp
  const transactionId = useMemo(() => uuidv4(), []);

  // URL configurations
  const baseUrl = window.location.origin;
  const successUrl = `${baseUrl}/payment-success?status=approved&transaction_uid=${transactionId}`;
  const failUrl = `${baseUrl}/payment-failed?transaction_uid=${transactionId}`;
  const notifyUrl = `${baseUrl}/api/payment-notification`; // Server endpoint for payment notifications

  const iframeRef = useRef(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Build iframe source - leave cust_id empty for Tranzila to handle
  const iframeSrc = useMemo(() => {
    if (
      !SUPPLIER_ID ||
      !totalPrice ||
      !transactionId ||
      !successUrl ||
      !failUrl
    ) {
      console.error("Missing required parameters for Tranzila iFrame", {
        supplier: SUPPLIER_ID,
        totalPrice,
        transactionId,
        successUrl,
        failUrl,
      });
      return "";
    }

    const params = new URLSearchParams({
      sum: totalPrice,
      currency: 1,
      myid: "",
      cred_type: 1,
      tranmode: "A",
      success_url_address: successUrl,
      fail_url_address: failUrl,
      notify_url_address: notifyUrl,
      buttonLabel: "שלם עכשיו!",
      hidesum: 1,
      nologo: 1,
      lang: "il",
      trButtonColor: "006400",
    });

    return `https://direct.tranzila.com/${SUPPLIER_ID}/iframenew.php?${params.toString()}`;
  }, [totalPrice, transactionId, successUrl, failUrl, notifyUrl]);

  // Handle iframe loading errors
  const handleIframeError = () => {
    setIframeLoaded(false);
    setError("שגיאה בטעינת ממשק התשלום. אנא נסה שנית מאוחר יותר.");
    ReactGA.exception({
      description: "Payment iframe failed to load",
      fatal: true,
    });
  };

  // Handle back to cart
  const handleBackToCart = () => {
    navigate("/cart");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="card-details-page">
      <ProgressBar currentStep="2" />
      <CacheProvider value={rtl ? rtlCache : ltrCache}>
        {error ? (
          <Box sx={{ maxWidth: "500px", margin: "20px auto", padding: "20px" }}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <button
                onClick={handleBackToCart}
                className="back-button"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                חזרה לסל הקניות
              </button>
            </Box>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                padding: "20px",
                boxSizing: "border-box",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "500px",
                  mb: 4,
                  p: 2,
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                  fontFamily: "Noto Sans Hebrew",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 1, fontFamily: "Noto Sans Hebrew" }}
                >
                  מספר הזמנה: {orderNumber}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 1, fontFamily: "Noto Sans Hebrew" }}
                >
                  תאריך: {new Date().toLocaleDateString()}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 1, fontFamily: "Noto Sans Hebrew" }}
                >
                  מספר מוצרים: {totalQuantity || 0}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontFamily: "Noto Sans Hebrew" }}
                >
                  סה"כ לתשלום: {totalPrice || 0}₪
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  maxWidth: "500px",
                  p: 2,
                  fontFamily: "Noto Sans Hebrew",
                  textAlign: "center",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    mb: 2,
                    fontFamily: "Noto Sans Hebrew",
                    fontSize: "24px",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  תשלום בכרטיס אשראי
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 1,
                    color: "#2d2d2d",
                  }}
                >
                  <FaCcVisa size={40} color="#1A1F71" />
                  <SiMastercard size={40} color="#F79E1B" />
                  <FaCcAmex size={40} color="#007BC1" />
                </Box>

                <Typography
                  variant="body2"
                  sx={{ mt: 2, color: "#666", fontSize: "13px" }}
                >
                  העסקה מאובטחת ע"י מערכת תשלומים Tranzila
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                width: "100%",
                maxWidth: "600px",
                margin: "auto",
                position: "relative",
              }}
            >
              {!iframeLoaded && iframeSrc && (
                <Box sx={{ textAlign: "center", my: 2 }}>
                  <CircularProgress size={30} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    טוען ממשק תשלום מאובטח...
                  </Typography>
                </Box>
              )}

              {iframeSrc && (
                <iframe
                  ref={iframeRef}
                  src={iframeSrc}
                  title="Tranzila Payment"
                  allowpaymentrequest="true"
                  width="100%"
                  height="450"
                  style={{
                    border: "none",
                    display: iframeLoaded ? "block" : "none",
                    pointerEvents: "auto", // Ensure the iframe is interactive
                    position: "relative", // Make sure it sits correctly in layout
                  }}
                  onLoad={() => setIframeLoaded(true)}
                  onError={handleIframeError}
                ></iframe>
              )}
            </Box>
          </>
        )}
      </CacheProvider>
    </div>
  );
};

export default CardDetailsPage;
