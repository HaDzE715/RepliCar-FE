import React, { useState } from "react";
import Product from "../Components/Product";
import "../Style/Productspage.css";

const ProductsPage = ({ products }) => {
  const productsPerPage = 9; // Number of products per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Calculate index range for current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, products.length);

  // Get products for current page
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="products-page">
      <h1 className="page-title">Porsche Cars</h1>
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
