import React, { useState, useEffect } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import "../Style/CardDetailsPage.css";
import ProgressBar from "../Components/ProgressBar";
import ReactGA from "react-ga";

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
  key: "mui",
});

const CardDetailsPage = () => {
  const [rtl] = useState(true);
  const location = useLocation();
  const { totalQuantity, totalPrice, paymentLink } = location.state || {
    cart: [],
    clientData: {},
    totalQuantity: 0,
    totalPrice: 0,
  };

  // Retrieve orderDetails from localStorage
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || {};

  const { orderNumber = "" } = orderDetails;

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  });
  console.log(paymentLink);
  return (
    <div className="card-details-page">
      <ProgressBar currentStep="2" />
      <CacheProvider value={rtl ? rtlCache : ltrCache}>
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
              מספר מוצרים: {totalQuantity}
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: "Noto Sans Hebrew" }}>
              סה"כ לתשלום: {totalPrice}₪
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              maxWidth: "500px",
              p: 2,
              fontFamily: "Noto Sans Hebrew",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                mb: 2,
                fontFamily: "Noto Sans Hebrew",
                fontSize: "24px",
                fontWeight: "400",
                marginBottom: "0px",
              }}
            >
              תשלום בכרטיס אשראי
            </Typography>
          </Box>
        </Box>
        <iframe
          src={paymentLink}
          title="Payment Form"
          allow="payment"
          style={{
            width: "100%",
            height: "710px",
            border: "none",
            marginTop: "-40px",
          }}
        ></iframe>
      </CacheProvider>
    </div>
  );
};

export default CardDetailsPage;
