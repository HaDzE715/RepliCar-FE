import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import "../Style/Product.css";
import { useDrawer } from "../Components/DrawerContext";
import { Button } from "@mui/material";
import { useCart } from "../Components/CartContext";
import { useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";

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
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const { openDrawer } = useDrawer();
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const finalPrice = discount ? discount_price : price;

  const handleClick = () => {
    if (window.innerWidth >= 1024) {
      navigate(`/product-details/${id}`);
      setTimeout(() => {
        document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
        document.body.scrollTo({ top: 0, behavior: "smooth" }); // For Safari
      }, 100);
    } else {
      openDrawer(id);
    }
  };

  const handleAddToCart = (event) => {
    event.stopPropagation(); // Prevents the event from triggering other actions
    const item = {
      _id: id,
      name,
      size,
      price: finalPrice, // Use the final price based on discount status
      discount,
      discount_price,
      image,
      quantity: 1,
    };

    // Get existing cart from local storage
    let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = existingCart.findIndex(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push(item);
    }

    // Save updated cart to local storage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Update the cart in your application state
    dispatch({ type: "SET_CART", cart: existingCart });

    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
  };

  const handleBuyNow = (event) => {
    event.stopPropagation(); // Prevents the event from triggering other actions

    const item = {
      _id: id,
      name,
      size,
      price: finalPrice, // Use the final price based on discount status
      discount,
      discount_price,
      image,
      quantity: 1,
    };

    // Get existing cart from local storage
    let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = existingCart.findIndex(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push(item);
    }

    // Save updated cart to local storage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Update the cart in your application state
    dispatch({ type: "SET_CART", cart: existingCart });

    // Scroll to the top of the page and navigate to checkout
    navigate("/checkout");
    setTimeout(() => {
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
      document.body.scrollTo({ top: 0, behavior: "smooth" }); // For Safari
    }, 100);
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
                <HiOutlineShoppingCart
                  style={{
                    marginLeft: "0px",
                    marginTop: "10px",
                    cursor: "pointer",
                    color: "black",
                    width: "27px",
                    height: "27px",
                  }}
                  onClick={handleAddToCart}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {showAddedMessage && (
        <div className="added-message">המוצר נוסף לסל הקניות!</div>
      )}
    </div>
  );
};

export default Product;
