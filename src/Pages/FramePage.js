import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Product from "../Components/Product";
import "../Style/FramesPage.css";
import FrameBanner from "../Pictures/Frames.jpg";

const FramesPage = () => {
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products?category=Frames`
        );
        console.log("Frames data:", response.data);
        setFrames(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching frames:", error);
        setLoading(false);
      }
    };

    fetchFrames();
  }, []);

  return (
    <div className="frames-page">
      <section className="frames-banner">
        <div className="banner-content">
          <img
            src={FrameBanner} // Replace with the actual path to your image
            alt="Frames Collection"
            className="banner-image"
          />
          <div className="banner-text">
            <h1>המסגרות המובילות שלנו</h1>
            <p>החלום היחדי שרואים לפני שינה.</p>
          </div>
        </div>
      </section>
      <h1 className="page-title">מסגרות</h1>
      <div className="frames-products-container">
        {loading ? (
          Array.from(new Array(6)).map((_, index) => (
            <div key={index} className="product-skeleton">
              <Skeleton variant="rectangular" width="100%" height={255} />
              <Skeleton width="80%" />
              <Skeleton width="60%" />
            </div>
          ))
        ) : frames.length > 0 ? (
          frames.map((product) => (
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
            />
          ))
        ) : (
          <div className="no-products-container">
            <p className="no-products">אין מוצרים זמינים בקטגוריה זו.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FramesPage;
