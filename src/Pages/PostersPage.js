import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Product from "../Components/Product";
import "../Style/DiecastPage.css";
import ReactGA from "react-ga";
import SEO from "../Components/SEO";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion"; // You'll need to install framer-motion

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
      {/* Add SEO component with posters-specific metadata */}
      <SEO
        title="פוסטרים של רכבים | Replicar - רפליקאר"
        description="פוסטרים איכותיים של רכבי יוקרה וקלאסיקות מהמותגים המובילים. עיצובים מרהיבים שישדרגו כל חלל ויוסיפו אווירה אקסקלוסיבית לבית או למשרד."
        url="https://replicar.co.il/posters"
      />

      {/* New Animated Banner Section */}
      <section className="poster-banner">
        <div
          className="banner-container"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
            marginBottom: "40px",
            marginTop: "30px",
            overflow: "hidden",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)",
          }}
        >
          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1.2 }}
            style={{
              position: "absolute",
              top: "-20px",
              left: "-20px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "linear-gradient(45deg, #3a3a3a, #707070)",
              zIndex: 1,
              filter: "blur(2px)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{
              position: "absolute",
              bottom: "-15px",
              right: "-15px",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "linear-gradient(45deg, #b1b1b1, #e0e0e0)",
              zIndex: 1,
              filter: "blur(2px)",
            }}
          />

          {/* Content Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "30px",
              position: "relative",
              zIndex: 5,
            }}
          >
            {/* Animation Container */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                flex: "1 1 400px",
                maxWidth: "550px",
                minWidth: "300px",
                margin: "0 auto",
              }}
            >
              <DotLottieReact
                src="https://lottie.host/19df4716-ea07-4302-9543-c75882d32794/1v11SqlkhV.lottie"
                loop
                autoplay
              />
            </motion.div>

            {/* Text Container */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                flex: "1 1 300px",
                padding: "20px",
                textAlign: "right",
                direction: "rtl",
              }}
            >
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontSize: "clamp(2rem, 5vw, 2.8rem)",
                  fontWeight: "800",
                  color: "#333",
                  marginBottom: "15px",
                }}
              >
                פוסטרים מרהיבים
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  lineHeight: "1.6",
                  color: "#555",
                  marginBottom: "25px",
                }}
              >
                הוסיפו סטייל לחלל שלכם עם הפוסטרים המרהיבים של רפליקאר. עיצובים
                ייחודיים של רכבי יוקרה וקלאסיקות בהדפסה איכותית.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

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
