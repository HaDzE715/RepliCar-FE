import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "@mui/material/Skeleton";
import "../Style/ProductOverview.css";
import SelectVariants from "./SelectVariants";
import { Button } from "@mui/material";
import SizeTable from "./SizeTable";
import { useCart } from "../Components/CartContext";
import axios from "axios";

const ProductOverview = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [additionalImagesLoaded, setAdditionalImagesLoaded] = useState([]);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const { dispatch } = useCart();

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
          <hr className="divider" /> {/* Use HTML hr element as divider */}
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
          <img
            src={currentImage}
            alt="Main Product"
            onLoad={() => setMainImageLoaded(true)}
            style={{ display: mainImageLoaded ? "block" : "none" }}
          />
          <h2 className="product-info">{product.name}</h2>
          <h2 className="product-price">{product.size}</h2>
          {product.discount ? (
            <div className="price-section">
              <p className="product-price original-price">{product.price}₪</p>
              <p className="product-price discount-price">
                {product.discount_price}₪
              </p>
            </div>
          ) : (
            <h2 className="product-price">{product.price}₪</h2>
          )}
        </div>
        <div className="additional-images">
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
        </div>
        <div className="ButtonsLR">
          <Button onClick={handlePrev}>
            <FontAwesomeIcon icon={faArrowLeft} style={{ color: "black" }} />
          </Button>
          <Button onClick={handleNext}>
            <FontAwesomeIcon icon={faArrowRight} style={{ color: "black" }} />
          </Button>
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
