import { dummyCourses } from "../../api/dummyCourses";
import CourseCard from "../../components/course/CourseCard";
import BlurText from "../../components/animations/BlurText";

const Courses = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-16 bg-gray-50">
      {/* Heading */}
      <div className="text-center mb-12">
        <BlurText
          text="All Courses"
          delay={100}
          animateBy="words"
          direction="top"
          className="text-4xl font-bold text-black"
        />
        <p className="text-gray-600 mt-2">
          Explore different courses to build your skills and boost your career.
        </p>
      </div>

      {/* Grid of Courses */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dummyCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
