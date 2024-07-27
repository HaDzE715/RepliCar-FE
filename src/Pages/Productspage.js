import React, { useState, useEffect } from "react";
import Product from "../Components/Product";
import Skeleton from "@mui/material/Skeleton";
import "../Style/Productspage.css";

const ProductsPage = ({ products, openDrawer }) => {
  const [productsPerPage, setProductsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setProductsPerPage(screenWidth < 768 ? 8 : 9);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Simulate a network request
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, products.length);
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="products-page">
      {products.length > 0 && !loading && (
        <h1 className="page-title">{products[0].brand} Diecast Models</h1>
      )}
      <div className="products-wrapper">
        <div className="products-container">
          {loading
            ? Array.from(new Array(productsPerPage)).map((_, index) => (
                <div key={index} className="product-card">
                  <Skeleton variant="rectangular" width="100%" height={255} />
                  <div className="product-details">
                    <Skeleton width="80%" height={20} />
                    <Skeleton width="60%" height={20} />
                    <Skeleton width="40%" height={20} />
                  </div>
                </div>
              ))
            : currentProducts.map((product) => (
                <Product
                  key={product._id} // Use MongoDB's _id as the unique key
                  id={product._id}
                  name={product.name}
                  size={product.size}
                  price={product.price}
                  discount={product.discount} // Pass discount prop
                  discount_price={product.discount_price}
                  image={product.image}
                  quantity={product.quantity}
                  openDrawer={openDrawer} // Pass openDrawer function
                />
              ))}
        </div>
      </div>
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <span className="page-numbers">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page-number ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </span>
        <button
          className="pagination-btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
