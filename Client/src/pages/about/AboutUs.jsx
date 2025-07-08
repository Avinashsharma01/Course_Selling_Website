import React from 'react';
import './About.css';
import team1 from '../../assets/Screenshot.png.jpg';
import team2 from '../../assets/s2.jpg';
import team3 from '../../assets/s3.jpg';

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>About</h1>
        <p>Your gateway to world-class online education.</p>
      </section>

      {/* Mission Section */}
      <section className="mission section-center">
        <h2>🎯 Our Mission</h2>
        <p>
          At Learnify, we believe education should be accessible, engaging, and empowering. Our mission is to help learners unlock their potential through expertly crafted online courses.
        </p>
      </section>

      {/* Team Section */}
      <section className="team section-center">
        <h2>👨‍💻 Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src={team1} alt="Ravi Sharma" />
            <h3>Ravi Sharma</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src={team2} alt="Priya Mehta" />
            <h3>Priya Mehta</h3>
            <p>Head of Content</p>
          </div>
          <div className="team-member">
            <img src={team3} alt="Arjun Verma" />
            <h3>Arjun Verma</h3>
            <p>Lead Developer</p>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="why-us section-center">
        <h2>🚀 Why Choose Learnify?</h2>
        <ul>
          <li>🎓 Expert instructors from top universities</li>
          <li>📚 Lifetime access to all courses</li>
          <li>📜 Verified certificates</li>
          <li>💸 Affordable pricing plans</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
