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
import { Helmet } from "react-helmet";
import CardDetailsPage from "./Pages/CardDetailsPage";

function App() {
  return (
    <CartProvider>
      <DrawerProvider>
        <Router>
          <div className="App">
            <Helmet>
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-N2GX693398"
              ></script>
              <script>
                {`
                   window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                   gtag('config', 'G-N2GX693398');
                `}
              </script>
            </Helmet>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
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
