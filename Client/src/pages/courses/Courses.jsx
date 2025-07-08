import CourseCard from '../../components/course/CourseCard';
import { dummyCourses } from '../../api/dummyCourses';
const Courses = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
