import React, { useState, useEffect } from "react";
import DiscountBanner from "../Pictures/bf2.jpeg";
import "../Style/DiscountPage.css";
import Product from "../Components/Product";
import ReactGA from "react-ga";

const DiscountPage = () => {
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [setActiveIndex] = useState(null);
  const [balloons, setBalloons] = useState([]);
  const [fadeOut, setFadeOut] = useState(false); // Add state to track fade-out

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

    const generateBalloons = () => {
      const maxBalloons = 100; // Limit the number of balloons
      const minSpacing = 5; // Minimum spacing between balloons (in %)
      const balloonWidth = 10; // Balloon width in percentage of viewport
      let currentLeft = -440;

      const balloonArray = Array.from({ length: maxBalloons }, (_, index) => {
        currentLeft +=
          minSpacing + (Math.random() * (100 - minSpacing)) / maxBalloons;
        return {
          id: index,
          left: Math.min(currentLeft, 90 - balloonWidth), // Ensure balloons stay within the viewport
          delay: Math.random() * 5, // Random animation delay
        };
      });
      setBalloons(balloonArray);
    };

    generateBalloons();

    const timeout = setTimeout(() => {
      setFadeOut(true); // Trigger fade-out animation
      setTimeout(() => {
        setBalloons([]); // Clear balloons after fade-out completes
      }, 1000); // Matches the CSS fade-out duration
    }, 4000);

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, []);

  return (
    <div className="discount-page">
      {/* Balloons */}
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className={`balloon-container ${fadeOut ? "fade-out" : ""}`} // Use fadeOut state
          style={{
            left: `${balloon.left}%`, // Ensure balloons are spaced apart
            animationDelay: `${balloon.delay}s`, // Random animation delay
          }}
        >
          <svg
            className="balloon-svg"
            viewBox="0 0 100 200"
            width="50"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Balloon Shape */}
            <ellipse
              cx="50"
              cy="50"
              rx="30"
              ry="40"
              fill="red"
              stroke="black"
              strokeWidth="2"
            />
            {/* Balloon Knot */}
            <polygon
              points="45,90 55,90 50,100"
              fill="red"
              stroke="black"
              strokeWidth="2"
            />
            {/* Curved String */}
            <path
              d="M50 100 C40 130, 60 160, 50 200"
              stroke="black"
              fill="transparent"
              strokeWidth="2"
            />
          </svg>
        </div>
      ))}
      <section className="discount-banner">
        <div className="banner-content">
          <img
            src={DiscountBanner}
            alt="Discounts Collection"
            className="banner-image"
          />
        </div>
      </section>
      <h2 className="page-title" style={{ justifyContent: "center" }}>
        מוצרים בהנחה
      </h2>
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
