import { useState } from "react";
import { dummyCourses } from "../../api/dummyCourses";
import CourseCard from "../../components/course/CourseCard";
import CategoryFilter from "../../components/course/CategoryFilter";

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = Array.from(
    new Set(dummyCourses.map((c) => c.category))
  );

  const filteredCourses =
    selectedCategory === "All"
      ? dummyCourses
      : dummyCourses.filter((c) => c.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 px-4 md:px-16 pb-20">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">All Courses</h1>
        <p className="text-gray-600">
          Explore different courses to build your skills and boost your career.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Sidebar filter */}
        <div className="md:col-span-1">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Course Grid */}
        <div className="md:col-span-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
