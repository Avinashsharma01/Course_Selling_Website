import { useState } from "react";
import { dummyCourses } from "../../api/dummyCourses";
import CourseCard from "../../components/course/CourseCard";
import CardSwap, { Card } from "../../components/animations/CardSwap";
import BlurText from "../../components/animations/BlurText";

const Courses = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCourse = dummyCourses[activeIndex];

  const handleFrontCardChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 md:px-16 overflow-hidden">
      {/* Dynamic Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out z-0"
        style={{
          backgroundImage: `url(${activeCourse.image})`,
          filter: "blur(8px) brightness(0.85)",
          transform: "scale(1.05)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-3">
          <BlurText
            text="All Courses"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-4xl font-bold text-black"
          />
          <BlurText
            text="Explore different courses to build your skills and boost your career."
            delay={50}
            animateBy="words"
            direction="top"
            className="text-gray-600"
          />
        </div>

        <div className="flex justify-center md:justify-end">
          <CardSwap
            width={340}
            height={270}
            cardDistance={55}
            verticalDistance={45}
            delay={5000}
            pauseOnHover={true}
            onFrontCardChange={handleFrontCardChange}
          >
            {dummyCourses.map((course) => (
              <Card key={course.id}>
                <CourseCard course={course} />
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </div>
  );
};

export default Courses;
