// src/components/common/Categories.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../animations/ProfileCard";
import RotatingText from "../animations/RotatingText";
import { useCourses } from "../../hooks/useCourses";
import Loader from "./Loader";

// ✅ Import your local images
import businessImg from "../../assets/categoryimage/business.jpg";
import webDevImg from "../../assets/categoryimage/web.jpg";
import designImg from "../../assets/categoryimage/design.jpg";

const Categories = () => {
  const navigate = useNavigate();
  const { courseCategories, categoriesLoading, fetchCourseCategories } = useCourses();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      if (!hasLoaded) {
        try {
          await fetchCourseCategories();
          if (isMounted) {
            setHasLoaded(true);
          }
        } catch (err) {
          console.error("Error loading categories:", err);
        }
      }
    };

    loadCategories();
    return () => {
      isMounted = false;
    };
  }, [fetchCourseCategories, hasLoaded]);

  // Load top 3 categories with separate local images
  useEffect(() => {
    if (courseCategories && courseCategories.length > 0) {
      const topCategories = [
        {
          name: "Business",
          desc: "Explore top courses in Business",
          avatar: businessImg,
        },
        {
          name: "Web Development",
          desc: "Explore top courses in Web Development",
          avatar: webDevImg,
        },
        {
          name: "Design",
          desc: "Explore top courses in Design",
          avatar: designImg,
        },
      ];
      setSelectedCategories(topCategories);
    }
  }, [courseCategories]);

  return (
    <section className="min-h-screen py-24 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-blue-900 mb-8 flex items-center justify-center gap-2 flex-wrap">
          Top Learning Categories in{" "}
          <RotatingText
            texts={["Business", "Web Development", "Design"]}
            mainClassName="inline-block text-green-600"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.02}
            splitLevelClassName="overflow-hidden"
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 400,
            }}
            rotationInterval={2000}
          />
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-14">
          Choose a path and explore top-rated learning opportunities in your favorite field.
        </p>

        {categoriesLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {selectedCategories.map((cat, index) => (
              <ProfileCard
                key={cat.name || index}
                name={cat.name}
                title={cat.desc}
                avatarUrl={cat.avatar}
                miniAvatarUrl={cat.avatar}
                handle={cat.name}
                contactText="Explore"
                status="Click to View"
                enableTilt={true}
                onContactClick={() =>
                  navigate(`/courses?category=${encodeURIComponent(cat.name)}`)
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
