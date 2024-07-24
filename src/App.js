import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Components/navbar";
import Brands from "./Pages/Brands";
import BrandPage from "./Pages/Brandpage";
import ProductDetails from "./Components/ProductDetails";
import HomePage from "./Pages/HomePage";

import PorscheLogo from "./Pictures/PorscheLogo.png";
import FerrariLogo from "./Pictures/FerrariLogo.png";
import AMGLogo from "./Pictures/AMGLogo.png";

const logosData = {
  slides: [
    {
      src: PorscheLogo,
      alt: "Porsche",
    },
    {
      src: FerrariLogo,
      alt: "Ferrari",
    },
    {
      src: AMGLogo,
      alt: "Mercedes",
    },
  ],
};
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/brands" element={<Brands logosData={logosData} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/brand/:brandname" element={<BrandPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
