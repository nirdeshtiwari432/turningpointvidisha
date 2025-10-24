import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./hero.css";

// Import local images
import p1 from "../../assets/p1.jpg";
import p2 from "../../assets/p2.jpg";
import p3 from "../../assets/p3.jpg";
import p4 from "../../assets/p4.jpg";
import p5 from "../../assets/p5.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showGallery, setShowGallery] = useState(false);

  const photos = [p1, p2, p3, p4, p5]; // use imported images

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowGallery(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo === "library") {
      const section = document.getElementById("library-section");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [location]);

  return (
    <div className="hero-container">
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Study in Focus — at Our Library</h1>
            <p>
              Modern study cubicles, peaceful atmosphere, and membership plans 
              for students and professionals.
            </p>
            <div className="hero-buttons">
              <button
                className="btn primary"
                onClick={() => {
                  const section = document.getElementById("library-section");
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Library
              </button>
              <button
                className="btn secondary"
                onClick={() => navigate("/login")}
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="library-section" className={`photo-gallery ${showGallery ? "visible" : ""}`}>
        <div className="gallery-container">
          <h2>Our Library Spaces</h2>
          <p>Explore our modern facilities designed for optimal learning</p>
          <div className="photos-grid">
            {photos.map((photo, index) => (
              <div key={index} className="photo-card">
                <img src={photo} alt={`Library space ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
