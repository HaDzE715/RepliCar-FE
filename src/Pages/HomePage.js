import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Style/HomePage.css"; // Ensure this CSS file handles responsive design
import SkidMarksImage from "../Pictures/skidmarks.png"; // Adjust the path as needed
import Product from "../Components/Product"; // Make sure to import the Product component

const HomePage = () => {
  const [brands, setBrands] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    console.log("API URL:", apiUrl); // Log the API URL to debug

    // Fetch brand data from the backend
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/brands`);
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    // Fetch discounted products from the backend
    const fetchDiscountedProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products`);
        const allProducts = response.data;
        const discounted = allProducts.filter(
          (product) => product.discount === true
        );
        setDiscountedProducts(discounted.slice(0, 4)); // Get first 3-4 discounted products
      } catch (error) {
        console.error("Error fetching discounted products:", error);
      }
    };

    if (apiUrl) {
      fetchBrands();
      fetchDiscountedProducts();
    } else {
      console.error("API URL is not defined");
    }
  }, [apiUrl]);

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
      {/* Wrapper for content */}
      <div className="content-wrapper">
        {/* Discounts Section */}
        <section className="discounts-section">
          <section className="skid-marks-section">
            <img
              src={SkidMarksImage}
              alt="Skid Marks"
              className="skid-marks-img"
            />
            <h1 className="skid-marks-title">מבצעים חמים</h1>
            <img
              src={SkidMarksImage}
              alt="Skid Marks"
              className="skid-marks-img"
            />
          </section>
          <div className="discounts-scroll-container">
            {discountedProducts.map((product) => (
              <Product
                key={product._id}
                id={product._id}
                name={product.name}
                size={product.size}
                price={product.price}
                discount={product.discount}
                discount_price={product.discount_price}
                image={product.image}
                quantity={product.quantity}
              />
            ))}
          </div>
        </section>
        {/* Skid Marks Section */}
        <section className="skid-marks-section">
          <img
            src={SkidMarksImage}
            alt="Skid Marks"
            className="skid-marks-img"
          />
          <h1 className="skid-marks-title">המותגים שלנו</h1>
          <img
            src={SkidMarksImage}
            alt="Skid Marks"
            className="skid-marks-img"
          />
        </section>
        {/* Brand Logos Section */}
        <section className="brands-section">
          <div className="brands-container">
            {brands.map((brand) => (
              <div key={brand._id} className="brand">
                <Link to={`/brand/${brand.name.toLowerCase()}`}>
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="brand-logo"
                  />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
