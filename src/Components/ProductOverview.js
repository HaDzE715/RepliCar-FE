import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "@mui/material/Skeleton";
import "../Style/ProductOverview.css";
import SelectVariants from "./SelectVariants";
import { Button } from "@mui/material";
import SizeTable from "./SizeTable";
import { useCart } from "../Components/CartContext";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

const ProductOverview = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [additionalImagesLoaded, setAdditionalImagesLoaded] = useState([]);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const { dispatch } = useCart();
  const [showNotifyForm, setShowNotifyForm] = useState(false);
  const [notificationMethod, setNotificationMethod] = useState("whatsapp");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products/${productId}`
        );
        setProduct(response.data);
        setCurrentImage(response.data.image);
        setAdditionalImagesLoaded(
          new Array(response.data.additionalImages.length).fill(false)
        );
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <Skeleton variant="rectangular" width="100%" height="100%" />;
  }

  const updateLocalStorageCart = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddToCart = () => {
    const item = { ...product, quantity };
    dispatch({ type: "ADD_TO_CART", item });
    updateLocalStorageCart([
      ...JSON.parse(localStorage.getItem("cart") || "[]"),
      item,
    ]);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
  };

  const handleBuyNow = () => {
    const item = { ...product, quantity };
    dispatch({ type: "ADD_TO_CART", item });
    updateLocalStorageCart([
      ...JSON.parse(localStorage.getItem("cart") || "[]"),
      item,
    ]);
    setTimeout(() => {
      window.location.href = "/checkout";
    }, 100); // Slight delay to ensure state update
  };

  const handleClick = (image) => {
    setCurrentImage(image);
    setMainImageLoaded(false);
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + 4 < product.additionalImages.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const colorOptions = product.colors.map((color) => ({
    value: color.toLowerCase(),
    label: color,
  }));

  const sizeOptions = [{ value: product.size, label: product.size }];
  const handleNotifyMeClick = () => {
    setShowNotifyForm(!showNotifyForm);
  };
  const handleNotifyMeSubmit = async (e) => {
    e.preventDefault();

    const notificationData = {
      fullName: e.target.fullName.value,
      email: e.target.email ? e.target.email.value : null,
      phone: e.target.phone ? e.target.phone.value : null,
      notificationMethod: e.target.notificationMethod.value,
      productId: productId,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/notify-me`,
        notificationData
      );
      if (response.status === 200) {
        setSuccessMessage(
          "הבקשה שלך התקבלה! אנו נודיע לך כאשר המוצר יחזור למלאי."
        );
      } else {
        setSuccessMessage("הייתה בעיה בעיבוד הבקשה שלך. נסה שוב מאוחר יותר.");
      }
    } catch (error) {
      console.error("Error submitting notification request:", error);
      setSuccessMessage("הייתה בעיה בעיבוד הבקשה שלך. נסה שוב מאוחר יותר.");
    }
  };
  return (
    <>
      <div className="container">
        <div className="additional-images">
          <div className="arrow-up" onClick={handlePrev}>
            <FontAwesomeIcon icon={faArrowUp} />
          </div>
          {product.additionalImages
            .slice(startIndex, startIndex + 4)
            .map((image, index) => (
              <div key={index} className="additional-image-wrapper">
                {!additionalImagesLoaded[startIndex + index] && (
                  <Skeleton variant="rectangular" width="80px" height="75px" />
                )}
                <img
                  src={image}
                  alt=""
                  className="additional-image"
                  onClick={() => handleClick(image)}
                  onLoad={() =>
                    setAdditionalImagesLoaded((prevState) => {
                      const newState = [...prevState];
                      newState[startIndex + index] = true;
                      return newState;
                    })
                  }
                  style={{
                    display: additionalImagesLoaded[startIndex + index]
                      ? "block"
                      : "none",
                  }}
                />
              </div>
            ))}
          <div className="arrow-down" onClick={handleNext}>
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
        </div>
        <div className="main-image">
          {!mainImageLoaded && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="450px"
              animation="wave"
            />
          )}
          <img
            src={currentImage}
            alt="Main Product"
            onLoad={() => setMainImageLoaded(true)}
            style={{ display: mainImageLoaded ? "block" : "none" }}
            className="drawer-main-image"
          />
          <div className="product-info">
            <h3 style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}>
              תיאור:
            </h3>
            <p style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}>
              {product.description}
            </p>
            <SizeTable />
          </div>
        </div>
        <div className="productpage-details">
          <p className="brand-name">{product.brand}</p>
          <h2>{product.name}</h2>
          <p className="units-sold">
            Sold <span>10+</span>
          </p>
          {product.discount ? (
            <div className="price-section">
              <p className="product-price original-price">{product.price}₪</p>
              <p className="product-price discount-price">
                {product.discount_price}₪
              </p>
            </div>
          ) : (
            <p className="price">{product.price}₪</p>
          )}
          <div className="size-section">
            <p>SIZE</p>
            <SelectVariants options={sizeOptions} />
          </div>
          <hr className="divider" />
          <div className="color-section">
            <p>COLOR</p>
            <SelectVariants options={colorOptions} />
          </div>
          <hr className="divider" />
          <div className="quantity-section">
            <p>QUANTITY</p>
            <div className="quantity-input-container">
              <button onClick={handleDecreaseQuantity}>-</button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button onClick={handleIncreaseQuantity}>+</button>
            </div>
          </div>
          <div className="button-group">
            <Button
              variant="contained"
              className="buy-now-button"
              disabled={product.quantity === 0}
              onClick={handleBuyNow}
              style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}
            >
              תקנה עכשיו
            </Button>
            <Button
              variant="contained"
              className="add-to-cart-button"
              disabled={product.quantity === 0}
              onClick={handleAddToCart}
              style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}
            >
              הוסף לסל
            </Button>
          </div>
          {product.quantity === 0 && (
            <p className="sold-out-message">המוצר אזל מהמלאי</p>
          )}
          {showAddedMessage && (
            <div className="added-message">המוצר נוסף לסל הקניות!</div>
          )}
        </div>
      </div>
      {/* Mobile screen version */}
      <div className="container mobile-screen">
        <div className="main-image">
          {!mainImageLoaded && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="450px"
              animation="wave"
            />
          )}
          <Slider {...settings}>
            {product.additionalImages.map((image, index) => (
              <div key={index}>
                {!additionalImagesLoaded[index] && (
                  <Skeleton variant="rectangular" width="100%" height="450px" />
                )}
                <img
                  src={image}
                  alt=""
                  onClick={() => handleClick(image)}
                  onLoad={() =>
                    setAdditionalImagesLoaded((prevState) => {
                      const newState = [...prevState];
                      newState[index] = true;
                      return newState;
                    })
                  }
                  style={{
                    display: additionalImagesLoaded[index] ? "block" : "none",
                    width: "100%",
                    height: "550px",
                  }}
                />
              </div>
            ))}
          </Slider>
          <h2 className="product-info">{product.name}</h2>
          <h2 className="product-size-overview">{product.size}</h2>
          {product.discount ? (
            <div className="price-section">
              <p className="product-price original-price">{product.price}₪</p>
              <p className="product-price discount-price">
                {product.discount_price}₪
              </p>
            </div>
          ) : (
            <h2 className="product-price-overview">{product.price}₪</h2>
          )}
        </div>
        <div className="button-group">
          <Button
            variant="contained"
            className="buy-now-button"
            disabled={product.quantity === 0}
            onClick={handleBuyNow}
            style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}
          >
            קנה עכשיו
          </Button>
          <Button
            variant="contained"
            className="add-to-cart-button"
            disabled={product.quantity === 0}
            onClick={handleAddToCart}
            style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}
          >
            הוסף לסל
          </Button>
        </div>
        {product.quantity === 0 && (
          <>
            <p className="sold-out-message">המוצר אזל מהמלאי</p>
            <button
              onClick={handleNotifyMeClick}
              className="notify-me-button"
              style={{
                fontFamily: "Noto Sans Hebrew",
                direction: "rtl",
                marginTop: "10px",
              }}
            >
              עדכן אותי כאשר המוצר יחזור למלאי
              <FontAwesomeIcon
                icon={showNotifyForm ? faArrowUp : faArrowDown}
                style={{ marginRight: "10px" }}
              />
            </button>
            {showNotifyForm && (
              <form onSubmit={handleNotifyMeSubmit} className="notify-form">
                <input
                  type="text"
                  name="fullName"
                  placeholder="שם מלא"
                  required
                  style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}
                />
                <div
                  className="notification-preference"
                  style={{
                    fontFamily: "Noto Sans Hebrew",
                    direction: "rtl",
                    marginTop: "10px",
                  }}
                >
                  <p>קבל התראה באמצעות:</p>
                  <label>
                    <input
                      type="radio"
                      name="notificationMethod"
                      value="email"
                      onChange={() => setNotificationMethod("email")}
                      required
                      style={{
                        marginRight: "10px",
                      }}
                    />
                    מייל
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="notificationMethod"
                      value="whatsapp"
                      onChange={() => setNotificationMethod("whatsapp")}
                      checked={notificationMethod === "whatsapp"}
                      required
                      style={{
                        marginRight: "10px",
                      }}
                    />
                    וואטספ
                  </label>
                </div>
                {notificationMethod === "email" && (
                  <input
                    type="email"
                    name="email"
                    placeholder="כתובת אימייל"
                    required
                    style={{
                      fontFamily: "Noto Sans Hebrew",
                      direction: "rtl",
                      marginTop: "10px",
                    }}
                  />
                )}
                {notificationMethod === "whatsapp" && (
                  <input
                    type="tel"
                    name="phone"
                    placeholder="מספר טלפון"
                    required
                    style={{
                      fontFamily: "Noto Sans Hebrew",
                      direction: "rtl",
                      marginTop: "10px",
                    }}
                    pattern="[0-9]*"
                    inputMode="numeric"
                  />
                )}
                <Button
                  variant="contained"
                  type="submit"
                  style={{
                    backgroundColor: "transparent", // Transparent background
                    color: "black", // Black text color
                    padding: "10px 20px",
                    cursor: "pointer",
                    fontSize: "14px",
                    width: "100%",
                    textAlign: "center",
                    display: "block",
                    border: "1px solid black",
                    fontFamily: "Noto Sans Hebrew",
                    direction: "rtl",
                    marginTop: "10px",
                  }}
                >
                  שלח
                </Button>
              </form>
            )}
            {successMessage && (
              <p
                style={{
                  color: "green",
                  fontFamily: "Noto Sans Hebrew",
                  direction: "rtl",
                  marginTop: "10px",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {successMessage}
              </p>
            )}
          </>
        )}
        <div className="product-info">
          <h3 style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}>
            תיאור:
          </h3>
          <p style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}>
            {product.description}
          </p>
          <SizeTable />
        </div>
        {showAddedMessage && (
          <div className="added-message">המוצר נוסף לסל הקניות !</div>
        )}
      </div>
    </>
  );
};

export default ProductOverview;
