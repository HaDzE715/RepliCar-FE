import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import "../Style/Product.css";
import { useDrawer } from "../Components/DrawerContext";

const Product = ({
  id,
  name,
  size,
  price,
  discount,
  discount_price,
  image,
  quantity,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { openDrawer } = useDrawer();

  const handleClick = () => {
    openDrawer(id);
  };

  return (
    <div className="product-link" onClick={handleClick}>
      <div className={`product-card ${quantity === 0 ? "sold-out" : ""}`}>
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
          {quantity === 0 && <span className="sold-out-label">Sold Out</span>}
          {discount && <span className="discount-label">Discount</span>}
        </div>
        <div className="product-details">
          <h2 className="product-name">{name}</h2>
          <p className="product-size">{size}</p>
          <div className="product-price-container">
            {discount ? (
              <>
                <p className="product-price original-price">{price}₪</p>
                <p className="product-price discount-price-comp">
                  {discount_price}₪
                </p>
              </>
            ) : (
              <p className="product-price">{price}₪</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
