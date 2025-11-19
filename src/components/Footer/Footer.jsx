import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo + About Section */}
        <div className="footer-section about">
          <h2 className="footer-logo">Turning Point</h2>
          <p>
            Turning Point is your trusted space for focus, learning, and growth.
            Whether you're studying, collaborating, or working remotely — we
            provide the perfect environment to achieve your goals.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/membership">Membership</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><i className="fas fa-map-marker-alt"></i> 123 Focus Street, New Delhi, India</p>
          <p><i className="fas fa-phone-alt"></i> +91 98765 43210</p>
          <p><i className="fas fa-envelope"></i> contact@turningpoint.com</p>
        </div>

        {/* Social Media */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-facebook social-icon facebook"></i>
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-instagram social-icon instagram"></i>
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-x-twitter social-icon x"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Turning Point. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
