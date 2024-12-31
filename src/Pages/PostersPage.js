import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Product from "../Components/Product";
import "../Style/DiecastPage.css";
// import DiecastBanner from "../Pictures/diecast-cat2.jpeg";
import ReactGA from "react-ga";

const DiecastPage = () => {
  const [diecast, setDiecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiecast = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products?category=Poster`
        );
        const sortedDiecast = response.data.sort(
          (a, b) => b.quantity - a.quantity
        );
        setDiecast(sortedDiecast);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching diecast products:", error);
        setLoading(false);
      }
    };

    fetchDiecast();
  }, []);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  });
  return (
    <div className="diecast-page">
      {/* <section className="diecast-banner">
        <div className="banner-image-container">
          <img
            src={DiecastBanner}
            alt="Diecast Collection"
            className="banner-image"
          />
        </div>
        <div className="banner-text">
          <h1>רכבי הדייקאסט המובילים שלנו</h1>
          <p>גלו את האוסף המרהיב שלנו של רכבי דייקאסט.</p>
        </div>
      </section> */}

      <h1 className="page-title">פוסטרים</h1>
      <div className="diecast-products-container">
        {loading ? (
          Array.from(new Array(6)).map((_, index) => (
            <div key={index} className="product-skeleton">
              <Skeleton variant="rectangular" width="100%" height={255} />
              <Skeleton width="80%" />
              <Skeleton width="60%" />
            </div>
          ))
        ) : diecast.length > 0 ? (
          diecast.map((product) => (
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
          <p className="no-products">אין מוצרים זמינים בקטגוריה זו.</p>
        )}
      </div>
    </div>
  );
};

export default DiecastPage;
