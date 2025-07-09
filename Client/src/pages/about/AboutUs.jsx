import React from 'react';
import './About.css';
import teamImage from '../../assets/Screenshot.png.jpg';
import TrueFocus from '../../components/animations/TrueFocus';
import Stack from '../../components/animations/Stack';

const teamMembers = [
  {
    name: 'Gauri Jakhmola',
    role: 'Frontend Developer',
    since: 'Since 2022',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Ishika saha',
    role: 'UI/UX Designer',
    since: 'Since 2022',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'avinash sharma',
    role: 'Backend Engineer',
    since: 'Since 2021',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Sachin prajapati',
    role: 'Project Manager',
    since: 'Since 2021',
    image: 'https://via.placeholder.com/150',
  },
];

const AboutUs = () => {
  return (
    <div className="about-wrapper">
      {/* Hero Section */}
      <section className="about-hero">
        <TrueFocus
          sentence="About Us"
          manualMode={false}
          blurAmount={5}
          borderColor="#2563eb"
          glowColor="rgba(37, 99, 235, 0.5)"
          animationDuration={0.6}
          pauseBetweenAnimations={1}
        />
      </section>

      {/* Full Width Banner Image */}
      <section className="about-banner">
        <img src={teamImage} alt="Our Team" className="about-banner-image" />
      </section>

      {/* Text Content */}
      <section className="about-content">
        <div className="about-text">
          <p>
            At <strong>Learnify</strong>, we are a passionate team dedicated to making quality education accessible to everyone.
            We collaborate across borders to build the best learning experiences possible. From industry-aligned courses to expert-led mentorship,
            everything we do is designed to help learners grow and thrive in their careers.
          </p>
          <p>
            We design every course with one goal in mind — career growth. From hands-on projects to industry-relevant tools,
            Learnify equips you with the skills top employers demand. We are proud to support both beginners and professionals on their learning journey.
            Whether it's mastering new skills or switching careers, Learnify empowers you to achieve more.
          </p>
          <p>
            Since day one, we've challenged traditional learning models by focusing on flexibility, relevance, and learner success.
            Education is evolving — and we’re building the future, one course at a time.
          </p>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="team-section">
        <h2 className="team-heading">Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <img src={member.image} alt={member.name} className="team-image" />
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-since">{member.since}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cards Section with Stack Effect */}
      <section className="about-cards-stack">
        <div className="stack-wrapper">
          <h2 className="stack-section-heading">
            Here's Why Learners Around the World Choose <span className="text-blue-600 font-bold">Learnify</span>
          </h2>
          <p className="stack-subheading">
            Designed to empower you with career-ready skills, community support, and real-world outcomes.
          </p>

          <div className="stack-adjusted">
            <Stack
              randomRotation={true}
              sensitivity={160}
              sendToBackOnClick={true}
              cardDimensions={{ width: 600, height: 270 }}
              cardsData={[
  {
    id: 1,
    title: "📈 Career-Focused Learning",
    description: "Courses built for real-world jobs. Gain portfolio-worthy projects and skills recruiters love.",
    details: "Each course is created in collaboration with industry experts and packed with hands-on projects to help you build a strong portfolio. Whether you're learning web dev or data science, we align everything with real-world demand.",
    outcome: "By the end, you're job-ready — not just certificate-ready.",
  },
  {
    id: 2,
    title: "🌐 Global Community",
    description: "Join thousands of learners, mentors & experts worldwide. Grow with global connections.",
    details: "Interact in live sessions, discussion forums, and global networking events. Our vibrant community provides peer support, mentorship, and collaboration opportunities that accelerate your learning.",
    outcome: "You’re never alone on your journey — the world learns with you.",
  },
  {
    id: 3,
    title: "🎓 Real Results",
    description: "Land dream jobs, switch careers or build your own startup — all through Learnify’s outcomes-first learning.",
    details: "We don’t just teach theory — we help you apply what you learn with guided capstone projects, resume reviews, and mock interviews. Learners report job offers from Google, TCS, and rising startups.",
    outcome: "Learning here means changing your life, not just your resume.",
  },
]}

            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
