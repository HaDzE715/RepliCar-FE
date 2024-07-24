import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Style/ProductDetails.css"; // Import CSS for ProductDetailPage
import ProductOverview from "./ProductOverview.js";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
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
