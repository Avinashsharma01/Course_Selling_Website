import { useState } from "react";
import { dummyCourses } from "../../api/dummyCourses";
import CourseCard from "../../components/course/CourseCard";
import SpotlightCard from "../../components/animations/SpotlightCard";
import CategoryFilter from "../../components/course/CategoryFilter";
import GradientText from "../../components/animations/GradientText";
import BlurText from "../../components/animations/BlurText";

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "Web Development",
    "Data Science",
    "Design",
    "Mobile Development",
    "Marketing",
    "Cloud Computing",
    "Security",
    "Artificial Intelligence",
  ];

  const filteredCourses =
    selectedCategory === "All"
      ? dummyCourses
      : dummyCourses.filter((course) => course.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-16 bg-gray-100">
      {/* Centered Heading */}
      <div className="flex flex-col items-center justify-center text-center mb-10 space-y-3">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={6}
          className="text-4xl md:text-5xl font-bold"
        >
          All Courses
        </GradientText>

        <BlurText
          text="Explore different courses to build your skills and boost your career."
          delay={150}
          animateBy="words"
          direction="top"
          className="text-black text-lg font-medium !text-center !justify-center"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Sidebar - Category Filter */}
        <div className="md:col-span-1">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Courses Grid */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <SpotlightCard
              key={course.id}
              spotlightColor="rgba(0, 229, 255, 0.2)"
              className="h-full"
            >
              <CourseCard course={course} />
            </SpotlightCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
