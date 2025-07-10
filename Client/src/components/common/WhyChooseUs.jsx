/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import BlurText from "../../components/animations/BlurText"; // ✅ adjust path if needed

const features = [
  {
    title: "Certified Instructors",
    icon: "🎓",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGoraDgHaWnOQXRSGRexbQIxGLcNSzSi4Njg&s",
    desc: "Learn from global experts with years of industry and teaching experience. Our instructors are passionate to bring real-world insight into every lesson.",
    more: "Instructors come from top institutions",
  },
  {
    title: "Flexible Learning",
    icon: "🕒",
    image: "https://thumbs.dreamstime.com/b/educational-stress-concept-flat-vector-illustration-teacher-students-interact-flexible-curriculum-schedule-adaptable-306397302.jpg",
    desc: "Your learning, your pace. Our platform is designed to work around your lifestyle — whether you’re a full-time student, working professional, or parent.",
    more: "Watch anytime with lifetime access",
  },
  {
    title: "Affordable Pricing",
    icon: "💰",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyPbzm8LVBKNGx8TQjXfqdJHcFtrx7aXBcqw&s",
    desc: "We offer frequent discounts, course bundles, and EMI options. Whether you're a student or a job-seeker, quality learning will always be affordable here.",
    more: "Flat pricing. No monthly subscriptions...",
  },
  {
    title: "Career Support",
    icon: "🚀",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGoraDgHaWnOQXRSGRexbQIxGLcNSzSi4Njg&s", // ✅ Use appropriate image here
    desc: "Our support goes beyond lessons. We help you build a standout resume, ace interviews, and grow a job-ready portfolio.",
    more: "We guide you through resume building and provide career support...",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center">
          <BlurText
            text="💡 Why Choose Learnify?"
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
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Icon bubble */}
              <div className="w-16 h-16 -mt-8 mb-4 bg-white border border-blue-300 rounded-full flex items-center justify-center text-3xl shadow text-blue-700 z-10">
                {item.icon}
              </div>

              {/* Title & Description */}
              <div className="px-5">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>

              {/* Hover overlay */}
              <motion.div
                variants={{
                  rest: { opacity: 0, y: 30 },
                  hover: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeInOut" },
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




// /* eslint-disable no-unused-vars */
// import { motion } from "framer-motion";
// import BlurText from "../../components/animations/BlurText"; // ✅ adjust path if needed

// const features = [
// <<<<<<< gauri
//   {
//     title: 'Certified Instructors',
//     icon: '🎓',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGoraDgHaWnOQXRSGRexbQIxGLcNSzSi4Njg&s',
//     desc: 'Learn from global experts with years of industry and teaching experience. Our instructors are passionate to bring real-world insight into every lesson.',
//     more: 'Instructors come from top institutions ',
//   },
//   {
//     title: 'Flexible Learning',
//     icon: '🕒',
//     image:
//       'https://thumbs.dreamstime.com/b/educational-stress-concept-flat-vector-illustration-teacher-students-interact-flexible-curriculum-schedule-adaptable-306397302.jpg',
//     desc: 'Your learning, your pace. Our platform is designed to work around your lifestyle — whether you’re a full-time student, working professional, or parent.',
//     more: 'Watch anytime with lifetime access',
//   },
//   {
//     title: 'Affordable Pricing',
//     icon: '💰',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyPbzm8LVBKNGx8TQjXfqdJHcFtrx7aXBcqw&s',
//     desc: 'We offer frequent discounts, course bundles, and EMI options. Whether you re a student or a job-seeker, quality learning will always be affordable here.',
//     more: 'Flat pricing. No monthly subscriptions...',
//   },
//   {
//     title: 'Career Support',
//     icon: '🚀',
//     image:
//       'data:image/png;base64,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',
//     desc: 'Our support goes beyond lessons. We help you build a standout resume, ace interviews, and grow a job-ready portfolio.',
//     more: 'We guide you through resume building and  provide career support...',
//   },
// ];





// =======
//     {
//         title: "Certified Instructors",
//         icon: "🎓",
//         image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVhY2hlcnxlbnwwfHwwfHx8MA%3D%3D",
//         desc: "Learn from globally recognized educators and active industry professionals. Each instructor is vetted for teaching excellence, domain expertise, and real-world experience — ensuring every lesson is practical, insightful, and career-relevant.",
//         more: "Instructors come from top institutions like Google, Microsoft, and IITs — teaching with hands-on projects and industry-relevant case studies.",
//     },
//     {
//         title: "Flexible Learning",
//         icon: "🕒",
//         image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b25saW5lJTIwbGVhcm5pbmd8ZW58MHx8MHx8fDA%3D",
//         desc: "Study on your schedule — whether it's early mornings, late nights, or weekends. Our platform works seamlessly across devices, with downloadable content and self-paced lessons designed to fit around your lifestyle and commitments.",
//         more: "Watch anytime with lifetime access. Courses are mobile-friendly, downloadable, and structured into bite-sized lessons.",
//     },
//     {
//         title: "Affordable Pricing",
//         icon: "💰",
//         image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWZmb3JkYWJsZXxlbnwwfHwwfHx8MA%3D%3D",
//         desc: "Get premium-quality courses without breaking the bank. One-time purchase gives lifetime access, and we regularly offer discounts, bundles, and EMI options — making world-class education accessible to all learners.",
//         more: "Flat pricing. No monthly subscriptions. Bundle deals. EMI options. All content unlocked forever after purchase.",
//     },
//     {
//         title: "Career Support",
//         icon: "🚀",
//         image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyZWVyJTIwc3VwcG9ydHxlbnwwfHwwfHx8MA%3D%3D",
//         desc: "Learning is just the beginning — we help you launch your career. From expert-reviewed resumes to mock interviews and networking with mentors, our career support is tailored to help you land your dream job faster.",
//         more: "We guide you through resume building, LinkedIn optimization, mock interviews, and referrals from industry mentors.",
//     },
// ];

// >>>>>>> main
// const WhyChooseUs = () => {
//     return (
//         <section className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-24 px-6">
//             <div className="max-w-7xl mx-auto text-center">
//                 <div className="flex justify-center">
//                     <BlurText
//                         text="💡 Why Choose Learnify?"
//                         delay={120}
//                         animateBy="words"
//                         direction="top"
//                         className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 text-center"
//                     />
//                 </div>

//                 <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-14">
//                     We’re not just another platform. We’re your lifelong growth
//                     partner — from learning to earning.
//                 </p>

// <<<<<<< gauri
//         <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
//           {features.map((item, i) => (
//             <motion.div
//               key={i}
//               className="relative bg-white rounded-3xl shadow-lg overflow-hidden group h-[480px] flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl hover:scale-[1.03]"
//               whileHover="hover"
//               initial="rest"
//               animate="rest"
//             >
//               {/* Top image */}
//               <div className="h-50 w-full relative">
//                 <img src={item.image} alt={item.title} className="w-full h-full object-cover" />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
//               </div>
// =======
//                 <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
//                     {features.map((item, i) => (
//                         <motion.div
//                             key={i}
//                             className="relative bg-white rounded-3xl shadow-lg overflow-hidden group h-[480px] flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl hover:scale-[1.03]"
//                             whileHover="hover"
//                             initial="rest"
//                             animate="rest"
//                         >
//                             {/* Top image */}
//                             <div className="h-40 w-full relative">
//                                 <img
//                                     src={item.image}
//                                     alt={item.title}
//                                     className="w-full h-full object-cover"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
//                             </div>
// >>>>>>> main

//                             {/* Icon bubble */}
//                             <div className="w-16 h-16 -mt-8 mb-4 bg-white border border-blue-300 rounded-full flex items-center justify-center text-3xl shadow text-blue-700 z-10">
//                                 {item.icon}
//                             </div>

//                             {/* Title & Short Description */}
//                             <div className="px-5">
//                                 <h3 className="text-xl font-semibold text-blue-700 mb-2">
//                                     {item.title}
//                                 </h3>
//                                 <p className="text-gray-600 text-sm leading-relaxed">
//                                     {item.desc}
//                                 </p>
//                             </div>

//                             {/* Animated Overlay on Hover */}
//                             <motion.div
//                                 variants={{
//                                     rest: { opacity: 0, y: 30 },
//                                     hover: {
//                                         opacity: 1,
//                                         y: 0,
//                                         transition: {
//                                             duration: 0.6,
//                                             ease: "easeInOut",
//                                         },
//                                     },
//                                 }}
//                                 className="absolute inset-0 bg-black/85 text-white flex items-center justify-center px-6 text-sm text-center pointer-events-none"
//                             >
//                                 <p className="leading-relaxed">{item.more}</p>
//                             </motion.div>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default WhyChooseUs;
