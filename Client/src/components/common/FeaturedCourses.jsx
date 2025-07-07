import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { FaArrowRight } from 'react-icons/fa6';
import 'swiper/css';
import 'swiper/css/free-mode';

const dummyCourses = [
  {
    id: 1,
    title: 'Full‑Stack Web Development',
    desc: 'Build modern websites with React, Node & MongoDB.',
    price: '₹1499',
    image: 'https://source.unsplash.com/400x250/?coding,webdev',
  },
  {
    id: 2,
    title: 'Cyber Security Fundamentals',
    desc: 'Learn ethical hacking, cryptography & network defense.',
    price: '₹999',
    image: 'https://source.unsplash.com/400x250/?cybersecurity,hacking',
  },
  {
    id: 3,
    title: 'Data Science with Python',
    desc: 'Master data analysis, pandas, and ML techniques.',
    price: '₹1299',
    image: 'https://source.unsplash.com/400x250/?data,python',
  },
  {
    id: 4,
    title: 'Digital Marketing Essentials',
    desc: 'Grow your business with SEO, SEM & social media.',
    price: '₹899',
    image: 'https://source.unsplash.com/400x250/?digitalmarketing,seo',
  },
  {
    id: 5,
    title: 'UI/UX Design Bootcamp',
    desc: 'Create stunning user interfaces and experiences.',
    price: '₹1099',
    image: 'https://source.unsplash.com/400x250/?uiux,design',
  },
  {
    id: 6,
    title: 'Mobile App Development',
    desc: 'Build Android & iOS apps with Flutter and React Native.',
    price: '₹1399',
    image: 'https://source.unsplash.com/400x250/?mobileapp,flutter',
  },
];

const FeaturedCourses = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-4">🔥 Featured Courses</h2>
        <p className="text-gray-600 text-center mb-10">
          Learn industry‑ready skills with our top‑rated programs
        </p>

        <Swiper
          modules={[Autoplay, FreeMode]}
          loop={true}
          freeMode={true}
          grabCursor={true}
          speed={3000} // smooth slow auto scroll
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={24}
          slidesPerView={4}
          className="pb-4"
          style={{ '--swiper-animation-timing-function': 'linear' }}
        >
          {dummyCourses.map((c) => (
            <SwiperSlide key={c.id}>
              <div className="bg-white shadow-md hover:shadow-xl transition rounded-xl overflow-hidden border-t-4 border-green-400 hover:border-blue-600">
                <img src={c.image} alt={c.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-blue-700 hover:text-green-600 transition">
                    {c.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 mb-4 line-clamp-2">{c.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-600">{c.price}</span>
                    <Link
                      to="/courses"
                      className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
                    >
                      View&nbsp;Details <FaArrowRight className="text-xs mt-[2px]" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-10">
          <Link to="/courses">
            <button className="bg-blue-600 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition">
              Browse All Courses
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
