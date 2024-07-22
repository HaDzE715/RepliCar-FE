import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Banner from "../Components/Banner";
import ProductsPage from "./Productspage"; // Import the ProductsPage component

function BrandPage({ productsData }) {
  const { brandname } = useParams();
  const [brandDetails, setBrandDetails] = useState(null);
  const [brandProducts, setBrandProducts] = useState([]);

  useEffect(() => {
    // Fetch brand details from the backend
    const fetchBrandDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/brands?name=${brandname}`
        );
        const brandData = response.data[0]; // Assuming the API returns an array with one element
        setBrandDetails(brandData);

        // Filter products for the brand
        const filteredProducts = productsData.filter(
          (product) =>
            product.brand.toLowerCase() === brandData.name.toLowerCase()
        );
        setBrandProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching brand details:", error);
      }
    };

    fetchBrandDetails();
  }, [brandname, productsData]);

  if (!brandDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Banner logo={brandDetails.logo} brandDetails={brandDetails} />
      <ProductsPage products={brandProducts} />
    </div>
  );
}

export default BrandPage;
