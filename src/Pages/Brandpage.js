import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Banner from "../Components/Banner";
import ProductsPage from "./Productspage";

const BrandPage = () => {
  const { brandname } = useParams();
  const [brandDetails, setBrandDetails] = useState(null);
  const [brandProducts, setBrandProducts] = useState([]);

  useEffect(() => {
    const fetchBrandDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/brands?name=${brandname}`
        );
        const brandData = response.data[0];
        setBrandDetails(brandData);

        const productsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products?brand=${brandname}`
        );
        setBrandProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching brand details:", error);
      }
    };

    fetchBrandDetails();
  }, [brandname]);

  if (!brandDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Banner logo={brandDetails.logo} brandDetails={brandDetails} />
      <ProductsPage products={brandProducts} />
    </div>
  );
};

export default BrandPage;
