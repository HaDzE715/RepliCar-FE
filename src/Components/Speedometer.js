import React, { useState, useEffect } from "react";
import Speedometer from "react-d3-speedometer";
import ValentinePic from "../Pictures/Valentine.jpg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ValentineBanner = () => {
  const [speed, setSpeed] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    let direction = 1;
    let currentSpeed = 1;
    const interval = setInterval(() => {
      setSpeed((prevSpeed) => {
        if (prevSpeed >= 200 && direction === 1) {
          direction = -1;
          currentSpeed = 100;
          return currentSpeed;
        } else if (prevSpeed <= 100 && direction === -1) {
          direction = 1;
          currentSpeed = 1;
          return currentSpeed;
        }
        return prevSpeed + direction;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {showAnimation && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.9)",
            zIndex: 9999,
          }}
        >
          <DotLottieReact
            src="https://lottie.host/5e50524b-6629-4c88-a000-f08ff1852a30/rkKojf5PEv.lottie"
            loop
            autoplay
          />
        </div>
      )}
      {/* Full-width banner image */}
      <div
        style={{
          width: "100%",
          height: "288px",
          backgroundImage: `url(${ValentinePic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={ValentinePic}
          alt="Valentine Banner"
          style={{ width: "100%", height: "288px", objectFit: "cover" }}
        />
      </div>

      {/* Fully centered Speedometer beneath the banner with a half-circle effect */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "-50px",
        }}
      >
        <div
          style={{
            width: "350px",
            height: "200px",
            background: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
            borderTopLeftRadius: "180px",
            borderTopRightRadius: "180px",
          }}
        >
          <Speedometer
            minValue={0}
            maxValue={200}
            needleHeightRatio={0.6}
            ringWidth={30}
            value={speed}
            needleColor="red"
            startColor="#e6a6be"
            endColor="red"
            segments={10}
            textColor="#e6a6be"
            needleTransitionDuration={2000}
            currentValueText={`${speed} km/h`}
            valueFormat="d"
            labelFontSize="10px"
            valueTextFontSize="12px"
            paddingHorizontal="15"
          />
        </div>
      </div>
    </div>
  );
};

export default ValentineBanner;
