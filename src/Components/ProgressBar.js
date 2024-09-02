import React from "react";

const ProgressBar = ({ currentStep }) => {
  const steps = ["3", "2", "1"];
  return (
    <div style={styles.progressContainer}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            style={{
              ...styles.circle,
              backgroundColor: currentStep >= step ? "#008000" : "#fff", // Green background when reached, white otherwise
              color: currentStep >= step ? "#fff" : "#ccc", // White number when reached, grey otherwise
              borderColor: currentStep >= step ? "#008000" : "#ccc", // Green border when reached, grey otherwise
              transition:
                "background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease", // Smooth transition
            }}
          >
            {currentStep > step ? "✔" : step}
          </div>
          {index < steps.length - 1 && (
            <div
              style={{
                ...styles.line,
                backgroundColor:
                  currentStep >= steps[index + 1] ? "#008000" : "#ccc", // Green line when next step is reached, grey otherwise
              }}
            ></div>
          )}
        </React.Fragment>
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
  circle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "bold",
    border: "2px solid #ccc", // Default grey border for unreached circles
  },
  line: {
    width: "50px",
    height: "2px",
    backgroundColor: "#ccc", // Default grey line for unreached steps
    transition: "background-color 0.5s ease", // Smooth transition for line color
  },
};

export default ProgressBar;
