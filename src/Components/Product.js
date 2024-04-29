import React from "react";
import { Link } from "react-router-dom";
import "../Style/Product.css";

const Product = ({ id, name, size, price, image }) => {
  return (
    <Link to={`/product/${id}`} className="product-link">
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
    </Link>
  );
};

export default Product;
