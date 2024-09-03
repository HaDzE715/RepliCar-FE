import React from "react";

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { number: "3", label: "הזמנה בוצעה" },
    { number: "2", label: "פרטי תשלום" },
    { number: "1", label: "פרטי לקוח" },
  ];

  return (
    <div style={styles.progressContainer}>
      {steps.map((step, index) => (
        <div key={index} style={styles.stepWrapper}>
          <div style={styles.stepContainer}>
            <div
              style={{
                ...styles.circle,
                backgroundColor:
                  currentStep >= step.number ? "#008000" : "#fff",
                color: currentStep >= step.number ? "#fff" : "#ccc",
                borderColor: currentStep >= step.number ? "#008000" : "#ccc",
                boxShadow:
                  currentStep === step.number
                    ? "0 0 10px 5px rgba(0, 128, 0, 0.5)" // Green shadow for current step
                    : "none",
                transition:
                  "background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
              }}
            >
              {currentStep > step.number ? "✔" : step.number}
            </div>
            <div
              style={{
                ...styles.label,
                color: currentStep >= step.number ? "#008000" : "#ccc",
              }}
            >
              {step.label}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              style={{
                ...styles.line,
                backgroundColor:
                  currentStep >= steps[index + 1].number ? "#008000" : "#ccc",
              }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  progressContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    marginTop: "20px",
  },
  stepWrapper: {
    display: "flex",
    alignItems: "center",
  },
  stepContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  circle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "bold",
    border: "2px solid #ccc",
    zIndex: 1,
  },
  label: {
    marginTop: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Noto sans hebrew",
  },
  line: {
    width: "50px",
    height: "2px",
    backgroundColor: "#ccc",
    transition: "background-color 0.5s ease",
    zIndex: 0,
    marginBottom: "20px",
    marginRight: "-5px",
    marginLeft: "-5px",
  },
};

export default ProgressBar;
