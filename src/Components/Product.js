import React from "react";
import "../Style/Product.css";
import { Button } from "@mui/material";

function Product({ name, price, description, image }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <div className="product-details">
        <h2 className="product-name">{name}</h2>
        <p className="product-price">מחיר: ₪{price}</p>
        <p className="product-description">{description}</p>
      </div>
      <div className="button-container">
        <Button variant="contained" color="primary">
          קנה עכשיו
        </Button>
      </div>
    </div>
  );
}

export default Product;
