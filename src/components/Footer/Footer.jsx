import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-sections">

          {/* Library Information */}
          <div className="footer-section">
            <h3>Turning Point Library</h3>
            <p>Providing study spaces and resources for students and professionals since 2010.</p>
            <div className="contact-info">
              <p>📞 +91 7477027292</p>
              <p>📧 info@library.com</p>
              <p>📍 Station Road, Vidisha</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/membership">Membership</a></li>
              <li><a href="/">Library</a></li>
            </ul>
          </div>

          {/* Hours */}
          <div className="footer-section">
            <h4>Opening Hours</h4>
            <div className="hours">
              <div className="hour-row">
                <span>Mon - Fri:</span>
                <span>7:00 AM - 10:00 PM</span>
              </div>
              <div className="hour-row">
                <span>Saturday:</span>
                <span>8:00 AM - 8:00 PM</span>
              </div>
              <div className="hour-row">
                <span>Sunday:</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a
                href="#"
                aria-label="Facebook"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f social-icon facebook"></i> Facebook
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram social-icon instagram"></i> Instagram
              </a>

              <a
                href="#"
                aria-label="X"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-x-twitter social-icon x"></i> X
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; 2024 Turning Point Library. All rights reserved.</p>
            </div>
            <div className="legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Accessibility</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
