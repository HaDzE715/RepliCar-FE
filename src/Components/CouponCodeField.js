import React, { useState } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";

const CouponCodeField = ({ handleApplyCoupon }) => {
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);

  const applyCoupon = () => {
    setLoading(true);
    handleApplyCoupon(couponCode); // Pass coupon code to parent
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <TextField
        label="קוד קופון"
        variant="outlined"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        size="small"
        InputProps={{
          sx: {
            fontFamily: "Noto Sans Hebrew", // Apply font to the input field
          },
        }}
        InputLabelProps={{
          sx: {
            fontFamily: "Noto Sans Hebrew", // Apply font to the label
          },
        }}
        sx={{
          minWidth: "250px",
          "@media (max-width:600px)": {
            minWidth: "180px",
          },
        }}
      />
      <Button
        variant="contained"
        onClick={applyCoupon}
        sx={{
          backgroundColor: "black",
          color: "white",
          padding: "10px 20px",
          fontSize: "18px",
          "@media (max-width:600px)": {
            fontSize: "16px",
            padding: "8px 16px",
            fontFamily: "Noto sans hebrew",
          },
          "&:hover": {
            backgroundColor: "gray",
          },
        }}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: "white" }} /> // Spinner when loading
        ) : (
          "בצע קוד" // Button text when not loading
        )}{" "}
      </Button>
    </Box>
  );
};

export default CouponCodeField;
