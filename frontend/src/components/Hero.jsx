import React from "react";
import heroImage from "../assets/hero-image.webp";

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          
          {/* Hero Image on the Left */}
          <div className="hero-image">
            <img src={heroImage} alt="Healthcare" className="animated-image" />
          </div>

          {/* Hero Text on the Right */}
          <div className="hero-text">
            <h1>Your Health, <span>Our Priority</span></h1>
            <p>
              Welcome to <strong>Healifi</strong> - your trusted healthcare companion.  
              Book appointments, connect with top doctors, and manage your health effortlessly.
            </p>
            <div className="hero-buttons">
              <button className="hero-btn primary-btn">Get Started</button>
              <button className="hero-btn secondary-btn">
                <a href="#learn-more">Learn More</a>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <section id="learn-more" className="learn-more-section">
        <div className="container">
          <h2>Why Choose Healifi?</h2>
          <p>
            Healifi is designed to provide seamless healthcare solutions. Book
            appointments, consult with top doctors, and manage your medical records
            in one place. We ensure high-quality healthcare accessibility for
            everyone.
          </p>
        </div>
      </section>
    </>
  );
};

export default Hero;
