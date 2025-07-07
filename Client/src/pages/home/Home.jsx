import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center mt-20 px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-4">
        🎓 Welcome to CourseSelling
      </h1>
      <p className="text-gray-600 mb-8 text-lg">
        Explore top online courses and boost your skills with expert instructors.
      </p>

      <Link
        to="/courses"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg font-semibold"
      >
        Browse Courses
      </Link>
    </div>
  );
};

export default Home;
