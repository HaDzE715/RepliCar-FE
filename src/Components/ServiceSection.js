import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { FaHeadset, FaLock } from "react-icons/fa"; // Import FaLock for secure payment

const ServiceSection = () => {
  return (
    <div style={styles.serviceSection}>
      <div style={styles.servicesContainer}>
        <div style={styles.serviceItem}>
          <TbTruckDelivery style={styles.outlinedIcon} />
          <div style={styles.serviceText}>משלוחים חינם לכל הארץ</div>
        </div>
        <div style={styles.serviceItem}>
          <FaHeadset style={styles.outlinedIcon} />
          <div style={styles.serviceText}>שירות לקוחות 24/7</div>
        </div>
        <div style={styles.serviceItem}>
          <FaLock style={styles.outlinedIcon} />
          <div style={styles.serviceText}> תשלום מאובטח בכל כרטיס</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  serviceSection: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#fff",
  },
  servicesContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    flexWrap: "nowrap", // Keeps all items in a single row
  },
  serviceItem: {
    textAlign: "center",
    flexDirection: "column",
  },
  outlinedIcon: {
    fontSize: "48px",
    marginBottom: "10px",
    color: "#000000",
    border: "2px solid #000000", // Outline effect
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
