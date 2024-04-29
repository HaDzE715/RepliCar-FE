import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
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

  return (
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
      <div className="product-details">
        <p className="brand-name">{product.brand}</p>
        <h2>{product.name}</h2>
        <p className="units-sold">
          Sold <span>10+</span>
        </p>
        <p className="price">{product.price}.99₪</p>
        <div className="size-section">
          <p>SIZE</p>
          <SelectVariants
            options={[
              { value: 1, label: "Scale 1:18" },
              { value: 2, label: "Scale 1:24" },
              { value: 3, label: "Scale 1:32" },
              { value: 4, label: "Scale 1:64" },
            ]}
          />
        </div>
        <hr className="divider" />
        <div className="color-section">
          <p>COLOR</p>
          <SelectVariants
            options={[
              { value: "red", label: "Red" },
              { value: "blue", label: "Blue" },
              { value: "green", label: "Green" },
            ]}
          />
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
              תוסיף לסל
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
