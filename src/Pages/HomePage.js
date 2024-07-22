import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Style/HomePage.css"; // Make sure to create and link the corresponding CSS file
import SkidMarksImage from "../Pictures/skidmarks.png"; // Adjust the path as needed

const HomePage = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Fetch brand data from the backend
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/brands");
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <Link to="/brands" className="hero-button">
            {"<-"} למוצרים שלנו
          </Link>
        </div>
      </section>
      {/* Skid Marks Section */}
      <section className="skid-marks-section">
        <img src={SkidMarksImage} alt="Skid Marks" className="skid-marks-img" />
        <h1 className="skid-marks-title">המותגים שלנו</h1>
        <img src={SkidMarksImage} alt="Skid Marks" className="skid-marks-img" />
      </section>
      {/* Brand Logos Section */}
      <section className="brands-section">
        <div className="brands-container">
          {brands.map((brand) => (
            <div key={brand._id} className="brand">
              <Link to={`/brand/${brand.name.toLowerCase()}`}>
                <img src={brand.logo} alt={brand.name} className="brand-logo" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
