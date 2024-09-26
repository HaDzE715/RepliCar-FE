import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Banner from "../Components/Banner";
import ProductsPage from "./Productspage";
import LogoButton from "../Components/LogoButton"; 
import { useDrawer } from "../Components/DrawerContext"; 

const BrandPage = () => {
  const { brandname } = useParams();
  const [brandDetails, setBrandDetails] = useState(null);
  const [brandProducts, setBrandProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logos, setLogos] = useState([]);
  const [animateFab, setAnimateFab] = useState(false); // State to control animation
  const { openDrawer } = useDrawer(); // Use openDrawer from DrawerContext

  useEffect(() => {
    const fetchBrandDetails = async () => {
      setLoading(true); // Ensure loading state is true before fetching
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

        // Fetch all logos for the modal
        const logosResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/brands`
        );
        setLogos(
          logosResponse.data.map((brand) => ({
            src: brand.logo,
            alt: brand.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching brand details:", error);
      } finally {
        setLoading(false); // Set loading state to false after fetching
        setAnimateFab(true); // Trigger the animation after loading
      }
    };

    fetchBrandDetails();
  }, [brandname]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when brandname changes
  }, [brandname]);

  return (
    <div>
      {loading ? (
        <div>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            style={{ marginBottom: "20px" }}
          />
        </div>
      ) : (
        <>
          <Banner logo={brandDetails.logo} brandDetails={brandDetails} />
          <ProductsPage products={brandProducts} openDrawer={openDrawer} />
        </>
      )}
      <LogoButton logos={logos} animate={animateFab} />{" "}
      {/* Add the LogoButton component */}
    </div>
  );
};

export default BrandPage;
