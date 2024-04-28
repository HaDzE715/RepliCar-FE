import React from "react";
import { useParams } from "react-router-dom";
import PorscheLogo from "../Pictures/PorscheLogo.png";
import FerrariLogo from "../Pictures/FerrariLogo.png";
import MercedesLogo from "../Pictures/AMGLogo.png";
import Banner from "../Components/Banner";
import ProductsPage from "./Productspage"; // Import the ProductsPage component

function BrandPage({ productsData }) {
  // Pass productsData as a prop
  const { brandname } = useParams();

  let logo;
  let brandDetails; // Declare brandDetails outside the switch statement
  let brandProducts = []; // Declare an empty array to hold brand-specific products

  switch (brandname.toLowerCase()) {
    case "porsche":
      logo = PorscheLogo;
      brandDetails = {
        BrandName: "Porsche",
        BrandFounder: "Ferdinand Porsche",
        BrandCity: "Stuttgart",
        BrandCountry: "Germany",
        BrandMonth: "April",
        BrandDay: 25,
        BrandYear: 1931,
      };
      // Filter products for Porsche brand
      brandProducts = productsData.filter(
        (product) => product.brand === "Porsche"
      );
      break;
    case "ferrari":
      logo = FerrariLogo;
      brandDetails = {
        BrandName: "Ferrari",
        BrandFounder: "Enzo Ferrari",
        BrandCity: "Maranello",
        BrandCountry: "Italy",
        BrandMonth: "August",
        BrandDay: 12,
        BrandYear: 1929,
      };
      // Filter products for Ferrari brand
      brandProducts = productsData.filter(
        (product) => product.brand === "Ferrari"
      );
      break;
    case "mercedes":
      logo = MercedesLogo;
      brandDetails = {
        BrandName: "Mercedes",
        BrandFounder: "Karl Benz",
        BrandCity: "Stuttgart",
        BrandCountry: "Germany",
        BrandMonth: "June",
        BrandDay: 28,
        BrandYear: 1926,
      };
      // Filter products for Mercedes brand
      brandProducts = productsData.filter(
        (product) => product.brand === "Mercedes"
      );
      break;
    default:
      logo = null; // Handle the case when brand name is not recognized
  }

  return (
    <div>
      {logo && <Banner logo={logo} brandDetails={brandDetails} />}
      {brandProducts.length > 0 && <ProductsPage products={brandProducts} />}
    </div>
  );
}

export default BrandPage;
