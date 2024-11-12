import React, { useEffect, useState, Suspense, lazy } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import "../Style/HomePage.css";
import { useDrawer } from "../Components/DrawerContext";
import Banner1 from "../Pictures/Banner1.jpeg";
import Banner2 from "../Pictures/Banner21.jpeg";
import Diecast from "../Pictures/diecast-cat4.jpeg";
import Frames from "../Pictures/Frames3.jpeg";
import ServiceSection from "../Components/ServiceSection";
import BestSeller from "../Pictures/BestSeller.jpeg";
import HotBanner2 from "../Pictures/HotBanner2.jpeg";
import HeroSection from "../Components/HeroSection";
import CookieConsent from "../Components/CookieConsent";
import CircularProgress from "@mui/material/CircularProgress";
import ReactGA from "react-ga";

const Product = lazy(() => import("../Components/Product")); // Lazy load Product component

const LazyImage = ({ src, alt, ...props }) => {
  const [loadedSrc, setLoadedSrc] = useState(null);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  });

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
  const [activeIndex, setActiveIndex] = useState(0); // New state for active product index
  const [mostSoldScrollProgress, setMostSoldScrollProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
        );
        const sortedBySold = filteredProducts.sort((a, b) => b.sold - a.sold);
        setMostSoldProducts(sortedBySold.slice(0, 4));
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

  // Function to update the active product index when a product is clicked
  useEffect(() => {
    const container = document.querySelector(".discounts-scroll-container");

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const index = Math.round(
        (scrollLeft / scrollWidth) * discountedProducts.length
      );
      setActiveIndex(index);
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [discountedProducts]);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/api/subscribe`, { email });
      setNewsletterMessage("תודה לך על ההרשמה!");
      setEmail("");
    } catch (error) {
      setNewsletterMessage("Subscription failed. Please try again.");
      console.error("Error subscribing to newsletter:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    const mostSoldContainer = document.querySelector(
      ".most-sold-products-container"
    );
    const handleMostSoldScroll = () => {
      const scrollLeft = mostSoldContainer.scrollLeft;
      const scrollWidth =
        mostSoldContainer.scrollWidth - mostSoldContainer.clientWidth;
      const progress = (scrollLeft / scrollWidth) * 100;
      setMostSoldScrollProgress(progress);
    };

    if (mostSoldContainer) {
      mostSoldContainer.addEventListener("scroll", handleMostSoldScroll);
    }

    return () => {
      if (mostSoldContainer) {
        mostSoldContainer.removeEventListener("scroll", handleMostSoldScroll);
      }
    };
  }, []);

  return (
    <div className="homepage">
      <div className="redline">
        משלוח חינם לכל רחבי הארץ בתוך 3 עד 5 ימי עסקים בלבד!
      </div>
      <HeroSection />
      <div className="content-wrapper" style={{ overflow: "hidden" }}>
        <CookieConsent />
        <section className="discounts-section" style={{ overflow: "hidden" }}>
          <section className="skid-marks-section">
            <LazyImage
              src={HotBanner2}
              alt="Promotional Banner"
              style={{ width: "330px", height: "90px", marginBottom: "10px" }}
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
              : discountedProducts.map((product, index) => (
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
                      onClick={() => setActiveIndex(index)} // Update the active product index
                    />
                  </Suspense>
                ))}
          </div>
          {!loadingDiscountedProducts && (
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${
                    ((activeIndex + 1) / discountedProducts.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          )}
        </section>

        <section className="banner1-section">
          <LazyImage
            src={Banner1}
            alt="Promotional Banner"
            className="banner1-image"
            onClick={() => (window.location.href = "/frames")}
          />
        </section>
        <div className="homepage-diecast-category-container">
          <section className="homepage-diecast-category-box">
            <div className="homepage-category-box-content">
              <img
                src={Frames}
                alt="Frames"
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
                onClick={() => (window.location.href = "/frames")}
              >
                צפה במוצרים{" "}
              </button>
            </div>
          </section>
          <section className="homepage-diecast-category-box">
            <div className="homepage-category-box-content">
              <img
                src={Diecast}
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
                onClick={() => (window.location.href = "/diecast")}
              >
                צפה במוצרים{" "}
              </button>
            </div>
          </section>
        </div>
        <section className="banner1-section">
          <LazyImage
            src={Banner2}
            alt="Promotional Banner"
            className="banner1-image"
            onClick={() => (window.location.href = "/diecast")}
          />
        </section>
        <section className="skid-marks-section">
          <LazyImage
            src={BestSeller}
            alt="Promotional Banner"
            style={{ width: "330px", height: "100px", marginBottom: "0px" }}
          />
        </section>
        <div className="discounts-scroll-container most-sold-products-container">
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

        <div
          className="scroll-progress-bar"
          style={{ width: "91%", margin: "0 auto" }}
        >
          <div
            className="scroll-progress"
            style={{ width: `${mostSoldScrollProgress}%` }}
          ></div>
        </div>
        <section className="newsletter-section">
          <h2 style={{ fontFamily: "Noto Sans Hebrew" }}>
            הירשמו לניוזלטר שלנו
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
              {loading ? (
                <CircularProgress size={22} color="inherit" /> // Use CircularProgress from Material-UI
              ) : (
                "להירשם"
              )}
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
        <ServiceSection />
      </div>
    </div>
  );
};

export default HomePage;
