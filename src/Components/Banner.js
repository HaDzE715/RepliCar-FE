import React from "react";
import "../Style/Banner.css";

function Banner({ logo, brandDetails }) {
  const { name, founder, city, country, month, day, year } = brandDetails;

  return (
    <div className="banner-container">
      <div className="logo-animation">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="description-animation">
        <p className="brand-name">{name}</p>
        <div className="brand-details-info">
          <p className="brand-info-item">
            <span className="icon">Founder:</span>{" "}
            <span className="Details-Fonts">{founder}</span>
          </p>
          <p className="brand-info-item">
            <span className="icon">Founded:</span>{" "}
            <span className="Details-Fonts">
              {month} {day}, {year}
            </span>
          </p>
          <p className="brand-info-item">
            <span className="icon">HQ:</span>{" "}
            <span className="Details-Fonts">
              {city}, {country}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
