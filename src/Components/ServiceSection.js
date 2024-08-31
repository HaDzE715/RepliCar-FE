import React from "react";
import { FaAward, FaGrinWink } from "react-icons/fa"; // Importing the Award and Grin Wink icons
import { TbTruckDelivery } from "react-icons/tb"; // Importing the Truck Delivery icon

const ServiceSection = () => {
  return (
    <div style={styles.serviceSection}>
      <h2 style={styles.sectionTitle}>היתרונות שלנו</h2>
      <div style={styles.servicesContainer}>
        <div style={styles.serviceItem}>
          <FaAward style={{ ...styles.icon, color: "#333" }} />
          <div style={styles.serviceText}>איכות פרימיום</div>
        </div>
        <div style={styles.serviceItem}>
          <TbTruckDelivery style={{ ...styles.icon, color: "#333" }} />
          <div style={styles.serviceText}>משלוח מהיר</div>
        </div>
        <div style={styles.serviceItem}>
          <FaGrinWink style={{ ...styles.icon, color: "#333" }} />
          <div style={styles.serviceText}>שביעות רצון הלקוחות</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  serviceSection: {
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "40px",
    color: "#333",
    fontFamily: "Noto Sans Hebrew, sans-serif",
  },
  servicesContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  serviceItem: {
    textAlign: "center",
  },
  icon: {
    fontSize: "48px",
    marginBottom: "20px",
    color: "#000000", // Set all icons to black
  },
  serviceText: {
    fontSize: "18px",
    color: "#333",
    fontWeight: "bold",
    direction: "rtl", // Ensures text is displayed right-to-left
    fontFamily: "Noto Sans Hebrew, sans-serif",
  },
};

export default ServiceSection;
