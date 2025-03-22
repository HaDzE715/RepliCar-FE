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
import Layout from "./Components/Layout";
import AdminDashboard from "./AdminPages/AdminDashboard";
import ProductManagement from "./AdminPages/ProductManagement";
import TagManager from "react-gtm-module";
import { useEffect } from "react";
// import DiscountPopup from "./Components/DiscountPopup";
import DiscountPage from "./Pages/DiscountPage";
import ReactPixel from "react-facebook-pixel";
import ReactGA from "react-ga";
import PostersPage from "./Pages/PostersPage";
import PaymentFailedPage from "./Pages/PaymentFailedPage";

const TRACKING_ID = "G-N2GX693398";
ReactGA.initialize(TRACKING_ID);
function AppContent() {
  // const location = useLocation();

  useEffect(() => {
    const options = {
      autoConfig: true,
      debug: true,
    };

    // Initialize Facebook Pixel with your Pixel ID
    ReactPixel.init("1497154014273282", {}, options); // Replace with your Pixel ID
    ReactPixel.pageView(); // Track page view when the app loads

    // Initialize Google Tag Manager
    TagManager.initialize({ gtmId: "GTM-TSSSFJNT" }); // Your GTM container ID
  }, []);

  // Check if the current route is an admin route
  // const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Conditionally render the popup only if not on admin routes */}
      {/* {!isAdminRoute && <DiscountPopup />} */}

      <Routes>
        {/* Wrap pages that need Navbar and Footer with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/frames" element={<FramePage />} />
          <Route path="/diecast" element={<DiecastPage />} />
          <Route path="/posters" element={<PostersPage />} />
          <Route path="/discounts" element={<DiscountPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/card-details" element={<CardDetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/brand/:brandname" element={<BrandPage />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/payment-failed" element={<PaymentFailedPage />} />
        </Route>

        {/* Separate route for Admin login without Navbar/Footer */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin Dashboard Route with nested routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route path="products" element={<ProductManagement />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <DrawerProvider>
        <Router>
          <AppContent />
        </Router>
      </DrawerProvider>
    </CartProvider>
  );
}

export default App;
