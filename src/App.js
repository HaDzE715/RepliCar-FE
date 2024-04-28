import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Components/navbar";
import Home from "./Pages/home";
import BrandPage from "./Pages/Brandpage";
import ProductDetailPage from "./Pages/ProductDetailPage";

import PorscheLogo from "./Pictures/PorscheLogo.png";
import FerrariLogo from "./Pictures/FerrariLogo.png";
import AMGLogo from "./Pictures/AMGLogo.png";
import RedP from "./Pictures/Porsche/Red.png";
import BlackP from "./Pictures/Porsche/Black.png";
import OrangeP from "./Pictures/Porsche/Orange.png";
import BMW from "./Pictures/Porsche/BMW.png";
import Mustang from "./Pictures/Porsche/Mustang.png";
import Redl from "./Pictures/Ferrari/Redl.png";
import Red from "./Pictures/Ferrari/Red.png";
import BlackF from "./Pictures/Ferrari/Black.png";

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
      "Alloy Sports Car Model Diecasts Metal Toy Vehicles Car Model Simulation Childrens Giftsasdasds sadasd asd asd asd sad asd as da sd",
    image: OrangeP,
    additionalImages: [BlackP, RedP, OrangeP], // Initialized with additional images
    colors: ["Black", "Red", "Orange"],
  },
  {
    id: 1,
    name: "Porsche 911 Carrera Alloy",
    brand: "Porsche",
    size: "Scale 1:24",
    price: 399,
    description:
      "Alloy Sports Car Model Diecasts Metal Toy Vehicles Car Model Simulation Childrens Giftsasdasds sadasd asd asd asd sad asd as da sd",
    image: Mustang,
    additionalImages: [BlackP, RedP, OrangeP], // Initialized with additional images
    colors: ["Black", "Red", "Orange"],
  },
  {
    id: 1,
    name: "Porsche 911 Carrera Alloy",
    brand: "Porsche",
    size: "Scale 1:24",
    price: 399,
    description:
      "Alloy Sports Car Model Diecasts Metal Toy Vehicles Car Model Simulation Childrens Giftsasdasds sadasd asd asd asd sad asd as da sd",
    image: Redl,
    additionalImages: [BlackP, RedP, OrangeP], // Initialized with additional images
    colors: ["Black", "Red", "Orange"],
  },
  {
    id: 1,
    name: "Porsche 911 Carrera Alloy",
    brand: "Porsche",
    size: "Scale 1:24",
    price: 399,
    description:
      "Alloy Sports Car Model Diecasts Metal Toy Vehicles Car Model Simulation Childrens Giftsasdasds sadasd asd asd asd sad asd as da sd",
    image: BlackF,
    additionalImages: [BlackP, RedP, OrangeP], // Initialized with additional images
    colors: ["Black", "Red", "Orange"],
  },
  {
    id: 1,
    name: "Porsche 911 Carrera Alloy",
    brand: "Porsche",
    size: "Scale 1:24",
    price: 399,
    description:
      "Alloy Sports Car Model Diecasts Metal Toy Vehicles Car Model Simulation Childrens Giftsasdasds sadasd asd asd asd sad asd as da sd",
    image: OrangeP,
    additionalImages: [BlackP, RedP, OrangeP], // Initialized with additional images
    colors: ["Black", "Red", "Orange"],
  },
  {
    id: 1,
    name: "Porsche 911 Carrera Alloy",
    brand: "Porsche",
    size: "Scale 1:24",
    price: 399,
    description:
      "Alloy Sports Car Model Diecasts Metal Toy Vehicles Car Model Simulation Childrens Giftsasdasds sadasd asd asd asd sad asd as da sd",
    image: Mustang,
    additionalImages: [BlackP, RedP, OrangeP], // Initialized with additional images
    colors: ["Black", "Red", "Orange"],
  },
  {
    id: 1,
    name: "Porsche 911 Carrera Alloy",
    brand: "Porsche",
    size: "Scale 1:24",
    price: 399,
    description:
      "Alloy Sports Car Model Diecasts Metal Toy Vehicles Car Model Simulation Childrens Giftsasdasds sadasd asd asd asd sad asd as da sd",
    image: BlackP,
    additionalImages: [BlackP, RedP, OrangeP], // Initialized with additional images
    colors: ["Black", "Red", "Orange"],
  },
  {
    id: 1,
    name: "Porsche 911 Carrera Alloy",
    brand: "Porsche",
    size: "Scale 1:24",
    price: 399,
    description:
      "Alloy Sports Car Model Diecasts Metal Toy Vehicles Car Model Simulation Childrens Giftsasdasds sadasd asd asd asd sad asd as da sd",
    image: RedP,
    additionalImages: [BlackP, RedP, OrangeP], // Initialized with additional images
    colors: ["Black", "Red", "Orange"],
  },
  {
    id: 1,
    name: "Porsche 911 Carrera Alloy",
    brand: "Porsche",
    size: "Scale 1:24",
    price: 399,
    description:
      "Alloy Sports Car Model Diecasts Metal Toy Vehicles Car Model Simulation Childrens Giftsasdasds sadasd asd asd asd sad asd as da sd",
    image: OrangeP,
    additionalImages: [BlackP, RedP, OrangeP], // Initialized with additional images
    colors: ["Black", "Red", "Orange"],
  },
  {
    id: 1,
    name: "Porsche 911 Carrera Alloy",
    brand: "Porsche",
    size: "Scale 1:24",
    price: 399,
    description:
      "Alloy Sports Car Model Diecasts Metal Toy Vehicles Car Model Simulation Childrens Giftsasdasds sadasd asd asd asd sad asd as da sd",
    image: BMW,
    additionalImages: [BlackP, RedP, OrangeP], // Initialized with additional images
    colors: ["Black", "Red", "Orange"],
  },
  {
    id: 1,
    name: "Porsche 911 Carrera Alloy",
    brand: "Porsche",
    size: "Scale 1:24",
    price: 399,
    description:
      "Alloy Sports Car Model Diecasts Metal Toy Vehicles Car Model Simulation Childrens Giftsasdasds sadasd asd asd asd sad asd as da sd",
    image: BMW,
    additionalImages: [BlackP, RedP, OrangeP], // Initialized with additional images
    colors: ["Black", "Red", "Orange"],
  },
  {
    id: 2,
    name: "Product 2",
    brand: "Ferrari",
    price: 1500,
    description: "Description of Product 2",
    image: BlackF,
    additionalImages: ["product2_1.jpg", "product2_2.jpg"], // Initialized with additional images
    colors: [],
  },
  {
    id: 2,
    name: "Product 2",
    brand: "Ferrari",
    price: 1500,
    description: "Description of Product 2",
    image: Red,
    additionalImages: ["product2_1.jpg", "product2_2.jpg"], // Initialized with additional images
    colors: [],
  },
  {
    id: 2,
    name: "Product 2",
    brand: "Ferrari",
    size: "Scale 1:24",
    price: 349.99,
    description: "Description of Product 2",
    image: Redl,
    additionalImages: ["product2_1.jpg", "product2_2.jpg"], // Initialized with additional images
    colors: [],
  },
  {
    id: 2,
    name: "Ferrari Portofino",
    brand: "Ferrari",
    size: "Scale 1:24",
    price: 299.99,
    description: "Description of Product 2",
    image: Mustang,
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
          <Route path="/" element={<Home logosData={logosData} />} />
          <Route path="/home" element={<Home logosData={logosData} />} />
          <Route
            path="/product/:id"
            element={<ProductDetailPage productsData={productsData} />}
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
