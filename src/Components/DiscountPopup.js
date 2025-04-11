import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const SubscriptionPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Show popup after a delay
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/api/subscribe`, {
        name: formData.name,
        email: formData.email,
      });
      setNewsletterMessage("תודה לך על ההרשמה");
      setFormData({ name: "", email: "" });

      // Close popup after successful submission and delay
      setTimeout(() => {
        closePopup();
      }, 2000);
    } catch (error) {
      setNewsletterMessage("ההרשמה נכשלה. אנא נסה שנית.");
      console.error("Error subscribing to newsletter:", error);
    }
    setLoading(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={closePopup}>
          &times;
        </button>

        <div className="popup-content">
          <h2>קבל 10% הנחה על ההזמנה הראשונה!</h2>
          <p>
            הצטרפו לקהילת חובבי הרכב שלנו ותקבלו הצעות בלעדיות לתיבת הדואר
            שלכם🎉.
          </p>

          {newsletterMessage ? (
            <div className="success-message">{newsletterMessage}</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="השם שלך"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="האימייל שלך"
                  required
                />
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  "הירשם עכשיו"
                )}
              </button>
              <p style={{ marginTop: "10px", marginBottom: "-10px" }}>
                הרשמתך מהווה הסכמה לקבל עדכונים באימייל.
              </p>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .popup-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
          width: 400px;
          max-width: 90%;
          position: relative;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #f0f0f0;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .close-button:hover {
          background-color: #e0e0e0;
        }

        .popup-content {
          padding: 30px;
          text-align: center;
        }

        h2 {
          font-family: "Noto Sans Hebrew", sans-serif;
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 22px;
          color: #333;
          direction: rtl;
        }

        p {
          font-family: "Noto Sans Hebrew", sans-serif;
          margin-bottom: 25px;
          color: #666;
          direction: rtl;
          font-size: 14px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        input {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          direction: rtl;
          font-family: "Noto Sans Hebrew", sans-serif;
          transition: border-color 0.3s;
        }

        input:focus {
          outline: none;
          border-color: #888;
        }

        .submit-button {
          width: 100%;
          padding: 12px;
          background-color: #333;
          color: white;
          border: none;
          border-radius: 6px;
          font-family: "Noto Sans Hebrew", sans-serif;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-top: 10px;
        }

        .submit-button:hover:not(:disabled) {
          background-color: #222;
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .success-message {
          background-color: #e8f5e9;
          color: #2e7d32;
          padding: 15px;
          border-radius: 6px;
          margin: 20px 0;
          font-family: "Noto Sans Hebrew", sans-serif;
          direction: rtl;
        }
      `}</style>
    </div>
  );
};

export default SubscriptionPopup;
