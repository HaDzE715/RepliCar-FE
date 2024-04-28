import React, { useState, useEffect } from "react";
import Product from "../Components/Product";
import "../Style/Productspage.css";

const ProductsPage = ({ products }) => {
  const [productsPerPage, setProductsPerPage] = useState(9); // Initial number of products per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Calculate index range for current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, products.length);

  // Get products for current page
  const currentProducts = products.slice(startIndex, endIndex);
  useEffect(() => {
    // Dynamically determine number of products per page based on screen size
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        // For screens smaller than 768px, set 8 products per page
        setProductsPerPage(8);
      } else {
        // For larger screens, set 9 products per page
        setProductsPerPage(9);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize once to set initial products per page
    handleResize();

    // Remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="products-page">
      <h1 className="page-title">{products[0].brand} Diecast Models</h1>
      <div className="products-wrapper">
        <div className="products-container">
          {currentProducts.map((product, index) => (
            <Product
              key={index}
              name={product.name}
              size={product.size}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
      {/* Pagination controls */}
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
