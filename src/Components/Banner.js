import React from "react";
import "../Style/Banner.css";

function Banner({ logo, brandDetails }) {
  const {
    BrandName,
    BrandFounder,
    BrandCity,
    BrandCountry,
    BrandMonth,
    BrandDay,
    BrandYear,
  } = brandDetails;

  return (
    <div className="banner-container">
      <div className="logo-animation">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="description-animation">
        <p className="brand-name">{BrandName}</p>
        <div className="brand-details-info">
          <p className="brand-info-item">
            <span className="icon">Founder:</span> {BrandFounder}
          </p>
          <p className="brand-info-item">
            <span className="icon">HQ:</span> {BrandCity}, {BrandCountry}
          </p>
          <p className="brand-info-item">
            <span className="icon">Founded:</span> {BrandMonth} {BrandDay},{" "}
            {BrandYear}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
