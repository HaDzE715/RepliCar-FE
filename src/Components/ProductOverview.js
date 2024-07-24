import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "../Style/ProductOverview.css";
import SelectVariants from "./SelectVariants";
import { Button } from "@mui/material";
import SizeTable from "./SizeTable";

const ProductOverview = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.image);
  const [startIndex, setStartIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleClick = (image) => {
    setCurrentImage(image);
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
              <img
                key={index}
                src={image}
                alt=""
                className={index === 0 ? "show" : "hide"}
                id={`image-${startIndex + index}`}
                onClick={() => handleClick(image)}
              />
            ))}
          <div className="arrow-down" onClick={handleNext}>
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
        </div>
        <div className="main-image">
          <img src={currentImage} alt="Main Product" />
          <div className="product-info">
            <h3>Description:</h3>
            <p>{product.description}</p>
            <SizeTable />
          </div>
        </div>
        <div className="productpage-details">
          <p className="brand-name">{product.brand}</p>
          <h2>{product.name}</h2>
          <p className="units-sold">
            Sold <span>10+</span>
          </p>
          <p className="price">{product.price}₪</p>
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
            <div className="button-group">
              <Button variant="contained" className="buy-now-button">
                תקנה עכשיו
              </Button>
              <Button variant="contained" className="add-to-cart-button">
                הוסיף לסל
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile screen version */}
      <div className="container mobile-screen">
        <div className="main-image">
          <img src={currentImage} alt="Main Product" />
          <h2 className="product-info">{product.name}</h2>
          <h2 className="product-price">{product.size}</h2>
          <h2 className="product-price">{product.price}₪</h2>
        </div>
        <div className="additional-images">
          {product.additionalImages
            .slice(startIndex, startIndex + 4)
            .map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                onClick={() => handleClick(image)}
              />
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
          <Button variant="contained" className="buy-now-button">
            תקנה עכשיו
          </Button>
          <Button variant="contained" className="add-to-cart-button">
            הוסף לסל
          </Button>
        </div>
        <div className="product-info">
          <h3>Description:</h3>
          <p>{product.description}</p>
          <SizeTable />
        </div>
      </div>
    </>
  );
};

export default ProductOverview;
