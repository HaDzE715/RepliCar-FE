import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import "../Style/ProductDetails.css";
import SizeTable from "./SizeTable";
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import { useCart } from "../Components/CartContext";
import { useSwipeable } from "react-swipeable";
import ServiceSection from "./ServiceSection";
import SecureCheckoutSection from "./SecureCheckoutSection";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products/${id}`
        );
        const fetchedProduct = response.data;
        setProduct(response.data);

        const defaultVariant = fetchedProduct.variants?.find(
          (variant) => variant.name === "A2"
        );
        if (defaultVariant) {
          setSelectedVariant(defaultVariant);
        }

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
    if (!selectedVariant && product.variants?.length > 0) {
      alert("Please select a size before adding to cart.");
      return;
    }
    const item = { ...product, selectedVariant };
    dispatch({ type: "ADD_TO_CART", item });
    updateLocalStorageCart([
      ...JSON.parse(localStorage.getItem("cart") || "[]"),
      item,
    ]);
  };

  const handleBuyNow = () => {
    if (!selectedVariant && product.variants?.length > 0) {
      alert("Please select a size before purchasing.");
      return;
    }
    const item = { ...product, selectedVariant };
    dispatch({ type: "ADD_TO_CART", item });
    updateLocalStorageCart([
      ...JSON.parse(localStorage.getItem("cart") || "[]"),
      item,
    ]);
    setTimeout(() => {
      window.location.href = "/checkout";
    }, 100);
  };
  const handleVariantChange = (event) => {
    const selected = product.variants.find(
      (variant) => variant.name === event.target.value
    );
    setSelectedVariant(selected); // Update state with the selected variant
  };

  const handleImageChange = (direction) => {
    // Set animation direction for smooth transition
    setAnimationDirection(direction);

    // Trigger re-render for transition effect
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => {
        if (direction === "left") {
          return prevIndex === product.additionalImages.length - 1
            ? 0
            : prevIndex + 1;
        } else {
          return prevIndex === 0
            ? product.additionalImages.length - 1
            : prevIndex - 1;
        }
      });

      // Reset animation direction for seamless transitions
      setAnimationDirection("");
    }, 500); // Matches the CSS transition duration
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleImageChange("left"),
    onSwipedRight: () => handleImageChange("right"),
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

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
      <div {...swipeHandlers} className="product-details-image-slider">
        {!mainImageLoaded && (
          <Skeleton variant="rectangular" width="100%" height={350} />
        )}
        {product.additionalImages.length > 1 && (
          <>
            <button
              className="arrow-button left-arrow"
              onClick={() => handleImageChange("right")}
            >
              &#8592;
            </button>
            <button
              className="arrow-button right-arrow"
              onClick={() => handleImageChange("left")}
            >
              &#8594;
            </button>
          </>
        )}
        <img
          src={product.additionalImages[currentImageIndex] || product.image}
          alt={product.name}
          onLoad={() => setMainImageLoaded(true)}
          className={`main-image ${
            animationDirection === "left"
              ? "slide-left"
              : animationDirection === "right"
              ? "slide-right"
              : ""
          }`}
        />
        <div className="image-indicator">
          {product.additionalImages.map((_, index) => (
            <span
              key={index}
              className={`indicator-dot ${
                index === currentImageIndex ? "active" : ""
              }`}
            ></span>
          ))}
        </div>
      </div>
      <div className="product-details-info">
        <h1 className="product-details-title">{product.name}</h1>
        {product.category !== "Poster" && (
          <p className="product-details-size">{product.size}</p>
        )}
        {selectedVariant ? (
          <p
            className="product-details-price"
            style={{
              fontFamily: "Noto Sans Hebrew",
              direction: "rtl",
              fontSize: "18px",
              marginBottom: "20px",
            }}
          >
            {selectedVariant.price}₪
          </p>
        ) : product.discount ? (
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
        {product.variants && product.variants.length > 0 && (
          <FormControl
            fullWidth
            style={{
              marginBottom: "20px",
              textAlign: "right",
            }}
          >
            <InputLabel
              id="variant-select-label"
              style={{
                fontFamily: "Noto Sans Hebrew",
                direction: "rtl",
                right: "10px",
                transformOrigin: "top right",
                zIndex: 1,
                backgroundColor: "white",
                padding: "0 5px",
              }}
            >
              בחר גודל
            </InputLabel>
            <Select
              labelId="variant-select-label"
              id="variant-select"
              value={selectedVariant?.name || ""} // Use the variant name as the value
              onChange={handleVariantChange}
              style={{
                fontFamily: "Noto Sans Hebrew",
                direction: "rtl",
                textAlign: "right",
              }}
            >
              {product.variants.map((variant, index) => (
                <MenuItem
                  key={index}
                  value={variant.name}
                  style={{ direction: "rtl", textAlign: "right" }}
                >
                  {variant.name} - {variant.dimensions} - {variant.price}₪
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <SecureCheckoutSection />
        <h3
          style={{
            fontFamily: "Noto Sans Hebrew",
            direction: "rtl",
            textAlign: "right",
            marginBottom: "20px",
          }}
        >
          תיאור:
        </h3>
        <div
          style={{
            fontFamily: "Noto Sans Hebrew",
            direction: "rtl",
            textAlign: "right",
            marginRight: "20px",
          }}
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
        <ServiceSection />
        {product.category === "Diecast" && <SizeTable />}
      </div>
    </div>
  );
};

export default ProductDetails;
