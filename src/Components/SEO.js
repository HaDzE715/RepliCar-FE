// src/components/SEO.js
import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, image, url }) => {
  // Default values
  const defaultTitle = "Replicar - רפליקאר";
  const defaultDescription = "רפליקאר – עידן חדש של עיצוב לחובבי רכב. פוסטרים יוקרתיים, דייקאסט ומסגרות דייקאסט של רכבים בעיצובים מושלמים. גלו את הקולקציה הבלעדית שלנו, המשלבת אמנות רכב עם איכות ועיצוב עכשווי";
  const defaultImage = "https://wwww.replicar.co.il/logo1-nobg.png"; // Update with your actual logo path
  const defaultUrl = "https://replicar.co.il";

  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url || defaultUrl} />
      <meta property="twitter:title" content={title || defaultTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={image || defaultImage} />

      {/* Additional SEO tags */}
      <meta name="keywords" content="רפליקאר, דייקאסט, מכוניות אספנות, מסגרות דייקאסט, פוסטרים רכבים, מתנות לגבר, עיצוב רכבים" />
      <meta name="author" content="Replicar" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url || defaultUrl} />
    </Helmet>
  );
};

export default SEO;