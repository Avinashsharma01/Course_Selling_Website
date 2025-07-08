import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { FaArrowRight } from 'react-icons/fa6';
import 'swiper/css';
import 'swiper/css/free-mode';

import { dummyCourses } from '../../api/dummyCourses';
import TrueFocus from '../effects/TrueFocus'; // ✅ Import the effect

const FeaturedCourses = () => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* ✅ Animated Heading */}
        <div className="mb-4 flex justify-center">
          <TrueFocus
            sentence=" Featured Courses"
            blurAmount={5}
            borderColor="blue"
            glowColor="rgba(37, 99, 235, 0.6)" // Tailwind blue-600
            animationDuration={1}
            pauseBetweenAnimations={1}
          />
        </div>

        <p className="text-gray-600 text-center mb-10">
          Learn industry‑ready skills with our top‑rated programs
        </p>

        {/* ✅ Auto-Scrolling Carousel */}
        <Swiper
          modules={[Autoplay, FreeMode]}
          loop={true}
          freeMode={true}
          grabCursor={true}
          speed={3000}
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
                      to={`/courses/${c.id}`}
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

        {/* ✅ Button to view all */}
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
