import React from 'react';
import introImg from '../../assets/s12.jpg';
import contactImg from '../../assets/s22.jpg';
import './privacy-Policy.css';



const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <header className="privacy-header">
        <h1>Privacy Policy</h1>
        <p>Effective Date: July 8, 2025</p>
        <img src={introImg} alt="Privacy Introduction" className="privacy-image" />
      </header>

      <section className="privacy-section">
        <h2>1. Introduction</h2>
        <p>
          Welcome to LearnSphere! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website.
        </p>
      </section>

      <section className="privacy-section">
        <h2>2. Information We Collect</h2>
        
        <ul>
          <li>Personal Information (name, email, phone number)</li>
          <li>Payment Details (processed securely via third-party gateways)</li>
          <li>Course Progress and Activity Logs</li>
          <li>Device and Browser Information</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>3. How We Use Your Information</h2>
       
        <p>We use your data to:</p>
        <ul>
          <li>Provide and improve our courses</li>
          <li>Send important updates and offers</li>
          <li>Ensure platform security</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>4. Your Rights</h2>
        
        <p>You have the right to:</p>
        <ul>
          <li>Access and update your data</li>
          <li>Request deletion of your account</li>
          <li>Opt-out of marketing emails</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>5. Contact Us</h2>
        <img src={contactImg} alt="Contact Us" className="privacy-image" />
        <p>If you have any questions, contact us at <a href="mailto:support@learnsphere.com">support@learnsphere.com</a>.</p>
      </section>

      <footer className="privacy-footer">
        <p>© 2025 LearnSphere. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;