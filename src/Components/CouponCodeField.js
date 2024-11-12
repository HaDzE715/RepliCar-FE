import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const CouponCodeField = ({ handleApplyCoupon }) => {
  const [couponCode, setCouponCode] = useState("");
  const [loadingCoupon, setLoadingCoupon] = useState(false); // Separate loading state for coupon button
  const [showEmailField, setShowEmailField] = useState(false);
  const [email, setEmail] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false); // Separate loading state for email button
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const applyCoupon = () => {
    setLoadingCoupon(true);
    handleApplyCoupon(couponCode);
    setTimeout(() => {
      setLoadingCoupon(false);
    }, 2000);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoadingEmail(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/subscribe`, {
        email,
      });
      setNewsletterMessage("תודה לך על ההרשמה, הקוד שלך נמצא במייל");
      setEmail("");
    } catch (error) {
      setNewsletterMessage("Subscription failed. Please try again.");
      console.error("Error subscribing to newsletter:", error);
    }
    setLoadingEmail(false);
  };

  const inputStyles = {
    minWidth: "250px",
    "@media (max-width:600px)": {
      minWidth: "180px",
    },
  };

  const buttonStyles = {
    backgroundColor: "black",
    color: "white",
    padding: "10px 20px",
    fontSize: "18px",
    fontFamily: "Noto Sans Hebrew",
    "@media (max-width:600px)": {
      fontSize: "16px",
      padding: "8px 16px",
    },
    "&:hover": {
      backgroundColor: "gray",
    },
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography
        variant="body2"
        sx={{
          cursor: "pointer",
          color: "green",
          textDecoration: "underline",
          fontFamily: "Noto Sans Hebrew",
          marginBottom: "8px",
        }}
        onClick={() => setShowEmailField((prev) => !prev)}
      >
        עוד לא קיבלתם 10% הנחה? לחצו כאן כדי להירשם
      </Typography>

      {showEmailField && (
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          sx={{ marginBottom: "8px" }}
        >
          <TextField
            label="הזן את המייל שלך"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="small"
            InputProps={{
              sx: {
                fontFamily: "Noto Sans Hebrew",
              },
            }}
            InputLabelProps={{
              sx: {
                fontFamily: "Noto Sans Hebrew",
              },
            }}
            sx={inputStyles}
          />
          <Button
            variant="contained"
            onClick={handleSubscribe}
            sx={buttonStyles}
            disabled={loadingEmail}
          >
            {loadingEmail ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "קבל קוד"
            )}
          </Button>
        </Box>
      )}

      {newsletterMessage && (
        <Typography
          variant="body2"
          sx={{ color: "green", fontFamily: "Noto Sans Hebrew" }}
        >
          {newsletterMessage}
        </Typography>
      )}

      <Box display="flex" alignItems="center" gap={2}>
        <TextField
          label="קוד קופון"
          variant="outlined"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          size="small"
          InputProps={{
            sx: {
              fontFamily: "Noto Sans Hebrew",
            },
          }}
          InputLabelProps={{
            sx: {
              fontFamily: "Noto Sans Hebrew",
            },
          }}
          sx={inputStyles}
        />
        <Button
          variant="contained"
          onClick={applyCoupon}
          sx={buttonStyles}
          disabled={loadingCoupon}
        >
          {loadingCoupon ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "בצע קוד"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default CouponCodeField;
