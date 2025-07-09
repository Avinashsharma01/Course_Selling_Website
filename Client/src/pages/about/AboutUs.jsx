import React from 'react';
import teamImage from '../../assets/about-us.png';
import TrueFocus from '../../components/animations/TrueFocus';
import Stack from '../../components/animations/Stack';
import GridMotion from '../../components/animations/GridMotion';

const teamMembers = [
  {
    name: 'Gauri Jakhmola',
    role: 'Frontend Developer',
    since: 'Since 2022',
    image: 'https://avatars.githubusercontent.com/u/160722158?v=4&size=64',
  },
  {
    name: 'Ishika Saha',
    role: 'UI/UX Designer',
    since: 'Since 2022',
    image: 'https://avatars.githubusercontent.com/u/166376072?v=4',
  },
  {
    name: 'Avinash Sharma',
    role: 'Backend Engineer',
    since: 'Since 2021',
    image: 'https://avatars.githubusercontent.com/u/155890004?v=4',
  },
  {
    name: 'Sachin Prajapati',
    role: 'Frontend Developer',
    since: 'Since 2021',
    image: 'https://avatars.githubusercontent.com/u/166122249?v=4',
  },
];

const AboutUs = () => {
  return (
    <div className="bg-slate-50 min-h-screen w-full text-gray-800">
      {/* Hero Section */}
      <section className="pt-0 pb-10 flex justify-center">
  <div className="relative">
    {/* 3D Popped Background */}
    <div className="absolute inset-0 blur-md bg-gradient-to-r from-blue-300 via-white to-blue-300 shadow-2xl rounded-xl scale-105 z-0"></div>

    {/* Foreground Text with TrueFocus */}
    <div className="relative z-10 bg-white/70 backdrop-blur-md px-8 py-6 rounded-xl shadow-xl border border-blue-100">
      <TrueFocus
        sentence="About Us"
        manualMode={false}
        blurAmount={5}
        borderColor="#2563eb"
        glowColor="rgba(37, 99, 235, 0.5)"
        animationDuration={0.6}
        pauseBetweenAnimations={1}
      />
    </div>
  </div>
</section>


      {/* Banner Image */}
      <section className="w-full h-[500px] md:h-[650px] relative z-0">
  <GridMotion
  items={[
    'https://cdn.pixabay.com/photo/2015/01/08/18/11/laptops-593296_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/01/14/10/56/people-1979261_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/12/02/23/20/online-4668930_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/12/29/19/40/online-4727942_1280.jpg',
    'https://cdn.pixabay.com/photo/2022/01/28/12/17/distance-learning-6974511_1280.jpg',
    'https://cdn.pixabay.com/photo/2020/05/12/13/33/online-learning-5163039_1280.jpg',
    'https://cdn.pixabay.com/photo/2015/07/17/22/42/startup-849804_1280.jpg',
    'https://cdn.pixabay.com/photo/2015/01/08/18/24/children-593313_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/02/07/13/46/target-2045924_1280.jpg',
    'https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/04/23/19/30/earth-2254769_1280.jpg',
    'https://cdn.pixabay.com/photo/2022/12/03/23/00/cyber-brain-7633488_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/12/29/19/40/online-4727942_1280.jpg',
    'https://cdn.pixabay.com/photo/2022/01/28/12/17/distance-learning-6974511_1280.jpg',
    'https://cdn.pixabay.com/photo/2020/05/12/13/33/online-learning-5163039_1280.jpg',
    'https://cdn.pixabay.com/photo/2015/07/17/22/42/startup-849804_1280.jpg',
    'https://cdn.pixabay.com/photo/2015/01/08/18/24/children-593313_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/02/07/13/46/target-2045924_1280.jpg',
    'https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/04/23/19/30/earth-2254769_1280.jpg',
    'https://cdn.pixabay.com/photo/2022/12/03/23/00/cyber-brain-7633488_1280.jpg',
    
    'https://cdn.pixabay.com/photo/2019/12/29/19/40/online-4727942_1280.jpg',
    'https://cdn.pixabay.com/photo/2022/01/28/12/17/distance-learning-6974511_1280.jpg',
    'https://cdn.pixabay.com/photo/2015/07/17/22/42/startup-849804_1280.jpg',
    'https://cdn.pixabay.com/photo/2015/01/08/18/24/children-593313_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/02/07/13/46/target-2045924_1280.jpg',
    'https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/04/23/19/30/earth-2254769_1280.jpg',
    'https://cdn.pixabay.com/photo/2022/12/03/23/00/cyber-brain-7633488_1280.jpg',
  
  ]}
/>

</section>

      {/* Split Section */}
      <section className="py-20 px-6 md:px-16 flex flex-col lg:flex-row gap-16 max-w-7xl mx-auto">
        <div className="lg:w-1/2 space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
            What Drives <span className="text-blue-900">Learnify</span>
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At <strong>Learnify</strong>, we are a passionate team dedicated to making quality education accessible to everyone.
            From expert-led courses to global community support, everything is designed to help learners grow and thrive in their careers.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We empower your growth through flexible learning, real-world projects, and tools aligned with industry demand.
            Whether you're upskilling or switching paths — we're here for your success.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our goal is simple: practical, outcome-focused learning that changes lives. Learnify is not just a platform — it’s a launchpad.
          </p>
        </div>

        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">Meet the Team Behind Learnify</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 text-center hover:scale-105 transition-transform">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 mx-auto mb-4 rounded-full object-cover border-4 border-blue-200"
                />
                <h3 className="font-semibold text-lg text-blue-800">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
                <p className="text-xs text-gray-400 italic">{member.since}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cards Section with Stack Animation */}
      <section className="bg-blue-50 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Here's Why Learners Choose <span className="text-blue-600">Learnify</span>
          </h2>
          <p className="text-gray-600 text-lg mb-10">
            Designed to empower you with career-ready skills, community support, and real-world outcomes.
          </p>
          <div className="flex justify-center">
            <Stack
              randomRotation={true}
              sensitivity={160}
              sendToBackOnClick={true}
              cardDimensions={{ width: 600, height: 270 }}
              cardsData={[
                {
                  id: 1,
                  title: '📈 Career-Focused Learning',
                  description: 'Courses built for real-world jobs. Gain portfolio-worthy projects and skills recruiters love.',
                  details: 'Each course is created in collaboration with industry experts and packed with hands-on projects to help you build a strong portfolio. Whether you\'re learning web dev or data science, we align everything with real-world demand.',
                  outcome: 'By the end, you\'re job-ready — not just certificate-ready.',
                },
                {
                  id: 2,
                  title: '🌐 Global Community',
                  description: 'Join thousands of learners, mentors & experts worldwide. Grow with global connections.',
                  details: 'Interact in live sessions, discussion forums, and global networking events. Our vibrant community provides peer support, mentorship, and collaboration opportunities that accelerate your learning.',
                  outcome: 'You’re never alone on your journey — the world learns with you.',
                },
                {
                  id: 3,
                  title: '🎓 Real Results',
                  description: 'Land dream jobs, switch careers or build your own startup — all through Learnify’s outcomes-first learning.',
                  details: 'We don’t just teach theory — we help you apply what you learn with guided capstone projects, resume reviews, and mock interviews. Learners report job offers from Google, TCS, and rising startups.',
                  outcome: 'Learning here means changing your life, not just your resume.',
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
