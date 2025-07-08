import { useEffect, useRef } from "react";
import gsap from "gsap";

const CardStack = ({ courses, activeIndex, setActiveIndex }) => {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.set(cardsRef.current, {
      x: (i) => i * 20,
      y: (i) => -i * 20,
      scale: (i) => 1 - i * 0.05,
      zIndex: (i) => courses.length - i,
    });
  }, [courses.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % courses.length);
    gsap.to(cardsRef.current, {
      x: (i) => i * 20,
      y: (i) => -i * 20,
      scale: (i) => 1 - i * 0.05,
      duration: 0.5,
    });
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? courses.length - 1 : prev - 1
    );
    gsap.to(cardsRef.current, {
      x: (i) => i * 20,
      y: (i) => -i * 20,
      scale: (i) => 1 - i * 0.05,
      duration: 0.5,
    });
  };

  return (
    <div className="relative w-[320px] h-[440px]">
      {courses.map((course, i) => (
        <div
          key={course.id}
          ref={(el) => (cardsRef.current[i] = el)}
          className={`absolute w-full h-full bg-white p-4 rounded-xl shadow-xl cursor-pointer transition-all duration-300`}
          style={{
            opacity: i === activeIndex ? 1 : 0.6,
          }}
        >
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-blue-700 font-semibold text-lg">
            {course.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {course.description}
          </p>
          <div className="mt-3 text-green-600 font-bold">₹{course.price}</div>
        </div>
      ))}

      <div className="flex justify-between mt-5 gap-4 absolute -bottom-16 left-0 w-full">
        <button
          onClick={handlePrev}
          className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold shadow"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold shadow"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardStack;
