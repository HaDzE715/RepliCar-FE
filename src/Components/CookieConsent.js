import React, { useState, useEffect } from "react";
import "../Style/HomePage.css"; 

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
    clearCookies();
  };
  const clearCookies = () => {
    const cookies = document.cookie.split(";");

    cookies.forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
    });
  };

  if (!isVisible) {
    return null;
  }

  const containerStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px 8px 0 0",
    zIndex: 1000,
    fontFamily: "Noto Sans Hebrew",
    direction: "rtl",
    borderTop: "2px solid black",
    animation: "slideUp 0.5s ease-out",
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "column", // Stack buttons vertically
    width: "100%",
    marginTop: "10px",
    gap: "10px",
  };

  const buttonStyle = {
    padding: "15px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    fontFamily: "Noto Sans Hebrew",
    FontSize: "18px",
  };

  const acceptButtonStyle = {
    ...buttonStyle,
    backgroundColor: "black",
    color: "white",
  };

  const declineButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f0f0f0",
    color: "black",
  };

  const linkStyle = {
    color: "blue",
    textDecoration: "underline",
    cursor: "pointer",
  };

  const slideUpStyle = `
    @keyframes slideUp {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{slideUpStyle}</style>
      <p>
        אתר זה עושה שימוש בעוגיות (cookies) לשיפור חוויית המשתמש ולשירותים
        נוספים. על ידי לחיצה על "מאשר", הנך מסכים לשימוש בעוגיות.
        <br />
        למידע נוסף, אנא בקרו ב
        <a href="/terms" style={linkStyle}>
          תקנון האתר
        </a>
        .
      </p>
      <div style={buttonContainerStyle}>
        <button style={acceptButtonStyle} onClick={handleAccept}>
          מאשר
        </button>
        <button style={declineButtonStyle} onClick={handleDecline}>
          דוחה
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
