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
import "../Style/CardDetailsPage.css"; // Ensure this import is correct

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
  const { clientData, totalQuantity, totalPrice } = location.state || {
    clientData: {},
    totalQuantity: 0,
    totalPrice: 0,
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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

    // Here you can handle the payment process

    // Redirect to a confirmation or success page
    navigate("/payment-success");
  };

  return (
    <div className="card-details-page">
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
              מספר הזמנה: 123456
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
