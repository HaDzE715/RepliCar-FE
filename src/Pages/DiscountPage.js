import React, { useState, useEffect } from "react";
import "../Style/DiscountPage.css";
import Product from "../Components/Product";
import ReactGA from "react-ga";
import Speedometer from "../Components/Speedometer";

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
      <Speedometer />
      <h2
        className="page-title"
        style={{ textAlign: "center", fontWeight: "bold" }}
      >
        הפתיעו את בן הזוג שלכם עם המתנה המושלמת!
      </h2>
      <h3
        className="page-title"
        style={{ textAlign: "center", fontSize: "18px", marginTop: "10px" }}
      >
        מבצע בלעדי לוולנטיין - מגוון מוצרים החל מ-199.99₪!
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
