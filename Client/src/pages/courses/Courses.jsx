import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // 👈 added
import CourseCard from "../../components/course/CourseCard";
import SpotlightCard from "../../components/animations/SpotlightCard";
import CategoryFilter from "../../components/course/CategoryFilter";
import GradientText from "../../components/animations/GradientText";
import BlurText from "../../components/animations/BlurText";
import { useCourses } from "../../hooks/useCourses";
import Loader from "../../components/common/Loader";

const Courses = () => {
  const location = useLocation(); // 👈
  const queryParams = new URLSearchParams(location.search);
  const urlCategory = queryParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const { courses, coursesLoading, fetchAllCourses } = useCourses();

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [urlCategory]);

  const categories =
    courses && courses.length > 0
      ? ["All", ...new Set(courses.map((course) => course.category))]
      : [
          "All",
          "Web Development",
          "Data Science",
          "Design",
          "Mobile Development",
        ];

  const normalize = (str) => str?.toLowerCase().replace(/\s+/g, "").trim();

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses?.filter(
          (course) => normalize(course.category) === normalize(selectedCategory)
        );

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-16 bg-gray-100">
      {/* Heading */}
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
        <div className="md:col-span-1">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesLoading ? (
            <div className="col-span-full flex justify-center items-center h-64">
              <Loader />
            </div>
          ) : filteredCourses && filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <SpotlightCard
                key={course._id || course.id}
                spotlightColor="rgba(0, 229, 255, 0.2)"
                className="h-full"
              >
                <CourseCard course={course} />
              </SpotlightCard>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-gray-600">
                No courses available in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
