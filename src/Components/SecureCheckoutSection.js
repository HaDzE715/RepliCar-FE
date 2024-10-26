import React from "react";
import VisaIcon from "../assets/visa-logo.svg";
import MasterCardIcon from "../assets/mastercard-logo.svg";
import AmexIcon from "../assets/amex-logo.svg";

const SecureCheckoutSection = () => {
  return (
    <div style={styles.secureSection}>
      <h3 style={styles.heading}>תשלום בטוח ומאובטח באמצעות</h3>
      <div style={styles.iconsContainer}>
        <div style={styles.iconItem}>
          <img src={VisaIcon} alt="Visa" style={styles.icon} />
        </div>
        <div style={styles.iconItem}>
          <img src={MasterCardIcon} alt="MasterCard" style={styles.icon} />
        </div>
        <div style={styles.iconItem}>
          <img src={AmexIcon} alt="American Express" style={styles.icon} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  secureSection: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    marginTop: "20px",
  },
  heading: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
    fontFamily: "Noto Sans Hebrew, sans-serif",
  },
  iconsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  iconItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80px", // Adjust width based on logo size
  },
  icon: {
    width: "100%", // Full width of the container for consistent sizing
    height: "auto",
  },
};

export default SecureCheckoutSection;
