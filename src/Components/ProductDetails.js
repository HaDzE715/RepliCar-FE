import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import "../Style/ProductDetails.css";
import SizeTable from "./SizeTable";
import { Button } from "@mui/material";
import { useCart } from "../Components/CartContext"; // Assuming you have a CartContext

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const { dispatch } = useCart(); // Using the same cart context as in ProductOverview

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const updateLocalStorageCart = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddToCart = () => {
    const item = { ...product };
    dispatch({ type: "ADD_TO_CART", item });
    updateLocalStorageCart([
      ...JSON.parse(localStorage.getItem("cart") || "[]"),
      item,
    ]);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
  };

  const handleBuyNow = () => {
    const item = { ...product };
    dispatch({ type: "ADD_TO_CART", item });
    updateLocalStorageCart([
      ...JSON.parse(localStorage.getItem("cart") || "[]"),
      item,
    ]);
    setTimeout(() => {
      window.location.href = "/checkout";
    }, 100); // Slight delay to ensure state update
  };

  if (loading) {
    return (
      <div className="product-details-skeleton">
        <Skeleton variant="rectangular" width="100%" height={400} />
        <Skeleton variant="text" width="60%" height={50} />
        <Skeleton variant="text" width="100%" height={20} />
      </div>
    );
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-image-slider">
        {!mainImageLoaded && (
          <Skeleton variant="rectangular" width="100%" height={350} />
        )}
        <img
          src={product.additionalImages[currentImageIndex] || product.image}
          alt={product.name}
          onLoad={() => setMainImageLoaded(true)}
          style={{ display: mainImageLoaded ? "block" : "none" }}
          className="main-image"
        />
        <button
          className="slider-button prev-button"
          onClick={() =>
            setCurrentImageIndex((prevIndex) =>
              prevIndex === 0
                ? product.additionalImages.length - 1
                : prevIndex - 1
            )
          }
        ></button>
        <button
          className="slider-button next-button"
          onClick={() =>
            setCurrentImageIndex((prevIndex) =>
              prevIndex === product.additionalImages.length - 1
                ? 0
                : prevIndex + 1
            )
          }
        ></button>
      </div>
      <div className="product-details-info">
        <h1 className="product-details-title">{product.name}</h1>
        <p className="product-details-size">{product.size}</p>
        {product.discount ? (
          <div className="product-details-price">
            <span className="product-price original-price">
              {product.price}₪
            </span>
            <span className="product-price discount-price">
              {product.discount_price}₪
            </span>
          </div>
        ) : (
          <p className="product-details-price">{product.price}₪</p>
        )}
        {product.quantity > 0 ? (
          <div className="button-group-product-details">
            <Button
              variant="contained"
              className="buy-now-button"
              onClick={handleBuyNow}
              style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}
            >
              קנה עכשיו
            </Button>
            <Button
              variant="contained"
              className="add-to-cart-button"
              onClick={handleAddToCart}
              style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}
            >
              הוסף לסל
            </Button>
          </div>
        ) : (
          <span className="product-details-sold-out">המוצר אזל מהמלאי</span>
        )}
        <p className="product-details-description">{product.description}</p>
        <SizeTable />
      </div>
      {showAddedMessage && (
        <div className="added-message">המוצר נוסף לסל הקניות!</div>
      )}
    </div>
  );
};

export default ProductDetails;
