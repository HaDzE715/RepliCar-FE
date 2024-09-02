import React, { useState } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import axios from "axios";
import "../Style/CardDetailsPage.css"; // Ensure this import is correct
import ProgressBar from "../Components/ProgressBar";

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
  key: "mui",
});

const CardDetailsPage = () => {
  const [rtl] = useState(true); // Set initial state to true for Hebrew RTL
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, clientData, totalQuantity, totalPrice } = location.state || {
    cart: [],
    clientData: {}, // Add this line to define clientData
    totalQuantity: 0,
    totalPrice: 0,
  };

  const orderNumber = Math.floor(1000 + Math.random() * 90000);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cart || cart.length === 0) {
      alert("Cart is empty or not available.");
      return;
    }

    const formData = new FormData(event.target);
    const data = {
      cardholderName: formData.get("cardholderName"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      cardNumber: formData.get("cardNumber"),
      cardName: formData.get("cardName"),
      expiryDate: formData.get("expiryDate"),
      cvc: formData.get("cvc"),
    };

    console.log("Card Details Submitted:", data);

    // Create the order object
    const order = {
      user: {
        name: clientData.firstName + " " + clientData.lastName,
        email: clientData.email,
        phone: clientData.phone,
      },
      shippingAddress: {
        city: clientData.city,
        streetAddress: clientData.streetAddress,
      },
      products: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      totalPrice,
      orderNumber, // Include the order number here
    };

    try {
      // Send the order to the backend
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        order
      );
      if (response.status === 201) {
        document.getElementById("root").scrollIntoView({
          behavior: "smooth",
        });
        // On success, navigate to the payment success page
        navigate("/payment-success", {
          state: { clientName: clientData.firstName, orderNumber },
        });
      } else {
        alert("Failed to process the order.");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      alert("An error occurred while processing the order.");
    }
  };

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
              }}
            >
              תשלום בכרטיס אשראי
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
              }}
              dir={rtl ? "rtl" : ""}
            >
              <TextField
                name="cardholderName"
                label="שם בעל הכרטיס"
                type="text"
                variant="standard"
                fullWidth
                required
                sx={{
                  mb: 2,
                  "& .MuiInputBase-input": {
                    fontFamily: "Noto Sans Hebrew",
                  },
                }}
                InputLabelProps={{
                  className: rtl ? "rtl-asterisk" : "",
                  sx: { fontFamily: "Noto Sans Hebrew" },
                }}
              />
              <TextField
                name="email"
                label='כתובת דוא"ל'
                type="email"
                variant="standard"
                fullWidth
                required
                sx={{
                  mb: 2,
                  "& .MuiInputBase-input": { fontFamily: "Noto Sans Hebrew" },
                }}
                InputLabelProps={{
                  className: rtl ? "rtl-asterisk" : "",
                  sx: { fontFamily: "Noto Sans Hebrew" },
                }}
              />
              <TextField
                name="phoneNumber"
                label="מספר טלפון"
                type="tel"
                variant="standard"
                fullWidth
                required
                sx={{
                  mb: 2,
                  "& .MuiInputBase-input": { fontFamily: "Noto Sans Hebrew" },
                }}
                InputLabelProps={{
                  className: rtl ? "rtl-asterisk" : "",
                  sx: { fontFamily: "Noto Sans Hebrew" },
                }}
              />
              <TextField
                name="cardNumber"
                label="מספר כרטיס"
                type="text"
                variant="standard"
                fullWidth
                required
                sx={{
                  mb: 2,
                  "& .MuiInputBase-input": {
                    fontFamily: "Noto Sans Hebrew",
                  },
                }}
                InputLabelProps={{
                  className: rtl ? "rtl-asterisk" : "",
                  sx: { fontFamily: "Noto Sans Hebrew" },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  width: "100%",
                }}
              >
                <TextField
                  name="expiryDate"
                  label="תוקף (MM/YY)"
                  type="text"
                  variant="standard"
                  fullWidth
                  required
                  sx={{
                    mb: 2,
                    "& .MuiInputBase-input": {
                      fontFamily: "Noto Sans Hebrew",
                    },
                  }}
                  InputLabelProps={{
                    className: rtl ? "rtl-asterisk" : "",
                    sx: { fontFamily: "Noto Sans Hebrew" },
                  }}
                />
                <TextField
                  name="cvc"
                  label="קוד אבטחה (CVC)"
                  type="text"
                  variant="standard"
                  fullWidth
                  required
                  sx={{
                    mb: 2,
                    "& .MuiInputBase-input": {
                      fontFamily: "Noto Sans Hebrew",
                    },
                  }}
                  InputLabelProps={{
                    className: rtl ? "rtl-asterisk" : "",
                    sx: { fontFamily: "Noto Sans Hebrew" },
                  }}
                />
              </Box>
              <TextField
                name="cardName"
                label="שם על הכרטיס"
                type="text"
                variant="standard"
                fullWidth
                required
                sx={{
                  mb: 2,
                  "& .MuiInputBase-input": {
                    fontFamily: "Noto Sans Hebrew",
                  },
                }}
                InputLabelProps={{
                  className: rtl ? "rtl-asterisk" : "",
                  sx: { fontFamily: "Noto Sans Hebrew" },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "green", // Set the background color to green
                  color: "white", // Set the text color to white
                  fontFamily: "Noto Sans Hebrew", // Set the font family
                  "&:hover": {
                    backgroundColor: "darkgrey", // Optional: Set a different color on hover
                  },
                }}
              >
                שלם עכשיו
              </Button>
            </Box>
          </Box>
        </Box>
      </CacheProvider>
    </div>
  );
};

export default CardDetailsPage;
