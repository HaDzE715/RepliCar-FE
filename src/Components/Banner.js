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
            <span className="icon">Founder:</span>{" "}
            <span className="Details-Fonts">{BrandFounder}</span>
          </p>
          <p className="brand-info-item">
            <span className="icon">Founded:</span>{" "}
            <span className="Details-Fonts">
              {BrandMonth} {BrandDay}, {BrandYear}
            </span>
          </p>
          <p className="brand-info-item">
            <span className="icon">HQ:</span>{" "}
            <span className="Details-Fonts">
              {BrandCity}, {BrandCountry}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
