import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Components/navbar";
import Brands from "./Pages/Brands";
import BrandPage from "./Pages/Brandpage";
import ProductDetails from "./Components/ProductDetails";

import PorscheLogo from "./Pictures/PorscheLogo.png";
import FerrariLogo from "./Pictures/FerrariLogo.png";
import AMGLogo from "./Pictures/AMGLogo.png";
import RedP from "./Pictures/Porsche/Red.png";
import BlackP from "./Pictures/Porsche/Black.png";
import OrangeP from "./Pictures/Porsche/Orange.png";
import Redl from "./Pictures/Ferrari/Redl.png";

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
const productsData = [
  {
    id: 1,
    name: "Porsche 911 Carrera Alloy",
    brand: "Porsche",
    size: "Scale 1:24",
    price: 399,
    description:
      "Alloy Sports Car Model Diecasts Metal Toy Vehicles Car Model Simulation Childrens Gift",
    image: OrangeP,
    additionalImages: [BlackP, RedP, OrangeP, Redl, AMGLogo, BlackP, FerrariLogo], // Initialized with additional images
    colors: ["Black", "Red", "Orange"],
  },
  {
    id: 1,
    name: "Porsche 911 Carrera Alloy",
    brand: "Porsche",
    size: "Scale 1:24",
    price: 399,
    description:
      "Alloy Sports Car Model Diecasts Metal Toy Vehicles Car Model Simulation Childrens Gift",
    image: OrangeP,
    additionalImages: [BlackP, RedP, OrangeP, Redl, AMGLogo, BlackP, FerrariLogo], // Initialized with additional images
    colors: ["Black", "Red", "Orange"],
  },
  {
    id: 2,
    name: "Product 2",
    brand: "Ferrari",
    price: 1500,
    description: "Description of Product 2",
    image: Redl,
    additionalImages: ["product2_1.jpg", "product2_2.jpg"], // Initialized with additional images
    colors: [],
  },
  {
    id: 3,
    name: "Product 3",
    brand: "Mercedes",
    price: 1200,
    description: "Description of Product 3",
    image: AMGLogo,
    additionalImages: ["product2_1.jpg", "product2_2.jpg"], // Initialized with additional images
    colors: [],
  },
  // Add more products as needed
];

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Brands logosData={logosData} />} /> */}
          <Route path="/Brands" element={<Brands logosData={logosData} />} />
          <Route
            path="/product/:id"
            element={<ProductDetails productsData={productsData} />}
          />
          <Route
            path="/:brandname"
            element={<BrandPage productsData={productsData} />}
          />{" "}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
