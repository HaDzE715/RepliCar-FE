import React from "react";
import { useParams } from "react-router-dom";
import "../Style/ProductDetails.css"; // Import CSS for ProductDetailPage
import OrderDetails from "../Components/OrderDetails";
import ProductOverview from "./ProductOverview";

function ProductDetailPage({ productsData }) {
  const { id } = useParams();
  const product = productsData.find((product) => product.id === parseInt(id));

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
