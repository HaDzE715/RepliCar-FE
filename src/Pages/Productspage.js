import React, { useState, useEffect } from "react";
import Product from "../Components/Product";
import "../Style/Productspage.css";

const ProductsPage = ({ products }) => {
  const [productsPerPage, setProductsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setProductsPerPage(screenWidth < 768 ? 8 : 9);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
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
      {products.length > 0 && (
        <h1 className="page-title">{products[0].brand} Diecast Models</h1>
      )}
      <div className="products-wrapper">
        <div className="products-container">
          {currentProducts.map((product) => (
            <Product
              key={product._id} // Use MongoDB's _id as the unique key
              id={product._id}
              name={product.name}
              size={product.size}
              price={product.price}
              image={product.image}
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
