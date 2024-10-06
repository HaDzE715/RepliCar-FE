import React from "react";
import "../Style/AboutUs.css";
import ReactGA from "react-ga";
import { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  });
  return (
    <div className="about-us-container">
      <h1 className="about-us-title">קצת עלינו</h1>

      <section className="about-us-section">
        <h2 className="about-us-subtitle">איך הכל התחיל?</h2>
        <p className="about-us-text">
          הכל התחיל מאהבה גדולה לרכבי יוקרה. אנחנו, בבית העסק שלנו, חובבים
          מושבעים של רכבים ולא משנה מה הגודל שלהם. יום אחד, אחרי עוד שיחה נלהבת
          על דגמי מכוניות, החלטנו להביא את האהבה הזו אליכם – לבית, למשרד, לכל
          מקום שתבחרו. וכך נולד הרעיון ל-Replicar, עסק שמביא את חלום המכוניות
          היוקרתיות לכל מקום, ובכל גודל.
        </p>
      </section>

      <section className="about-us-section">
        <h2 className="about-us-subtitle">למה קוראים לנו "Replicar"?</h2>
        <p className="about-us-text">
          השם "Replicar" משלב בין המילה "Replica", שמשמעותה העתק מדויק, לבין
          המילה "Car". הרעיון הוא להביא את הקסם של מכוניות היוקרה הקלאסיות בצורת
          דגמים מרהיבים ואיכותיים, כך שכל חובב רכב יוכל ליהנות מהחוויה הזאת גם
          בביתו.
        </p>
      </section>

      <section className="about-us-section">
        <h2 className="about-us-subtitle">מה מניע אותנו?</h2>
        <p className="about-us-text">
          אנחנו מאמינים שדגם טוב הוא יותר מסתם פריט על המדף. הוא סיפור, הוא
          זיכרון, הוא חלום. כל רכב קטן שאנחנו בוחרים הוא יצירת אומנות בפני עצמה,
          עם דגש על כל פרט ופרט – בדיוק כמו במכונית אמיתית. אצלנו כל דגם מספר את
          הסיפור שלו, ואנחנו כאן כדי לוודא שתמצאו את הסיפור שמדבר אליכם.
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
  );
};

export default AboutUs;
