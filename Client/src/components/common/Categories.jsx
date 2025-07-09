import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../animations/ProfileCard";
import RotatingText from "../animations/RotatingText";
import { useCourses } from "../../hooks/useCourses";
import Loader from "./Loader";

const Categories = () => {
    const navigate = useNavigate();
    const { courseCategories, categoriesLoading, fetchCourseCategories } =
        useCourses();
    const [categories, setCategories] = useState([]);
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

    // Transform categories into display items
    useEffect(() => {
        if (courseCategories && courseCategories.length > 0) {
            // Convert the category strings into richer objects with image and description
            const categoryItems = courseCategories
                .slice(0, 3)
                .map((category) => ({
                    name: category,
                    desc: `Explore courses in ${category}`,
                    avatar: "https://cdn.pixabay.com/photo/2025/06/11/22/12/kackar-mountains-9655201_1280.jpg",
                }));
            setCategories(categoryItems);
        }
    }, [courseCategories]);

    return (
        <section className="min-h-screen py-24 bg-gradient-to-b from-slate-50 to-slate-100">
            <div className="max-w-7xl mx-auto px-4 text-center">
                {/* 👇 Replaced Heading */}
                <h2 className="text-4xl font-bold text-blue-900 mb-8 flex items-center justify-center gap-2 flex-wrap">
                    Top Learning Categories in{" "}
                    <RotatingText
                        texts={[
                            "Creative",
                            "Design",
                            "Development",
                            "Marketing",
                        ]}
                        mainClassName="inline-block text-pink-600"
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
                    Explore fields you're passionate about and start learning.
                </p>

                {categoriesLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                ) : categories.length > 0 ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {categories.map((cat, index) => (
                            <ProfileCard
                                key={cat.name || index}
                                name={cat.name}
                                title={cat.desc}
                                avatarUrl={cat.avatar}
                                miniAvatarUrl={cat.avatar}
                                handle={cat.handle}
                                contactText="Explore"
                                status="Click to View"
                                enableTilt={true}
                                onContactClick={() =>
                                    navigate(
                                        `/courses?category=${encodeURIComponent(
                                            cat.name
                                        )}`
                                    )
                                }
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600">
                            No categories available right now.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Categories;
