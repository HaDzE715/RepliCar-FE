import React from "react";
import Product from "../Components/Product";
import "../Style/Productspage.css";
import { Link } from "react-router-dom";

function ProductsPage({ productsData }) {
  return (
    <div className="products-page">
      <h1 className="page-title">מוצרים</h1>
      <hr className="divider-top" />
      <div className="products-container">
        {productsData.map((product, index) => (
          <div className="product-item-container">
            <Link
              to={`/product/${product.id}`}
              key={index}
              className="product-item-container"
            >
              <Product
                name={product.name}
                price={product.price}
                description={product.description}
                image={product.image}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
