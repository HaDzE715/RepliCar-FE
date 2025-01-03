import React, { useState, useEffect } from "react";
import DiscountBanner from "../Pictures/discountbanner.jpg";
import "../Style/DiscountPage.css";
import Product from "../Components/Product";
import ReactGA from "react-ga";

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
      <section className="discount-banner">
        <div className="banner-content">
          <img
            src={DiscountBanner}
            alt="Discounts Collection"
            className="banner-image-discount"
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
