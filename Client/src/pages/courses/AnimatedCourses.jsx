import React, { useState } from "react";
import { dummyCourses } from "../../api/dummyCourses";

import CardSwap from "../../components/animations/CardSwap";

const AnimatedCourses = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCourse = dummyCourses[activeIndex];

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center transition-all duration-500 ease-in-out"
      style={{
        backgroundImage: `url(${activeCourse.image})`,
      }}
    >
      <div className="bg-black bg-opacity-60 min-h-screen px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* LEFT SECTION: Course Text */}
        <div className="text-white max-w-xl space-y-4">
          <h1 className="text-4xl font-bold">{activeCourse.title}</h1>
          <p className="text-lg">{activeCourse.description}</p>
          <div className="space-y-2">
            <p><strong>Instructor:</strong> {activeCourse.instructor}</p>
            <p><strong>Level:</strong> {activeCourse.level}</p>
            <p><strong>Price:</strong> ₹{activeCourse.price}</p>
            <p><strong>Duration:</strong> {activeCourse.duration}</p>
          </div>
        </div>

        {/* RIGHT SECTION: Animated Stack */}
        <div className="w-full md:w-1/2">
          <CardSwap
            courses={dummyCourses}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedCourses;
