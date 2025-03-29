import React, { useState, useEffect } from "react";
import Product from "../Components/Product";
import Skeleton from "@mui/material/Skeleton";
import "../Style/Productspage.css";
import ReactGA from "react-ga";
import SEO from "../Components/SEO";

const ProductsPage = ({ products, openDrawer }) => {
  const [productsPerPage, setProductsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  });
  
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
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 3;
    let startPage, endPage;

    if (totalPages <= maxPageNumbersToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(maxPageNumbersToShow / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPageNumbersToShow / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPageNumbersToShow;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPageNumbersToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page-number ${currentPage === i ? "active" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="products-page">
      {products.length > 0 && !loading && (
        <SEO
        title={`${products[0].brand} Diecast Models | Replicar - רפליקאר`}
        description={`מבחר דגמי ${products[0].brand} איכותיים בקנה מידה מדויק. קולקציית רכבי דייקאסט ממותג ${products[0].brand} בחנות רפליקאר`}
        url={`https://replicar.co.il/brand/${products[0].brand.toLowerCase()}`}
      />
      )}
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
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  size={product.size}
                  price={product.price}
                  discount={product.discount}
                  discount_price={product.discount_price}
                  image={product.image}
                  quantity={product.quantity}
                  openDrawer={openDrawer}
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
        <span className="page-numbers">{renderPageNumbers()}</span>
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
