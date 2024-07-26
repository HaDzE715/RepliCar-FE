import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import "../Style/ProductDetails.css"; // Import CSS for ProductDetailPage
import ProductOverview from "./ProductOverview.js";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when id changes
  }, [id]);

  if (loading || !product) {
    return (
      <div className="product-detail-page">
        <div className="product-details-column">
          <div style={{ marginTop: "20px" }}>
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="text" width="40%" height={40} />
          </div>
          <div style={{ marginTop: "20px" }}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height="80px"
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height="80px"
              animation="wave"
              style={{ marginTop: "10px" }}
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height="80px"
              animation="wave"
              style={{ marginTop: "10px" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-details-column">
        <ProductOverview product={product} />
      </div>
      {/* <div className="order-details-column">
        <OrderDetails />
      </div> */}
    </div>
  );
}

export default ProductDetailPage;
