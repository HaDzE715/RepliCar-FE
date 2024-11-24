import { useNavigate } from "react-router-dom";
import bf from "../Pictures/bf.jpeg";
import "../Style/HeroSection2.css";

const ResponsiveBanner = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleClick = () => {
    navigate("/discounts"); // Navigate to /discounts
  };

  return (
    <div className="responsive-banner" onClick={handleClick}>
      <img
        src={bf}
        alt="Responsive Banner"
        className="responsive-banner-image"
        style={{ cursor: "pointer" }} // Indicate it's clickable
      />
    </div>
  );
};

export default ResponsiveBanner;
