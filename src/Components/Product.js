import React from "react";
import "../Style/Product.css";

const Product = ({ name, size, price, image }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
      </div>
      <div className="product-details">
        <h2 className="product-name">{name}</h2>
        <p className="product-size">{size}</p>
        <p className="product-price">{price}₪</p>
      </div>
    </div>
  );
};

export default Product;
