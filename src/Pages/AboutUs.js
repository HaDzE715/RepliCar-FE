import React, { useEffect } from "react";
import "../Style/AboutUs.css";
import ReactGA from "react-ga";
import SEO from "../Components/SEO";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const AboutUs = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      {/* Banner at the top of the page */}
      <div
        style={{
          width: "100%",
          maxWidth: "100%", // Full width at the top
          margin: 0, // Remove margin to position at very top
          borderRadius: 0, // Remove border radius for full-width top positioning
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #202020 0%, #353535 50%, #3a3a45 75%, #2c2c35 100%)",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
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
            background: "linear-gradient(45deg, #3a3a6a, #606090)",
            zIndex: 1,
            filter: "blur(15px)",
            opacity: 0.4,
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
            maxWidth: "1200px",
            margin: "0 auto",
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
                fontFamily: "Noto Sans Hebrew, sans-serif",
                fontSize: "clamp(2rem, 5vw, 2.8rem)",
                fontWeight: "800",
                color: "#ffffff",
                marginBottom: "15px",
              }}
            >
              קצת עלינו
            </h2>

            <p
              style={{
                fontFamily: "Noto Sans Hebrew, sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                lineHeight: "1.6",
                color: "#d9d9d9",
                marginBottom: "25px",
              }}
            >
              הכירו את הסיפור שלנו, מה מניע אותנו, ואיך אנחנו בוחרים כל דגם
              בקפידה.
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
              src="https://lottie.host/faa95a1d-8d62-473f-96e6-8eed3dbc88c3/DdwMd0lQJb.lottie"
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
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0",
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
            <span style={{ marginLeft: "8px", fontSize: "18px" }}>🚗</span>
            <span
              style={{
                fontFamily: "Noto Sans Hebrew, sans-serif",
                fontSize: "0.9rem",
              }}
            >
              דגמים איכותיים
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
            <span style={{ marginLeft: "8px", fontSize: "18px" }}>⭐</span>
            <span
              style={{
                fontFamily: "Noto Sans Hebrew, sans-serif",
                fontSize: "0.9rem",
              }}
            >
              שירות מעולה
            </span>
          </div>
        </div>
      </div>

      {/* About Us Content Section */}
      <div className="about-us-container" style={{ padding: "40px 20px" }}>
        {/* Add SEO component with About page specific metadata */}
        <SEO
          title="קצת עלינו | Replicar - רפליקאר"
          description="הכירו את רפליקאר - עסק שנולד מאהבה לרכבי יוקרה ומביא לכם דגמים מדויקים ואיכותיים של מכוניות קלאסיות. גלו את הסיפור שלנו, הערכים שלנו, ואיך אנחנו בוחרים כל דגם בקפידה."
          url="https://replicar.co.il/about"
        />

        <section className="about-us-section">
          <h2 className="about-us-subtitle">איך הכל התחיל?</h2>
          <p className="about-us-text">
            הכל התחיל מאהבה גדולה לרכבי יוקרה. אנחנו, בבית העסק שלנו, חובבים
            מושבעים של רכבים ולא משנה מה הגודל שלהם. יום אחד, אחרי עוד שיחה
            נלהבת על דגמי מכוניות, החלטנו להביא את האהבה הזו אליכם – לבית,
            למשרד, לכל מקום שתבחרו. וכך נולד הרעיון ל-Replicar, עסק שמביא את
            חלום המכוניות היוקרתיות לכל מקום, ובכל גודל.
          </p>
        </section>

        <section className="about-us-section">
          <h2 className="about-us-subtitle">למה קוראים לנו "Replicar"?</h2>
          <p className="about-us-text">
            השם "Replicar" משלב בין המילה "Replica", שמשמעותה העתק מדויק, לבין
            המילה "Car". הרעיון הוא להביא את הקסם של מכוניות היוקרה הקלאסיות
            בצורת דגמים מרהיבים ואיכותיים, כך שכל חובב רכב יוכל ליהנות מהחוויה
            הזאת גם בביתו.
          </p>
        </section>

        <section className="about-us-section">
          <h2 className="about-us-subtitle">מה מניע אותנו?</h2>
          <p className="about-us-text">
            אנחנו מאמינים שדגם טוב הוא יותר מסתם פריט על המדף. הוא סיפור, הוא
            זיכרון, הוא חלום. כל רכב קטן שאנחנו בוחרים הוא יצירת אומנות בפני
            עצמה, עם דגש על כל פרט ופרט – בדיוק כמו במכונית אמיתית. אצלנו כל דגם
            מספר את הסיפור שלו, ואנחנו כאן כדי לוודא שתמצאו את הסיפור שמדבר
            אליכם.
          </p>
        </section>

        <section className="about-us-section">
          <h2 className="about-us-subtitle">למה אנחנו?</h2>
          <ul className="about-us-list">
            <li style={{ fontFamily: "Noto sans hebrew" }}>
              <strong style={{ fontFamily: "Noto sans hebrew" }}>
                איכות בלי פשרות:
              </strong>{" "}
              כל דגם מיוצר באהבה ובדיוק מירבי.
            </li>
            <li style={{ fontFamily: "Noto sans hebrew" }}>
              <strong style={{ fontFamily: "Noto sans hebrew" }}>
                שירות עם חיוך:
              </strong>{" "}
              אנחנו כאן כדי לוודא שהחוויה שלכם תהיה מיוחדת ומרגשת, בדיוק כמו
              הדגמים שלנו.
            </li>
            <li style={{ fontFamily: "Noto sans hebrew" }}>
              <strong style={{ fontFamily: "Noto sans hebrew" }}>
                מבחר עשיר:
              </strong>{" "}
              מחפשים את הדגם המיוחד שלכם? בטוח שתמצאו אותו אצלנו, ואם לא – אנחנו
              כאן כדי לעזור.
            </li>
          </ul>
        </section>

        <section className="about-us-section">
          <h2 className="about-us-subtitle">מי אנחנו?</h2>
          <p className="about-us-text">
            אנחנו צוות קטן ומסור של אוהבי רכבים מושבעים, שבאים לעבודה עם חיוך כל
            יום. האהבה שלנו למכוניות היא מה שמניע אותנו, והשירות האישי והחם שלנו
            הוא מה שמייחד אותנו. כשאתם קונים אצלנו, אתם לא רק רוכשים דגם – אתם
            מצטרפים למשפחה.
          </p>
        </section>

        <section className="about-us-section">
          <h2 className="about-us-subtitle">איך זה עובד?</h2>
          <p className="about-us-text">
            אנחנו בוחרים כל דגם בקפידה, ומקפידים להשיג רק את הדגמים האיכותיים
            והמדויקים ביותר. כל דגם נבחר בזכות האיכות הגבוהה שלו, הדיוק בפרטים,
            והיכולת להחזיר את הקסם של הרכב האמיתי. כשאתם מקבלים את הדגם לידיים,
            תדעו שבחרנו עבורכם את הטוב ביותר כדי להבטיח חוויה מושלמת ומיוחדת.
          </p>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
