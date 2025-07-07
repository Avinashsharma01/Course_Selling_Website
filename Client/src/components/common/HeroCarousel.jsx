import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    title: 'Master New Skills Online',
    subtitle: 'Access 100+ expert-led courses anytime, anywhere.',
    bg: 'bg-gradient-to-r from-blue-600 to-green-500',
  },
  {
    title: 'Upskill for Your Dream Job',
    subtitle: 'Courses built for real-world careers and success.',
    bg: 'bg-gradient-to-r from-green-600 to-blue-500',
  },
  {
    title: 'Learn at Your Own Pace',
    subtitle: 'Flexible learning designed just for you.',
    bg: 'bg-gradient-to-r from-blue-800 to-green-600',
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`relative overflow-hidden h-[70vh] md:h-[80vh] flex items-center justify-center ${slides[current].bg}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-center px-6 max-w-3xl"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow mb-4">
            {slides[current].title}
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8">{slides[current].subtitle}</p>
          <Link
            to="/courses"
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-100 transition"
          >
            Explore Courses
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-5 flex gap-2 justify-center w-full">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${index === current ? 'bg-white' : 'bg-white/50'} transition`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
