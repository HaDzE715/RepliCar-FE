import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BrandPage from "./Pages/Brandpage";
import ProductDetails from "./Components/ProductDetails";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
import { CartProvider } from "./Components/CartContext";
import { DrawerProvider } from "./Components/DrawerContext";
import TermsAndConditions from "./Pages/TermsAndConditions";
import ContactUs from "./Pages/ContactUs";
import CheckoutPage from "./Pages/CheckOutPage";
import CardDetailsPage from "./Pages/CardDetailsPage";
import PaymentSuccessPage from "./Pages/PaymentSuccessPage";
import AboutUs from "./Pages/AboutUs";
import FramePage from "./Pages/FramePage";
import DiecastPage from "./Pages/DiecastPage";
import AdminLogin from "./AdminPages/AdminLogin";
import Layout from "./Components/Layout"; // Import the Layout component
import AdminDashboard from "./AdminPages/AdminDashboard";
import ProductManagement from "./AdminPages/ProductManagement";

function App() {
  console.log("API:", process.env.REACT_APP_API_URL);
  return (
    <CartProvider>
      <DrawerProvider>
        <Router>
          <Routes>
            {/* Wrap pages that need Navbar and Footer with Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/frames" element={<FramePage />} />
              <Route path="/diecast" element={<DiecastPage />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="/product-details/:id" element={<ProductDetails />} />
              <Route path="/card-details" element={<CardDetailsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/brand/:brandname" element={<BrandPage />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/contact" element={<ContactUs />} />
            </Route>

            {/* Separate route for Admin login without Navbar/Footer */}
            <Route path="/admin" element={<AdminLogin />} />

            {/* Admin Dashboard Route with nested routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />}>
              <Route path="products" element={<ProductManagement />} />{" "}
              {/* Nested relative path */}
            </Route>
          </Routes>
        </Router>
      </DrawerProvider>
    </CartProvider>
  );
}

export default App;
