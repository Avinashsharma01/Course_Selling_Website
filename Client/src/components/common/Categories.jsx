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
            // Category-specific images mapping
            const categoryImageMap = {
                Business: [
                    "https://plus.unsplash.com/premium_photo-1683133974170-762dc561d292?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVzc2luZXNzfGVufDB8fDB8fHww",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnVzaW5lc3N8ZW58MHx8MHx8fDA%3D",
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVzaW5lc3N8ZW58MHx8MHx8fDA%3D",
                ],
                Design: [
                    "https://plus.unsplash.com/premium_photo-1661770132071-026114fffb61?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGVzaWdufGVufDB8fDB8fHww",
                    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzaWdufGVufDB8fDB8fHww",
                    "https://images.unsplash.com/photo-1609921141835-710b7fa6e438?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGVzaWdufGVufDB8fDB8fHww",
                ],
                Marketing: [
                    "https://images.unsplash.com/photo-1562577308-9e66f0c65ce5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFya2V0aW5nfGVufDB8fDB8fHww",
                    "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFya2V0aW5nfGVufDB8fDB8fHww",
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFya2V0aW5nfGVufDB8fDB8fHww",
                ],
                Development: [
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
                    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
                ],
                Technology: [
                    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
                    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
                    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
                ],
                Photography: [
                    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D",
                    "https://images.unsplash.com/photo-1554048612-b6ebae92138f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D",
                    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D",
                ],
            };

            // Default fallback images
            const defaultImages = [
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWR1Y2F0aW9ufGVufDB8fDB8fHww",
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww",
                "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww",
            ];

            // Convert the category strings into richer objects with category-specific images
            const categoryItems = courseCategories
                .slice(0, 3)
                .map((category) => ({
                    name: category,
                    desc: `Explore courses in ${category}`,
                    avatar: categoryImageMap[category] || defaultImages,
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
