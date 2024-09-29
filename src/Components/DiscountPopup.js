import React, { useState, useEffect } from "react";
import axios from "axios";
import image from "../Pictures/diecast-cat2.jpeg";
import CircularProgress from "@mui/material/CircularProgress";
const DiscountPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/api/subscribe`, { email });
      setNewsletterMessage("תודה לך על ההרשמה");
      setEmail("");
    } catch (error) {
      setNewsletterMessage("Subscription failed. Please try again.");
      console.error("Error subscribing to newsletter:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div
          onClick={closePopup}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%", // Fill the viewport height
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "10px",
              position: "relative",
              width: "400px",
              maxWidth: "90%",
              height: "450px", // Increase popup height to accommodate larger image
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <button
              onClick={closePopup}
              style={{
                position: "absolute",
                color: "white",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                zIndex: 10, // Ensure the close button is above the image
              }}
            >
              &times;
            </button>

            {/* Image section */}
            <div
              style={{
                height: "50%", // Increased to show more of the image
                width: "100%",
                overflow: "hidden",
              }}
            >
              <img
                src={image}
                alt="Discount Banner"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Ensures the image covers the entire area
                }}
              />
            </div>

            {/* Content section - taking up the remaining space */}
            <div
              style={{
                height: "65%", // Reduced to fit the remaining space
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <section className="newsletter-section">
                <h2
                  style={{
                    fontFamily: "Noto Sans Hebrew",
                    textAlign: "center",
                  }}
                >
                  הירשמו לניוזלטר שלנו וקבלו 10% הנחה על הקנייה הראשונה שלכם!
                </h2>
                <p
                  style={{
                    fontFamily: "Noto Sans Hebrew",
                    direction: "rtl",
                    fontSize: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  עדכונים על קולקציות חדשות והטבות בלעדיות ישירות למייל.
                </p>
                <form
                  onSubmit={handleNewsletterSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="הזן את המייל שלך"
                    style={{
                      fontFamily: "Noto Sans Hebrew",
                      direction: "rtl",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      width: "100%",
                      maxWidth: "300px",
                      marginBottom: "10px",
                    }}
                    required
                  />
                  <button
                    type="submit"
                    style={{
                      fontFamily: "Noto Sans Hebrew",
                      direction: "rtl",
                      padding: "10px 0",
                      backgroundColor: "#333",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "100%", // Full-width button
                      maxWidth: "300px", // Same width as input field
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={22} color="inherit" /> // Use CircularProgress from Material-UI
                    ) : (
                      "להירשם"
                    )}
                  </button>
                </form>
                {newsletterMessage && (
                  <p
                    style={{
                      marginTop: "10px",
                      color: "green",
                      fontFamily: "Noto Sans Hebrew",
                    }}
                  >
                    {newsletterMessage}
                  </p>
                )}
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DiscountPopup;
