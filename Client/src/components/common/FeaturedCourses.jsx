import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { FaArrowRight, FaStar } from 'react-icons/fa6';
import 'swiper/css';
import 'swiper/css/free-mode';

import { dummyCourses } from '../../api/dummyCourses';
import TrueFocus from '../animations/TrueFocus';

const FeaturedCourses = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-14">
          <TrueFocus
            sentence=" Featured Courses"
            blurAmount={5}
            borderColor="blue"
            animationDuration={0.5}
            pauseBetweenAnimations={1}
          />
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
            Level up your career with our best-rated programs, handpicked for you.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, FreeMode]}
          loop={true}
          freeMode={true}
          grabCursor={true}
          speed={3500}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={30}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-6"
          style={{ '--swiper-animation-timing-function': 'linear' }}
        >
          {dummyCourses.map((c) => (
            <SwiperSlide key={c.id}>
              <div className="bg-white group shadow-md hover:shadow-2xl transition rounded-2xl overflow-hidden border-l-4 border-green-400 hover:border-blue-600 h-full">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-5 flex flex-col justify-between h-[280px]">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-700 group-hover:text-green-600 transition line-clamp-1">
                      {c.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 mb-2 line-clamp-2">
                      by <span className="font-medium">{c.instructor}</span>
                    </p>

                    <p className="text-gray-600 text-sm line-clamp-2">{c.description}</p>
                  </div>

                  <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span>⏳ {c.duration}</span>
                      <span>🎯 {c.level}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500 text-xs" />
                      <span className="font-medium text-sm text-gray-700">{c.rating}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-green-600">₹{c.price}</span>
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

        <div className="text-center mt-12">
          <Link to="/courses">
            <button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-green-600 hover:to-blue-600 text-white px-7 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-xl transition-all">
              🎓 Browse All Courses
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
