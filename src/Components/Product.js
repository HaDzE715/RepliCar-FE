import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import "../Style/Product.css";
import { useDrawer } from "../Components/DrawerContext";
import { Button } from "@mui/material";
// import { useCart } from "../Components/CartContext";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

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
  // const [showAddedMessage, setShowAddedMessage] = useState(false);

  const { openDrawer } = useDrawer();
  // const { dispatch } = useCart();
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.innerWidth >= 1024) {
      navigate(`/product-details/${id}`);
    } else {
      openDrawer(id);
    }
  };

  const handleBuyNow = (event) => {
    event.stopPropagation();
    // addProductToCart();
    setTimeout(() => {
      window.location.href = "/checkout";
    }, 100);
  };

  // const handleAddToCart = (event) => {
  //   event.stopPropagation();
  //   addProductToCart();
  //   setShowAddedMessage(true);
  //   setTimeout(() => setShowAddedMessage(false), 3000);
  // };

  // const addProductToCart = () => {
  //   const item = {
  //     id,
  //     name,
  //     size,
  //     price,
  //     discount,
  //     discount_price,
  //     image,
  //     quantity,
  //   };

  //   dispatch({ type: "ADD_TO_CART", item });

  //   const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  //   const updatedCart = [...existingCart, item];
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  // };

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
                <p className="product-price1 original-price">{price}₪</p>
                <p className="product-price discount-price-comp">
                  {discount_price}₪
                </p>
              </>
            ) : (
              <p className="product-price">{price}₪</p>
            )}
          </div>
          {quantity > 0 && (
            <>
              <div className="button-container">
                <Button
                  variant="contained"
                  className="product-custom-buy-now-button"
                  onClick={handleBuyNow}
                  style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}
                >
                  קנה עכשיו
                </Button>
                {/* <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{
                    width: "20px",
                    height: "20px",
                    fontWeight: "200",
                    paddingTop: "10px",
                  }}
                  onClick={handleAddToCart}
                />
                {showAddedMessage && (
                  <div className="added-message">המוצר נוסף לסל הקניות!</div>
                )} */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
