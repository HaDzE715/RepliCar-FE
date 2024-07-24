import React, { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import "../Style/Product.css";

const Product = ({ id, name, size, price, image }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link to={`/product/${id}`} className="product-link">
      <div className="product-card">
        <div className="product-image-container">
          {!imageLoaded && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={255}
              className="image-skeleton"
            />
          )}
          <img
            src={image}
            alt={name}
            className={`product-image ${imageLoaded ? "loaded" : "loading"}`}
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? "block" : "none" }}
          />
        </div>
        <div className="product-details">
          <h2 className="product-name">{name}</h2>
          <p className="product-size">{size}</p>
          <p className="product-price">{price}₪</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
