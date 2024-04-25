import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../Style/ProductDetails.css"; // Import CSS for ProductDetailPage

function ProductDetailPage({ productsData }) {
  const { id } = useParams();
  const product = productsData.find((product) => product.id === parseInt(id));

  const [selectedColor, setSelectedColor] = useState(product.colors[0]); // Set the first color as the initial selected color

  const handleColorSelect = (color) => {
    setSelectedColor(color === selectedColor ? null : color);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const displayImage = selectedColor
    ? product.additionalImages.find((image) => image.toLowerCase().includes(selectedColor.toLowerCase()))
    : product.additionalImages[0]; // Display the first image in the array if no color is selected

  return (
    <div className="product-detail-page-wrapper">
      <div className="product-detail-page-container">
        <div className="product-detail-container">
          <div className="product-detail-image-container">
            <img src={displayImage} alt={product.name} className="product-detail-image" />
          </div>
          <div className="product-detail-info">
            <h2 className="product-detail-name">{product.name}</h2>
            <p className="product-detail-price">{product.price}</p>
            <div className="product-detail-colors">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className={`color-rectangle ${color === selectedColor ? "selected" : ""}`}
                  onClick={() => handleColorSelect(color)}
                >
                  <span className={`color-name ${color === selectedColor ? "selected" : ""}`}>
                    {color}
                  </span>
                </div>
              ))}
            </div>
            <p className="product-detail-description">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;