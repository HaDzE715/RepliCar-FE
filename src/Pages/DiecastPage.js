import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Product from "../Components/Product";
import "../Style/DiecastPage.css";
import ReactGA from "react-ga";
import SEO from "../Components/SEO";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const DiecastPage = () => {
  const [diecast, setDiecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiecast = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products?category=Diecast`
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
  }, []);

  return (
    <div className="diecast-page">
      <SEO
        title="דגמי רכב דייקאסט | Replicar - רפליקאר"
        description="גלו את קולקציית רכבי הדייקאסט המדויקים שלנו. דגמים איכותיים בקנה מידה מדויק של מכוניות יוקרה וקלאסיות מהמותגים המובילים בעולם."
        url="https://replicar.co.il/diecast"
      />

      {/* Banner Section */}
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto 40px auto",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          position: "relative",
        }}
      >
        {/* Decorative Elements */}
        <div
          style={{
            position: "absolute",
            top: "-20px",
            left: "-20px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #ff4d4d, #ff8c00)",
            zIndex: 1,
            filter: "blur(15px)",
            opacity: 0.3,
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-15px",
            right: "-15px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #ff8c00, #ffd700)",
            zIndex: 1,
            filter: "blur(15px)",
            opacity: 0.3,
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
          {/* Text Container */}
          <div
            style={{
              flex: "1 1 300px",
              padding: "20px",
              textAlign: "right",
              direction: "rtl",
            }}
          >
            <h2
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: "clamp(2rem, 5vw, 2.8rem)",
                fontWeight: "800",
                color: "#ffffff",
                marginBottom: "15px",
              }}
            >
              רכבי דייקאסט יוקרתיים
            </h2>

            <p
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                lineHeight: "1.6",
                color: "#d9d9d9",
                marginBottom: "25px",
              }}
            >
              קולקציית דגמי דייקאסט מדויקים של המכוניות האיקוניות והיוקרתיות
              ביותר. מיוצרים בקפידה עם תשומת לב לכל פרט.
            </p>
          </div>

          {/* Animation Container */}
          <div
            style={{
              flex: "1 1 400px",
              maxWidth: "480px",
              minWidth: "300px",
              margin: "0 auto",
              background:
                "radial-gradient(circle, rgba(30,30,30,0.7) 0%, rgba(30,30,30,0) 70%)",
              borderRadius: "8px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
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
                boxShadow: "inset 0 0 15px rgba(255, 140, 0, 0.1)",
                pointerEvents: "none",
              }}
            />
            <DotLottieReact
              src="https://lottie.host/aafb2d91-f7fd-4871-a2db-3efca6654e85/e5CEPPdkuB.lottie"
              loop
              autoplay
              style={{
                width: "100%",
                height: "100%",
                filter: "drop-shadow(0 8px 12px rgba(0, 0, 0, 0.3))",
              }}
            />
          </div>
        </div>

        {/* Bottom Feature Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            padding: "15px 20px",
            background: "rgba(0, 0, 0, 0.4)",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
            direction: "rtl",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "8px 15px",
              color: "#ffffff",
            }}
          >
            <span style={{ marginLeft: "8px", fontSize: "18px" }}>🏎️</span>
            <span
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: "0.9rem",
              }}
            >
              דגמים מדויקים
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "8px 15px",
              color: "#ffffff",
            }}
          >
            <span style={{ marginLeft: "8px", fontSize: "18px" }}>✨</span>
            <span
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: "0.9rem",
              }}
            >
              איכות פרימיום
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "8px 15px",
              color: "#ffffff",
            }}
          >
            <span style={{ marginLeft: "8px", fontSize: "18px" }}>🚚</span>
            <span
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: "0.9rem",
              }}
            >
              משלוח מהיר
            </span>
          </div>
        </div>
      </div>

      <h1 className="page-title">רכבים</h1>
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
