import React, { useState, useEffect } from "react";
import "../Style/DiscountPage.css";
import Product from "../Components/Product";
import ReactGA from "react-ga";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion"; // You'll need to install framer-motion for animation

const DiscountPage = () => {
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [setActiveIndex] = useState(null);

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
{/* 1. Lottie Animation - Bigger Size */}
<div 
className="animation-container"
style={{ 
  width: '100%', 
  maxWidth: '800px',
  margin: '0 auto', 
  marginTop: "15%", 
  marginBottom: "33px",
  marginRight: "30%", // Use margin instead of padding
  transform: 'rotate(-2deg) scale(1.2)',
  transformOrigin: 'center center'
}}>
  <DotLottieReact
    src="https://lottie.host/06d24c78-a295-499e-a457-8da814e4f1e3/2C1qNWZNnF.lottie"
    loop
    autoplay
  />
</div>
      
      {/* 2. Animated "חג פסח שמח" */}
<div style={{ 
  margin: '0 auto', 
  position: 'relative',
  height: 'auto',
  minHeight: '120px',
  overflow: 'visible',
  width: '100%',
  maxWidth: '600px',
  padding: '10px 0 30px',

}}>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    style={{
      position: 'absolute',
      left: '10%',
      top: '-10px',
      width: '80%',
      height: '100%',
      background: 'rgba(0, 87, 184, 0.06)',
      borderRadius: '2px 58px 2px 58px',
      transform: 'rotate(-2deg)',
      zIndex: 1
    }}
  />
  
  <motion.div
    style={{
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingRight: '0%',
      direction: 'rtl',
      width: '100%',
    }}
  >
    <motion.span
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        fontFamily: "'Heebo', sans-serif", // Modern Hebrew font
        fontSize: 'clamp(2.8rem, 6vw, 3.8rem)', // Responsive font size
        fontWeight: '800',
        color: '#2d3bca',
        lineHeight: '1.1',
        marginBottom: '-0.1em',
        paddingLeft: '10%',
        textAlign: 'center'
      }}
    >
      חג פסח
    </motion.span>
    
    <motion.span
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        fontFamily: "'Heebo', sans-serif",
        fontSize: 'clamp(2.5rem, 5vw, 3.2rem)', // Responsive font size
        fontWeight: '700',
        background: 'linear-gradient(90deg, #ff5b5b, #ffb650)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        paddingRight: '35%',
        textAlign: 'center'
      }}
    >
      שמח
    </motion.span>
  </motion.div>
  
  {/* Decorative element */}
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.6 }}
    style={{
      position: 'absolute',
      right: '18%',
      bottom: '30px',
      width: 'clamp(20px, 5vw, 40px)', // Responsive size
      height: 'clamp(20px, 5vw, 40px)', // Responsive size
      borderRadius: '50%',
      background: '#ffb650',
      zIndex: 3
    }}
  />
</div>
      
      {/* 3. Promotional sentence */}
      <h3
        className="page-title"
        style={{ 
          textAlign: "center", 
          fontSize: "18px", 
          marginTop: "10px", 
          marginBottom: "30px",
          direction: 'rtl' 
        }}
      >חג פסח שמח מרפליקאר – מבצע בלעדי על מגוון מוצרים במחירים חגיגיים!

      </h3>
      
      <div className="frames-products-container">
        {discountedProducts.length > 0 ? (
          discountedProducts.map((product, index) => (
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
              onClick={() => setActiveIndex(index)}
            />
          ))
        ) : (
          <p>אין מוצרים במבצע כרגע.</p>
        )}
      </div>
    </div>
  );
};

export default DiscountPage;