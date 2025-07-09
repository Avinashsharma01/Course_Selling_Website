import React, { useState, useEffect } from "react";
import { useCourses } from "../../hooks/useCourses";
import CardSwap from "../../components/animations/CardSwap";
import Loader from "../../components/common/Loader";

const AnimatedCourses = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { featuredCourses, featuredCoursesLoading, fetchFeaturedCourses } =
        useCourses();

    useEffect(() => {
        fetchFeaturedCourses();
    }, [fetchFeaturedCourses]);

    if (featuredCoursesLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-900">
                <Loader />
            </div>
        );
    }

    if (!featuredCourses || featuredCourses.length === 0) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
                <p className="text-xl">No courses available</p>
            </div>
        );
    }

    const activeCourse = featuredCourses[activeIndex];

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center transition-all duration-500 ease-in-out"
            style={{
                backgroundImage: `url(${activeCourse.image})`,
            }}
        >
            <div className="bg-black bg-opacity-60 min-h-screen px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
                {/* LEFT SECTION: Course Text */}
                <div className="text-white max-w-xl space-y-4">
                    <h1 className="text-4xl font-bold">{activeCourse.title}</h1>
                    <p className="text-lg">{activeCourse.description}</p>
                    <div className="space-y-2">
                        <p>
                            <strong>Instructor:</strong>{" "}
                            {activeCourse.instructor}
                        </p>
                        <p>
                            <strong>Level:</strong> {activeCourse.level}
                        </p>
                        <p>
                            <strong>Price:</strong> ₹{activeCourse.price}
                        </p>
                        <p>
                            <strong>Duration:</strong> {activeCourse.duration}
                        </p>
                    </div>
                </div>

                {/* RIGHT SECTION: Animated Stack */}
                <div className="w-full md:w-1/2">
                    <CardSwap
                        courses={featuredCourses}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    />
                </div>
            </div>
        </div>
    );
};

export default AnimatedCourses;
