import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton"; // Import Skeleton component
import "../Style/HomePage.css"; // Ensure this CSS file handles responsive design
import SkidMarksImage from "../Pictures/skidmarks.png"; // Adjust the path as needed
import Product from "../Components/Product"; // Make sure to import the Product component
import { useDrawer } from "../Components/DrawerContext"; // Import useDrawer

const HomePage = () => {
  const [brands, setBrands] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true); // Loading state for brands
  const [loadingDiscountedProducts, setLoadingDiscountedProducts] =
    useState(true); // Loading state for discounted products
  const [email, setEmail] = useState(""); // State for newsletter email
  const [newsletterMessage, setNewsletterMessage] = useState(""); // State for feedback message
  const apiUrl = process.env.REACT_APP_API_URL;
  const { openDrawer } = useDrawer(); // Use openDrawer from DrawerContext

  useEffect(() => {
    console.log("API URL:", apiUrl); // Log the API URL to debug

    // Fetch brand data from the backend
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/brands`);
        setBrands(response.data);
        setLoadingBrands(false); // Set loading to false when data is fetched
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
        setLoadingDiscountedProducts(false); // Set loading to false when data is fetched
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

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/subscribe`, { email });
      console.log("Subscription response:", response.data);
      setNewsletterMessage("תודה לך על ההרשמה!");
      setEmail("");
    } catch (error) {
      setNewsletterMessage("Subscription failed. Please try again.");
      console.error("Error subscribing to newsletter:", error);
    }
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <Link to="/" className="hero-button">
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
            {loadingDiscountedProducts
              ? Array.from(new Array(4)).map((_, index) => (
                  <div key={index} className="product-card">
                    <Skeleton variant="rectangular" width={210} height={118} />
                    <Skeleton width="80%" />
                    <Skeleton width="60%" />
                  </div>
                ))
              : discountedProducts.map((product) => (
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
                    openDrawer={openDrawer} // Pass openDrawer function
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
        <section className="brands-section" id="brands-section">
          <div className="brands-container">
            {loadingBrands
              ? Array.from(new Array(4)).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={120}
                    height={120}
                    style={{ margin: "10px" }}
                  />
                ))
              : brands.map((brand) => (
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
        {/* Newsletter Subscription Section */}
        <section className="newsletter-section">
          <h2 style={{ fontFamily: "Noto Sans Hebrew" }}>
            {" "}
            הירשמו לניוזלטר שלנו{" "}
          </h2>
          <p
            style={{
              fontFamily: "Noto Sans Hebrew",
              direction: "rtl",
              fontSize: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            עדכונים על קולקציות חדשות והטבות בלעדיות ישירות למייל.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <button
              type="submit"
              className="newsletter-button"
              style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}
            >
              להירשם
            </button>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="הזן את המייל שלך"
              style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}
              required
              className="newsletter-input"
            />
          </form>
          {newsletterMessage && (
            <p className="newsletter-message">{newsletterMessage}</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
