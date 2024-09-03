import React from "react";
import { TbTruckDelivery } from "react-icons/tb"; // Importing the Truck Delivery icon
import { FaHeadset } from "react-icons/fa"; // Importing the Headset icon for customer service

const ServiceSection = () => {
  return (
    <div style={styles.serviceSection}>
      <div style={styles.servicesContainer}>
        <div style={styles.serviceItem}>
          <TbTruckDelivery style={styles.icon} />
          <div style={styles.serviceText}>משלוחים לכל הארץ</div>
        </div>
        <div style={styles.serviceItem}>
          <FaHeadset style={styles.outlinedIcon} />
          <div style={styles.serviceText}>שירות לקוחות 24/7</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  serviceSection: {
    textAlign: "center",
    padding: "0px 20px",
    backgroundColor: "#fff",
  },
  servicesContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
  },
  serviceItem: {
    textAlign: "center",
  },
  icon: {
    fontSize: "48px",
    marginBottom: "10px",
    color: "#000000", // Black color for the shipping icon
  },
  outlinedIcon: {
    fontSize: "48px",
    marginBottom: "10px",
    color: "#000000",
    border: "2px solid #000000", // Outlined effect for the customer service icon
    borderRadius: "50%", // Circular outline
    padding: "10px",
  },
  serviceText: {
    fontSize: "20px",
    color: "#333",
    fontWeight: "bold",
    direction: "rtl",
    fontFamily: "Noto Sans Hebrew, sans-serif",
  },
};

export default ServiceSection;
