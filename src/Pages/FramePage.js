import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Product from "../Components/Product";
import "../Style/FramesPage.css";
import ReactGA from "react-ga";
import SEO from "../Components/SEO";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const FramesPage = () => {
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products?category=Frame`
        );
        const sortedFrames = response.data.sort(
          (a, b) => b.quantity - a.quantity
        );
        setFrames(sortedFrames);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching frames:", error);
        setLoading(false);
      }
    };

    fetchFrames();
  }, []);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <div className="frames-page">
      <SEO
        title="מסגרות דייקאסט מעוצבות | Replicar - רפליקאר"
        description="מסגרות דייקאסט יוקרתיות לאוהבי רכבים וחובבי אספנות. מבחר עיצובים מרהיבים המשלבים דגמי רכב קלאסיים ומודרניים במסגרות איכותיות לקיר."
        url="https://replicar.co.il/frames"
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
          background: "linear-gradient(135deg, #202020 0%, #353535 100%)",
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
            background: "linear-gradient(45deg, #6a6a6a, #949494)",
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
            background: "linear-gradient(45deg, #949494, #c4c4c4)",
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
              מסגרות דייקאסט מעוצבות
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
              מסגרות יוקרתיות המשלבות דגמי רכב מדויקים ליצירת פריט אספנות
              ייחודי. שדרגו את הקיר שלכם בסטייל אמיתי.
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
                "radial-gradient(circle, rgba(40,40,40,0.7) 0%, rgba(30,30,30,0) 70%)",
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
                boxShadow: "inset 0 0 15px rgba(200, 200, 200, 0.1)",
                pointerEvents: "none",
              }}
            />
            <DotLottieReact
              src="https://lottie.host/ecc30920-754b-4d16-94cf-bc9bb3ff2118/UG2ZcYy7oF.lottie"
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
          ></div>

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
            <span style={{ marginLeft: "8px", fontSize: "18px" }}>🏆</span>
            <span
              style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: "0.9rem",
              }}
            >
              פריט אספנות
            </span>
          </div>
        </div>
      </div>

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
