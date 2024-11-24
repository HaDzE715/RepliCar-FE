import React from "react";
import bf from "../Pictures/bf.jpeg";
import "../Style/HeroSection2.css";

const ResponsiveBanner = () => {
  return (
    <div className="responsive-banner">
      <img
        src={bf}
        alt="Responsive Banner"
        className="responsive-banner-image"
      />
    </div>
  );
};
export default ResponsiveBanner;
