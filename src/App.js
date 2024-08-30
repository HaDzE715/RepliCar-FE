import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/navbar";
import BrandPage from "./Pages/Brandpage";
import ProductDetails from "./Components/ProductDetails";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
import { CartProvider } from "./Components/CartContext";
import { DrawerProvider } from "./Components/DrawerContext"; // Import DrawerProvider
import TermsAndConditions from "./Pages/TermsAndConditions";
import ConditionalFooter from "./Components/ConditionalFooter";
import ContactUs from "./Pages/ContactUs"; // Import the ContactUs component
import CheckoutPage from "./Pages/CheckOutPage";
import CardDetailsPage from "./Pages/CardDetailsPage";
import PaymentSuccessPage from "./Pages/PaymentSuccessPage";
import AboutUs from "./Pages/AboutUs";
import FramePage from "./Pages/FramePage";
import DiecastPage from "./Pages/DiecastPage";

function App() {
  return (
    <CartProvider>
      <DrawerProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/frames" element={<FramePage />} />
                <Route path="/diecast" element={<DiecastPage />} />
                <Route
                  path="/payment-success"
                  element={<PaymentSuccessPage />}
                />
                <Route path="/card-details" element={<CardDetailsPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/brand/:brandname" element={<BrandPage />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/contact" element={<ContactUs />} />{" "}
              </Routes>
            </main>
            <ConditionalFooter />
          </div>
        </Router>
      </DrawerProvider>
    </CartProvider>
  );
}

export default App;
