import React from "react";
import Product from "../Components/Product";
import AMG from "../Pictures/AMG.jpg";
import Porsche from "../Pictures/Porsche/Black.png";
import Ferrari from "../Pictures/Ferrari.jpg";
import "../Style/Productspage.css";

const ProductsPage = () => {
  // Dummy product data
  const products = [
    {
      name: "Mercedes AMG Green Demon",
      size: "Scale 1/24",
      price: 199.99,
      image: AMG,
    },
    {
      name: "Porsche Carrera 911",
      size: "Scale 1/24",
      price: 199.99,
      image: Porsche,
    },
    {
      name: "Ferrari Portofino",
      size: "Scale 1/24",
      price: 199.99,
      image: Ferrari,
    },
    {
      name: "Ferrari Portofino",
      size: "Scale 1/24",
      price: 199.99,
      image: Ferrari,
    },
    {
      name: "Ferrari Portofino",
      size: "Scale 1/24",
      price: 199.99,
      image: Ferrari,
    },
    {
      name: "Ferrari Portofino",
      size: "Scale 1/24",
      price: 199.99,
      image: Ferrari,
    },
    {
      name: "Ferrari Portofino",
      size: "Scale 1/24",
      price: 199.99,
      image: Ferrari,
    },
    {
      name: "Ferrari Portofino",
      size: "Scale 1/24",
      price: 199.99,
      image: Ferrari,
    },
    {
      name: "Ferrari Portofino",
      size: "Scale 1/24",
      price: 199.99,
      image: Ferrari,
    },
    // Add more product objects as needed
  ];

  return (
    <div className="products-page">
      <h1 className="page-title">Porsche Cars</h1>
      <div className="products-wrapper">
        <div className="products-container">
          {products.map((product, index) => (
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
    </div>
  );
};

export default ProductsPage;
