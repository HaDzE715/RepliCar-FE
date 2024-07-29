import React from "react";
import "../Style/Footer.css"; // Make sure to have the relevant CSS
import logo from "../Pictures/logo.jpg";
import instalogo from "../Pictures/instalogo.png";
import emaillogo from "../Pictures/EmailLogo.png";
import visaLogo from "../Pictures/visa.png";
import mastercardLogo from "../Pictures/mastercard.png";
import amexLogo from "../Pictures/amex.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={logo} alt="Company Logo" className="footer-logo" />
        <p className="footer-text">!צריכים משהו? דברו איתנו</p>
        <div className="contact-info">
          <div className="contact-item">
            <a
              href="https://www.instagram.com/repli.car/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>אינסטגרם בצאט</span>
              <img src={instalogo} alt="Instagram" className="instagram-logo" />
              </a>
          </div>
          <div className="contact-item">
            <a href="mailto:Repli.car911@gmail.com">
              <span>Repli.car911@gmail.com</span>
              <img src={emaillogo} alt="Email" className="contact-logo-email" />
              </a>
          </div>
        </div>
        <div className="footer-links">
          <Link to="/about" className="footer-link">
            • אודות
          </Link>
          <Link to="/contact" className="footer-link">
            • צרו קשר
          </Link>
          <Link to="/terms" className="footer-link">
            • תקנון האתר
          </Link>
        </div>
        <div className="payment-logos">
          <img src={visaLogo} alt="Visa" className="payment-logo" />
          <img src={mastercardLogo} alt="Mastercard" className="payment-logo" />
          <img src={amexLogo} alt="American Express" className="payment-logo" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
