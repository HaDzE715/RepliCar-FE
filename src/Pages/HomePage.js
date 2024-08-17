import React, { useEffect, useState, Suspense, lazy } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import "../Style/HomePage.css";
import SkidMarksImage from "../Pictures/skidmarks.png";
import { useDrawer } from "../Components/DrawerContext";

const Product = lazy(() => import("../Components/Product")); // Lazy load Product component

const LazyImage = ({ src, alt, ...props }) => {
  const [loadedSrc, setLoadedSrc] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoadedSrc(src);
          observer.disconnect();
        }
      });
    });

    observer.observe(document.querySelector(`[data-src="${src}"]`));

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <img
      data-src={src}
      src={loadedSrc || "placeholder.jpg"}
      alt={alt}
      {...props}
    />
  );
};

const HomePage = () => {
  const [brands, setBrands] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingDiscountedProducts, setLoadingDiscountedProducts] =
    useState(true);
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const { openDrawer } = useDrawer();

  useEffect(() => {
    console.log("API URL:", apiUrl);

    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/brands`);
        setBrands(response.data);
        setLoadingBrands(false);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    const fetchDiscountedProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products`);
        const allProducts = response.data;
        const discounted = allProducts.filter(
          (product) => product.discount === true
        );
        setDiscountedProducts(discounted.slice(0, 4));
        setLoadingDiscountedProducts(false);
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
      <section className="hero" />
      <div className="content-wrapper" style={{ overflow: "hidden" }}>
        <section className="discounts-section" style={{ overflow: "hidden" }}>
          <section className="skid-marks-section">
            <LazyImage
              src={SkidMarksImage}
              alt="Skid Marks"
              className="skid-marks-img"
            />
            <h1 className="skid-marks-title">מבצעים חמים</h1>
            <LazyImage
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
                  <Suspense fallback={<div>Loading...</div>} key={product._id}>
                    <Product
                      id={product._id}
                      name={product.name}
                      size={product.size}
                      price={product.price}
                      discount={product.discount}
                      discount_price={product.discount_price}
                      image={product.image}
                      quantity={product.quantity}
                      openDrawer={openDrawer}
                    />
                  </Suspense>
                ))}
          </div>
        </section>
        <section className="skid-marks-section">
          <LazyImage
            src={SkidMarksImage}
            alt="Skid Marks"
            className="skid-marks-img"
          />
          <h1 className="skid-marks-title">המותגים שלנו</h1>
          <LazyImage
            src={SkidMarksImage}
            alt="Skid Marks"
            className="skid-marks-img"
          />
        </section>
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
