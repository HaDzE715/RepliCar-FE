import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../Style/CheckoutPage.css"; // Ensure this import is correct
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ProgressBar from "../Components/ProgressBar";

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
  key: "mui",
});

export default function CheckoutPage() {
  const { cart, dispatch } = useCart();
  const [isCartVisible, setIsCartVisible] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown
  const buttonRef = useRef(null); // Reference for the button
  const [rtl] = useState(true);
  const navigate = useNavigate();
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.discount ? item.discount_price : item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const calculateShipping = () => {
    return 0; // Shipping cost set to zero
  };

  const calculateTotalPrice = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleRemoveFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  const handleIncreaseQuantity = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", id });
  };

  const handleDecreaseQuantity = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", id });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prevent multiple submissions by disabling the submit button
    if (isSubmitting) return;

    setIsSubmitting(true); // Set submission in progress

    const formData = new FormData(event.target);
    const agreeTerms = formData.get("agreeTerms");

    const clientData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      city: formData.get("city"),
      streetAddress: formData.get("streetAddress"),
      orderNotes: formData.get("orderNotes"),
      totalPrice: calculateTotalPrice(),
    };

    if (!agreeTerms) {
      setShowAddedMessage(true);
      setIsSubmitting(false); // Re-enable submission
      return;
    } else {
      setShowAddedMessage(false);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/generate-payment-link`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: clientData.totalPrice,
            description: `Payment for ${clientData.firstName} ${clientData.lastName}`,
            customer: {
              customer_name: `${clientData.firstName} ${clientData.lastName}`,
              email: clientData.email,
              phone: clientData.phone,
            },
          }),
        }
      );

      console.log("Response object:", response);

      if (!response.ok) {
        throw new Error("Failed to generate payment link");
      }

      const data = await response.json();
      console.log("Response Data:", data);

      if (data.data && data.data.payment_page_link) {
        const orderNumber =
          (Date.now() % 100000) + Math.floor(Math.random() * 10000);

        // Save products (cart items) and other details to localStorage
        localStorage.setItem(
          "orderDetails",
          JSON.stringify({
            clientName: `${clientData.firstName} ${clientData.lastName}`,
            orderNumber: orderNumber,
            email: clientData.email,
            phone: clientData.phone,
            shippingAddress: {
              streetAddress: clientData.streetAddress,
              city: clientData.city,
            },
            orderNotes: clientData.orderNotes,
            products: cart.map((item) => ({
              product: item.productId, // Use the productId or whatever identifier you have
              quantity: item.quantity,
            })),
            totalPrice: clientData.totalPrice,
          })
        );

        navigate("/card-details", {
          state: {
            cart,
            clientData,
            totalQuantity: calculateTotalQuantity(),
            totalPrice: calculateTotalPrice(),
            paymentLink: data.data.payment_page_link,
          },
        });
      } else {
        console.error("Failed to get payment page link:", data);
        alert("Failed to generate payment link");
      }
    } catch (error) {
      console.error("Error generating payment link:", error);
      alert("Error generating payment link.");
    } finally {
      setIsSubmitting(false); // Re-enable submission after request completes
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsCartVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isCartVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isCartVisible]);

  return (
    <div className="checkout-page">
      <div className={`checkout-header ${isCartVisible ? "expanded" : ""}`}>
        <div className="checkout-summary">
          <span className="product-quantity">
            סך הכל: {calculateTotalQuantity()}
          </span>
          <span className="total-price">סך הכל: {calculateTotalPrice()}₪</span>
        </div>
        <button
          ref={buttonRef}
          onClick={toggleCartVisibility}
          className="view-cart-link"
        >
          לחץ לצפייה בעגלה{" "}
          <span className={`arrow ${isCartVisible ? "up" : "down"}`}></span>
        </button>
      </div>
      <div className="checkout-form-wrap" style={{ position: "relative" }}>
        <ProgressBar currentStep="1" />
        {isCartVisible && (
          <div ref={dropdownRef} className="checkout-cart-dropdown">
            <div className="checkout-cart-items">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item._id} className="checkout-cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="checkout-cart-item-details">
                      <h3>{item.name}</h3>
                      <p>כמות: {item.quantity}</p>
                      <p>מחיר: {item.price}₪</p>
                      <div className="checkout-cart-action-section">
                        <div className="checkout-cart-quantity-section">
                          <button
                            onClick={() => handleIncreaseQuantity(item._id)}
                          >
                            +
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleDecreaseQuantity(item._id)}
                          >
                            -
                          </button>
                        </div>
                        <button
                          className="checkout-cart-remove-button"
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
                          מחק
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>אין מוצרים בעגלה</p>
              )}
            </div>
            <div className="checkout-cart-totals">
              <div className="totals-row">
                <span>סכום ביניים:</span>
                <span>{calculateSubtotal()}₪</span>
              </div>
              <div className="totals-row">
                <span>משלוח:</span>
                <span>חינם!</span>
              </div>
              <div className="totals-row">
                <span>סך הכל:</span>
                <span>{calculateTotalPrice()}₪</span>
              </div>
            </div>
          </div>
        )}
        {/* Form */}
        <div className="form-container-checkout">
          <CacheProvider value={rtl ? rtlCache : ltrCache}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                my: 4, // Margin from top and bottom
                mx: 2, // Margin from sides
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ mb: 2, fontFamily: "Noto Sans Hebrew" }}
              >
                פרטי לקוח
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
                  maxWidth: "500px",
                }}
                dir={rtl ? "rtl" : ""}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <TextField
                    name="firstName"
                    label="שם פרטי"
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
                    name="lastName"
                    label="שם משפחה"
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
                  name="phone"
                  label="טלפון"
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
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <TextField
                    name="city"
                    label="עיר"
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
                    name="streetAddress"
                    label="כתובת רחוב"
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
                  name="orderNotes"
                  label="הערות להזמנה/ לשליח"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
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
                  className="checkout-cart-totals"
                  style={{
                    backgroundColor: "#f5f5f5",
                    BorderColor: "#f5f5f5",
                  }}
                >
                  <div className="totals-row">
                    <span>סכום ביניים:</span>
                    <span>{calculateSubtotal()}₪</span>
                  </div>
                  <div className="totals-row">
                    <span>משלוח:</span>
                    <span>חינם!</span>
                  </div>
                  <div className="totals-row">
                    <span>סך הכל:</span>
                    <span>{calculateTotalPrice()}₪</span>
                  </div>
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="agreeTerms"
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontFamily: "Noto Sans Hebrew",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          whiteSpace: "pre",
                          fontFamily: "Noto Sans Hebrew",
                        }}
                      >
                        קראתי ואני מסכים לאתר{" "}
                      </span>
                      <a
                        href="/terms" // Change this to the actual URL of your terms and conditions
                        style={{
                          textDecoration: "underline",
                          margin: "0 2px",
                          fontFamily: "Noto Sans Hebrew",
                        }}
                        target="_blank"
                      >
                        תנאי
                      </a>
                      <a
                        href="/terms" // Change this to the actual URL of your terms and conditions
                        style={{
                          textDecoration: "underline",
                          margin: "0 0px",
                          fontFamily: "Noto Sans Hebrew",
                        }}
                      >
                        השימוש
                      </a>
                      <span style={{ color: "red", marginLeft: 4 }}>*</span>
                    </Typography>
                  }
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      name="subscribeNewsletter"
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontFamily: "Noto Sans Hebrew",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      אני מאשר/ת קבלת דיוור במייל/SMS
                    </Typography>
                  }
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "green", // Set the background color to black
                    color: "white", // Set the text color to white
                    fontFamily: "Noto Sans Hebrew", // Set the font family
                    "&:hover": {
                      backgroundColor: "darkgrey", // Optional: Set a different color on hover
                    },
                  }}
                >
                  מעבר לתשלום
                </Button>
              </Box>
            </Box>
          </CacheProvider>
        </div>
        {showAddedMessage && (
          <div className="terms-con-message">
            עליך להסכים על תנאי שימוש באתר!
          </div>
        )}
      </div>
    </div>
  );
}
