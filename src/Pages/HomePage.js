import React, { useEffect, useState, Suspense, lazy } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import "../Style/HomePage.css";
import SkidMarksImage from "../Pictures/skidmarks.png";
import { useDrawer } from "../Components/DrawerContext";
import Banner1 from "../Pictures/Banner1.jpeg";
import Banner2 from "../Pictures/Banner21.jpeg";
import Diecast from "../Pictures/diecast-cat.jpg";
import Frames from "../Pictures/Frames.jpg";

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
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [loadingDiscountedProducts, setLoadingDiscountedProducts] =
    useState(true);
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const { openDrawer } = useDrawer();
  const [mostSoldProducts, setMostSoldProducts] = useState([]);
  const [loadingMostSoldProducts, setLoadingMostSoldProducts] = useState(true);

  useEffect(() => {
    console.log("API URL:", apiUrl);

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
    const fetchMostSoldProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products`);
        const allProducts = response.data;
        const filteredProducts = allProducts.filter(
          (product) => product.sold > 0
        ); // Only include products with sold > 0
        const sortedBySold = filteredProducts.sort((a, b) => b.sold - a.sold); // Sort by sold field
        setMostSoldProducts(sortedBySold.slice(0, 4)); // Get top 4 most sold products
        setLoadingMostSoldProducts(false);
      } catch (error) {
        console.error("Error fetching most sold products:", error);
      }
    };

    if (apiUrl) {
      fetchDiscountedProducts();
      fetchMostSoldProducts();
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
        <section className="banner1-section">
          <LazyImage
            src={Banner1} // Use BannerImage if imported locally
            alt="Promotional Banner"
            className="banner1-image"
            onClick={() => (window.location.href = "/frames")}
          />
        </section>
        <div className="homepage-diecast-category-container">
          <section className="homepage-diecast-category-box">
            <div className="homepage-category-box-content">
              <img
                src={Frames} // Replace with your diecast image URL
                alt="Diecast Cars"
                className="homepage-category-image"
              />
              <div className="homepage-category-description">
                <h3 className="category-title">אוסף מסגרות</h3>
                <p className="category-description">
                  דגמי דייקאסט ייחודיים במסגרת מעוצבת{" "}
                </p>
              </div>

              <button
                className="homepage-buy-now-button"
                onClick={() => (window.location.href = "/frames")} // Replace with your target URL
              >
                צפה במוצרים{" "}
              </button>
            </div>
          </section>
          <section className="homepage-diecast-category-box">
            <div className="homepage-category-box-content">
              <img
                src={Diecast} // Replace with your diecast image URL
                alt="Diecast Cars"
                className="homepage-category-image"
              />
              <div className="homepage-category-description">
                <h3 className="category-title2">אוסף הדגמים</h3>
                <p className="category-description2">
                  דגמים מדויקים ומפורטים לכל חובב רכבים ואספנים.
                </p>
              </div>

              <button
                className="homepage-buy-now-button"
                onClick={() => (window.location.href = "/diecast-category")} // Replace with your target URL
              >
                צפה במוצרים{" "}
              </button>
            </div>
          </section>
        </div>
        <section className="banner1-section">
          <LazyImage
            src={Banner2} // Use BannerImage if imported locally
            alt="Promotional Banner"
            className="banner1-image"
            onClick={() => (window.location.href = "/diecast-category")}
          />
        </section>
        <section className="skid-marks-section">
          <LazyImage
            src={SkidMarksImage}
            alt="Skid Marks"
            className="skid-marks-img"
          />
          <h1 className="skid-marks-title">הכי נמכר אצלנו</h1>
          <LazyImage
            src={SkidMarksImage}
            alt="Skid Marks"
            className="skid-marks-img"
          />
        </section>
        <div className="discounts-scroll-container">
          {loadingMostSoldProducts
            ? Array.from(new Array(4)).map((_, index) => (
                <div key={index} className="product-card">
                  <Skeleton variant="rectangular" width={210} height={118} />
                  <Skeleton width="80%" />
                  <Skeleton width="60%" />
                </div>
              ))
            : mostSoldProducts.map((product) => (
                <Suspense fallback={<div>Loading...</div>} key={product._id}>
                  <div className="product-with-sold-number">
                    <span className="sold-number-tag">
                      Sold: {product.sold}
                    </span>
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
                  </div>
                </Suspense>
              ))}
        </div>
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
