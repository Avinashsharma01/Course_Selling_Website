import { motion } from 'framer-motion';
import BlurText from '../../components/animations/BlurText'; // ✅ adjust path if needed

const features = [
  {
    title: 'Certified Instructors',
    icon: '🎓',
    desc: 'Learn from globally recognized educators and active industry professionals. Each instructor is vetted for teaching excellence, domain expertise, and real-world experience — ensuring every lesson is practical, insightful, and career-relevant.',
    more: 'Instructors come from top institutions like Google, Microsoft, and IITs — teaching with hands-on projects and industry-relevant case studies.',
  },
  {
    title: 'Flexible Learning',
    icon: '🕒',
    desc: 'Study on your schedule — whether it’s early mornings, late nights, or weekends. Our platform works seamlessly across devices, with downloadable content and self-paced lessons designed to fit around your lifestyle and commitments.',
    more: 'Watch anytime with lifetime access. Courses are mobile-friendly, downloadable, and structured into bite-sized lessons.',
  },
  {
    title: 'Affordable Pricing',
    icon: '💰',
    desc: 'Get premium-quality courses without breaking the bank. One-time purchase gives lifetime access, and we regularly offer discounts, bundles, and EMI options — making world-class education accessible to all learners.',
    more: 'Flat pricing. No monthly subscriptions. Bundle deals. EMI options. All content unlocked forever after purchase.',
  },
  {
    title: 'Career Support',
    icon: '🚀',
    desc: 'Learning is just the beginning — we help you launch your career. From expert-reviewed resumes to mock interviews and networking with mentors, our career support is tailored to help you land your dream job faster.',
    more: 'We guide you through resume building, LinkedIn optimization, mock interviews, and referrals from industry mentors.',
  },
];



const imageURL =
  'https://cdn.pixabay.com/photo/2025/06/11/22/12/kackar-mountains-9655201_1280.jpg';

const WhyChooseUs = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center">
          <BlurText
            text="💡 Why Choose CourseSelling?"
            delay={120}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 text-center"
          />
        </div>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-14">
          We’re not just another platform. We’re your lifelong growth partner — from learning to earning.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          {features.map((item, i) => (
            <motion.div
              key={i}
              className="relative bg-white rounded-3xl shadow-lg overflow-hidden group h-[480px] flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl hover:scale-[1.03]"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              {/* Top image */}
              <div className="h-40 w-full relative">
                <img src={imageURL} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Icon bubble */}
              <div className="w-16 h-16 -mt-8 mb-4 bg-white border border-blue-300 rounded-full flex items-center justify-center text-3xl shadow text-blue-700 z-10">
                {item.icon}
              </div>

              {/* Title & Short Description */}
              <div className="px-5">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>

              {/* Animated Overlay on Hover */}
              <motion.div
                variants={{
                  rest: { opacity: 0, y: 30 },
                  hover: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: 'easeInOut' },
                  },
                }}
                className="absolute inset-0 bg-black/85 text-white flex items-center justify-center px-6 text-sm text-center pointer-events-none"
              >
                <p className="leading-relaxed">{item.more}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
