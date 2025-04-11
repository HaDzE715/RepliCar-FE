import React, { useEffect, useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import "../Style/HomePage.css";
import { useDrawer } from "../Components/DrawerContext";
import Banner1 from "../Pictures/Banner1.jpeg";
// import Banner2 from "../Pictures/Banner21.jpeg";
import Banner3 from "../Pictures/M2-Banner.jpeg";
// import Banner4 from "../Pictures/Ghibli-Banner.jpeg";
import Diecast from "../Pictures/Porsche.JPG";
import Frames from "../Pictures/Ferrari.JPG";
import ServiceSection from "../Components/ServiceSection";
import BestSeller from "../Pictures/BestSeller.jpeg";
import HotBanner2 from "../Pictures/HotBanner2.jpeg";
import HeroSection from "../Components/HeroSection";
import CookieConsent from "../Components/CookieConsent";
import CircularProgress from "@mui/material/CircularProgress";
import ReactGA from "react-ga";
import SEO from "../Components/SEO";

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
  const [name, setName] = useState(""); // Add this line
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const { openDrawer } = useDrawer();
  const [mostSoldProducts, setMostSoldProducts] = useState([]);
  const [loadingMostSoldProducts, setLoadingMostSoldProducts] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0); // New state for active product index
  const [mostSoldScrollProgress, setMostSoldScrollProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      await axios.post(`${apiUrl}/api/subscribe`, { email, name });
      setNewsletterMessage("תודה לך על ההרשמה!");
      setEmail("");
      setName("");
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
      {/* <div className="redline">
        משלוח חינם לכל רחבי הארץ בתוך 5 עד 7 ימי עסקים בלבד!
      </div> */}
      <SEO
        title="Replicar - רפליקאר | דגמי רכב ומסגרות יוקרה"
        description="רפליקאר – עידן חדש של עיצוב לחובבי רכב. פוסטרים יוקרתיים, דייקאסט ומסגרות דייקאסט של רכבים בעיצובים מושלמים. גלו את הקולקציה הבלעדית שלנו, המשלבת אמנות רכב עם איכות ועיצוב עכשווי"
        url="https://replicar.co.il"
      />
      <HeroSection />
      <div className="content-wrapper" style={{ overflow: "hidden" }}>
        <CookieConsent />
        <section className="discounts-section" style={{ overflow: "hidden" }}>
          <section
            className="skid-marks-section"
            onClick={() => navigate("/discounts")}
          >
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

        <section
          className="banner1-section"
          style={{ position: "relative", width: "100%" }}
        >
          <LazyImage
            src={Banner3}
            alt="Promotional Banner"
            className="banner1-image"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <button
            style={{
              backgroundColor: "#ff6b00",
              color: "white",
              padding: "clamp(8px, 2vw, 16px) clamp(16px, 4vw, 32px)",
              fontSize: "clamp(14px, 1.5vw, 20px)",
              fontWeight: "bold",
              border: "none",
              borderRadius: "clamp(4px, 0.5vw, 8px)",
              cursor: "pointer",
              boxShadow: "0 0 15px rgba(255,107,0,0.2)",
              transition: "all 0.3s ease",
              direction: "rtl",
              position: "absolute",
              bottom: "2vw",
              marginRight: "55vw",
              whiteSpace: "nowrap",
              zIndex: 10,
              overflow: "hidden",
              animation: "pulse 2s infinite",
            }}
            onMouseOver={(e) => {
              // Stop the pulsing animation
              e.currentTarget.style.animation = "none";
              // Add a background shine effect
              e.currentTarget.style.backgroundImage =
                "linear-gradient(90deg, #ff6b00 0%, #ff6b00 40%, #ff8c3f 50%, #ff6b00 60%, #ff6b00 100%)";
              e.currentTarget.style.backgroundSize = "200% 100%";
              e.currentTarget.style.backgroundPosition = "100% 0";
              // Start the shine animation
              e.currentTarget.style.transition =
                "all 0.3s ease, background-position 1s";
              e.currentTarget.style.backgroundPosition = "0% 0";
              // Scale up slightly
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255,107,0,0.4)";
            }}
            onMouseOut={(e) => {
              // Restore the pulsing animation
              e.currentTarget.style.animation = "pulse 2s infinite";
              // Reset other styles
              e.currentTarget.style.backgroundImage = "none";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(255,107,0,0.2)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.98)";
              e.currentTarget.style.boxShadow = "0 0 10px rgba(255,107,0,0.3)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255,107,0,0.4)";
            }}
            onClick={() =>
              (window.location.href =
                "/product-details/67388e95b3dff873298d63ef")
            }
            className="cta-button"
          >
            פוסטר מעוצב אישית
          </button>

          {/* Add the CSS keyframes animation and desktop-only media queries */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
      @keyframes pulse {
        0% {
          box-shadow: 0 0 15px rgba(255,107,0,0.2);
          transform: scale(1);
        }
        50% {
          box-shadow: 0 0 25px rgba(255,107,0,0.4);
          transform: scale(1.03);
        }
        100% {
          box-shadow: 0 0 15px rgba(255,107,0,0.2);
          transform: scale(1);
        }
      }
      
      /* Desktop-only media queries - won't affect mobile */
      @media screen and (min-width: 1366px) and (max-width: 1920px) {
        .cta-button {
          bottom: 1vw !important;
          margin-right: 35vw !important;
        }
      }
      
      @media screen and (min-width: 1921px) {
        .cta-button {
          margin-right: 40vw !important;
        }
      }
    `,
            }}
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
            src={Banner1}
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
                <CircularProgress size={22} color="inherit" />
              ) : (
                "להירשם"
              )}
            </button>
            <div className="newsletter-inputs">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="השם שלך"
                style={{
                  fontFamily: "Noto Sans Hebrew",
                  direction: "rtl",
                  marginBottom: "10px",
                }}
                className="newsletter-input"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="הזן את המייל שלך"
                style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}
                required
                className="newsletter-input"
              />
            </div>
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
