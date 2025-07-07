import { Link } from 'react-router-dom';
import HeroCarousel from '../../components/common/HeroCarousel';
import FeaturedCourses from '../../components/common/FeaturedCourses';
import WhyChooseUs from '../../components/common/WhyChooseUs';
import Categories from '../../components/common/Categories';

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <FeaturedCourses />
      <WhyChooseUs />
      <Categories />
    </div>
  );
};

export default Home;
