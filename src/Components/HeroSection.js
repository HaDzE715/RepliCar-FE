import React, { useEffect, useState } from "react";
import BannerVid from "../Pictures/BannerVid.mp4";

const HeroSection = () => {
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false); // New state for button visibility

  // Show text after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    // Show the button after text animations (4 seconds total)
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 6500);

    return () => {
      clearTimeout(timer);
      clearTimeout(buttonTimer); // Clear the timers on unmount
    };
  }, []);

  const videoStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
  };

  const heroSectionStyle = {
    direction: "rtl", // Set text direction to right-to-left
    position: "relative",
    width: "100vw",
    height: "80vh", // Default height for desktop
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    padding: "0 20px",
    fontFamily: "'Noto Sans Hebrew', sans-serif", // Ensure Noto Sans Hebrew is applied
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: showContent ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
    zIndex: 1,
    transition: "background-color 1s ease-out",
  };

  const textStyle = {
    zIndex: 2,
    lineHeight: "1.5",
    textAlign: "right", // Align text to the right
  };

  const firstSentenceStyle = {
    fontSize: "1.9rem",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "0", // Initially hide the text
    opacity: 0,
    animation: showContent
      ? "typingFirst 2s steps(30, end) forwards, blink-caret 0.75s step-end infinite"
      : "none",
  };

  const secondSentenceStyle = {
    fontSize: "1rem",
    marginTop: "5px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "0", // Initially hide the text
    opacity: 0,
    animation: showContent
      ? "typingSecond 2s steps(40, end) 3s forwards"
      : "none",
  };

  // Button style with fade-in transition
  const buttonStyle = {
    position: "relative",
    top: "100px",
    padding: "10px 20px",
    backgroundColor: "white",
    color: "black",
    border: "2px solid black",
    fontSize: "1rem",
    cursor: "pointer",
    opacity: showButton ? 1 : 0, // Fade in with opacity
    transition: "opacity 2s ease-in-out", // Smooth fade-in
    fontFamily: "Noto sans hebrew",
  };

  const mobileStyle = `
    @media (max-width: 768px) {
      .hero-section {
        height: 50vh !important; /* Height for mobile devices */
      }
      .hero-text {
        font-size: 1.1rem; /* Smaller text on mobile */
      }
    }

    @keyframes typingFirst {
      from { width: 0; opacity: 0; }
      to { width: 100%; opacity: 1; }
    }

    @keyframes typingSecond {
      from { width: 0; opacity: 0; }
      to { width: 100%; opacity: 1; }
    }

    @keyframes blink-caret {
      from, to { border-color: transparent; }
      50% { border-color: white; }
    }
    @media (min-width: 768px){
    .hero-text{
    display: none;
    }
    }
  `;

  return (
    <section className="hero-section" style={heroSectionStyle}>
      <style>{mobileStyle}</style> {/* Inline media query for mobile */}
      <video style={videoStyle} autoPlay muted loop playsInline>
        <source src={BannerVid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={overlayStyle}></div> {/* Dark overlay */}
      <div className="hero-text" style={textStyle}>
        {/* First sentence */}
        <p style={firstSentenceStyle}>ברוכים הבאים לרפליקאר!</p>
        {/* Second sentence */}
        <p style={secondSentenceStyle}>היעד המוביל לכל חובבי הרכב </p>
        {/* Button that appears after animation with fade effect */}
        <button
          style={buttonStyle}
          onClick={() => (window.location.href = "/diecast")}
        >
          לאוסף הרכבים
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
