import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import "../Style/Product.css";
import { useDrawer } from "../Components/DrawerContext";
import { Button } from "@mui/material";
import { useCart } from "../Components/CartContext"; // Assuming you have a CartContext for handling cart actions

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
  const { dispatch } = useCart(); // Assuming you have a cart context

  const handleClick = () => {
    openDrawer(id); // This function opens the product in a drawer or modal
  };

  const handleBuyNow = (event) => {
    event.stopPropagation(); // Prevent the click from propagating to the product card's onClick
    const item = {
      id,
      name,
      size,
      price,
      discount,
      discount_price,
      image,
      quantity,
    };
    dispatch({ type: "ADD_TO_CART", item });
    const updatedCart = [
      ...JSON.parse(localStorage.getItem("cart") || "[]"),
      item,
    ];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setTimeout(() => {
      window.location.href = "/checkout";
    }, 100); // Slight delay to ensure state update
  };

  return (
    <div className="product-link">
      <div
        className={`product-card ${quantity === 0 ? "sold-out" : ""}`}
        onClick={handleClick}
      >
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
          {quantity > 0 && (
            <Button
              variant="contained"
              className="custom-buy-now-button"
              onClick={handleBuyNow}
              style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}
            >
              קנה עכשיו
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
