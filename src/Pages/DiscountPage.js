import React, { useState, useEffect } from "react";
import "../Style/DiscountPage.css";
import Product from "../Components/Product";
import ReactGA from "react-ga";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";

const DiscountPage = () => {
  const [discountedProducts, setDiscountedProducts] = useState([]);
  // Using a ref instead of state since we only need to track the value for click handlers
  const activeIndexRef = React.useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a slight delay before starting animations
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/products/discounted`
        );
        const data = await response.json();
        setDiscountedProducts(data);
      } catch (error) {
        console.error("Error fetching discounted products:", error);
      }
    };

    fetchDiscountedProducts();
  }, []);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <div className="discount-page">
      {/* 1. Main Banner Container */}
      <div
        className="sale-banner-container"
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
          marginTop: "40px",
          marginBottom: "40px",
          position: "relative",
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)",
        }}
      >
        {/* Animated Background Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isVisible ? { opacity: 0.8, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 1.2 }}
          style={{
            position: "absolute",
            top: "-20px",
            left: "-20px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #ff6b6b, #ff8e53)",
            zIndex: 1,
            filter: "blur(2px)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isVisible ? { opacity: 0.7, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 1.2, delay: 0.3 }}
          style={{
            position: "absolute",
            bottom: "-15px",
            right: "-15px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #2d3bca, #5e72e4)",
            zIndex: 1,
            filter: "blur(2px)",
          }}
        />

        {/* Sale Tag */}
        <motion.div
          initial={{ opacity: 0, y: -50, rotate: -10 }}
          animate={
            isVisible
              ? { opacity: 1, y: 0, rotate: -5 }
              : { opacity: 0, y: -50, rotate: -10 }
          }
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "#ff3547",
            color: "white",
            padding: "8px 16px",
            borderRadius: "20px",
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(255, 53, 71, 0.3)",
            zIndex: 10,
          }}
        >
          מבצע
        </motion.div>

        {/* 2. Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.8 }}
          className="animation-container"
          style={{
            width: "100%",
            maxWidth: "480px",
            margin: "0 auto",
            marginTop: "30px",
            marginBottom: "20px",
            zIndex: 5,
            position: "relative",
            background:
              "radial-gradient(circle, rgba(240,240,240,0.5) 0%, rgba(255,255,255,0) 70%)",
            borderRadius: "8px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "8px",
              boxShadow: "inset 0 0 15px rgba(0, 0, 0, 0.05)",
              pointerEvents: "none",
            }}
          />
          <DotLottieReact
            src="https://lottie.host/9b9bb46a-9fe5-4e5f-9800-27c85252ca1d/hZmFlcOdpU.lottie"
            loop
            autoplay
            style={{
              width: "100%",
              height: "100%",
              filter: "drop-shadow(0 8px 12px rgba(0, 0, 0, 0.15))",
            }}
          />
        </motion.div>

        {/* 3. Main Title Section */}
        <div
          style={{
            margin: "0 auto",
            position: "relative",
            height: "auto",
            minHeight: "120px",
            overflow: "visible",
            width: "100%",
            maxWidth: "600px",
            padding: "10px 0 30px",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: "absolute",
              left: "10%",
              top: "-10px",
              width: "80%",
              height: "100%",
              background: "rgba(45, 59, 202, 0.08)",
              borderRadius: "2px 58px 2px 58px",
              transform: "rotate(-2deg)",
              zIndex: 1,
            }}
          />

          <motion.div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingRight: "0%",
              direction: "rtl",
              width: "100%",
            }}
          >
            <motion.span
              initial={{ x: 80, opacity: 0 }}
              animate={isVisible ? { x: 0, opacity: 1 } : { x: 80, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: "clamp(2.8rem, 6vw, 3.8rem)",
                fontWeight: "800",
                color: "#2d3bca",
                lineHeight: "1.1",
                marginBottom: "-0.1em",
                textAlign: "center",
              }}
            >
              מבצע אביב
            </motion.span>

            <motion.span
              initial={{ x: -60, opacity: 0 }}
              animate={
                isVisible ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }
              }
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 3.2rem)",
                fontWeight: "700",
                background: "linear-gradient(90deg, #ff5b5b, #ffb650)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
              }}
            >
              עד 50% הנחה
            </motion.span>
          </motion.div>

          {/* Decorative element */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{
              position: "absolute",
              right: "18%",
              bottom: "30px",
              width: "clamp(20px, 5vw, 40px)",
              height: "clamp(20px, 5vw, 40px)",
              borderRadius: "50%",
              background: "#ffb650",
              zIndex: 3,
            }}
          />
        </div>

        {/* 4. Promotional sentence */}
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="page-title"
          style={{
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "600",
            marginTop: "10px",
            marginBottom: "30px",
            padding: "0 20px",
            direction: "rtl",
          }}
        >
          מבצעים בלעדיים על המוצרים הפרימיום שלנו - הצעה לזמן מוגבל!
        </motion.h3>
      </div>

      {/* 5. Products Display */}
      <div className="frames-products-container">
        {discountedProducts.length > 0 ? (
          discountedProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ y: 30, opacity: 0 }}
              animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Product
                id={product._id}
                name={product.name}
                size={product.size}
                price={product.price}
                discount={product.discount}
                discount_price={product.discount_price}
                image={product.image}
                quantity={product.quantity}
                onClick={() => {
                  activeIndexRef.current = index;
                }}
              />
            </motion.div>
          ))
        ) : (
          <p>אין מוצרים במבצע כרגע.</p>
        )}
      </div>
    </div>
  );
};

export default DiscountPage;
