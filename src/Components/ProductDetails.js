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
  Typography,
  Box,
  Input,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
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
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
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
  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files); // Get selected files
    const existingUrls =
      JSON.parse(localStorage.getItem("uploadedImages")) || []; // Existing URLs

    if (existingUrls.length + files.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }

    const uploadedUrls = [...existingUrls]; // Start with existing URLs
    setIsUploading(true); // Show loading screen

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file); // Attach the file to the form data

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/images/upload`, // Your backend API endpoint
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        uploadedUrls.push({
          name: file.name,
          url: response.data.url, // URL returned by the server
          review: "", // Placeholder for a review field, if needed
        });
      } catch (error) {
        console.error("Error uploading file:", file.name, error);
      }
    }

    // Save the updated URLs to localStorage
    localStorage.setItem("uploadedImages", JSON.stringify(uploadedUrls));
    setUploadedImages(uploadedUrls); // Update component state
    setIsUploading(false); // Hide loading screen
  };

  useEffect(() => {
    // Load images from local storage on component mount
    const storedImages = JSON.parse(
      localStorage.getItem("uploadedImages") || "[]"
    );
    setUploadedImages(storedImages);
  }, []);

  const handleRemoveImage = (index) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
    setUploadedImages(updatedImages);
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
            <Typography
              variant="h6"
              component="p"
              sx={{
                fontFamily: "Noto Sans Hebrew",
                direction: "rtl",
                textAlign: "right",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              {product.name === "מסגרת בעיצוב אישי" ? (
                <>1️⃣ - בחר את גודל המסגרת שמתאים לעיצוב שלך 🖼️!</>
              ) : (
                "בחר גודל מסגרת"
              )}
            </Typography>

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
        {product.name === "מסגרת בעיצוב אישי" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              marginTop: 4,
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              component="p"
              sx={{
                fontFamily: "Noto Sans Hebrew",
                direction: "rtl",
                textAlign: "right",
                marginBottom: 2,
              }}
            >
              2️⃣ - העלה תמונות של הרכב 🚗 שברצונך שנעצב עבורך 🎨!
            </Typography>
            {isUploading ? (
              <DotLottieReact
                src="https://lottie.host/a5471370-65b1-4b54-af0f-9eb4ab6aa194/3lhsjtKCyk.lottie"
                loop
                autoplay
                style={{ width: "300px", height: "300px", margin: "auto" }}
              />
            ) : (
              <>
                <Button
                  variant="contained"
                  component="label"
                  color="primary"
                  sx={{
                    fontFamily: "Noto Sans Hebrew",
                    direction: "rtl",
                    textAlign: "center",
                    padding: "10px 20px",
                  }}
                >
                  בחר קבצים להעלאה
                  <Input
                    type="file"
                    inputProps={{ accept: "image/*", multiple: true }}
                    onChange={handleFileChange}
                    sx={{ display: "none" }}
                  />
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: "center",
                    marginTop: 2,
                  }}
                >
                  {uploadedImages.map((image, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        width: 100,
                        height: 100,
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={image.url} // Use Base64 string for the image source
                        alt={image.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #ddd",
                        }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 5,
                          background: "white",
                          color: "red",
                        }}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </>
            )}
            <Typography
              variant="h6"
              component="p"
              sx={{
                fontFamily: "Noto Sans Hebrew",
                direction: "rtl",
                textAlign: "right",
                marginBottom: 3,
              }}
            >
              3️⃣ - לאחר לחיצה על{" "}
              <span style={{ color: "green", fontWeight: "bold" }}>
                קנה עכשיו
              </span>{" "}
              🛒, תמלאו את פרטיכם ותמשיכו לתשלום. <br />
              תוך 48-24 שעות ניצור אתכם קשר
              <br />
              בוואטסאפ 📱/מייל✉️ כדי לאשר את העיצוב. כמובן, תוכלו לשנות כל דבר
              בעיצוב לפני שליחת המוצר 🚚.
            </Typography>
          </Box>
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
