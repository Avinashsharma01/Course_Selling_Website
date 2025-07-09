/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
    {
        title: "Master New Skills Online",
        subtitle: "Access 100+ expert-led courses anytime, anywhere.",
        image: "https://cdn.pixabay.com/photo/2025/06/11/22/12/kackar-mountains-9655201_1280.jpg",
    },
    {
        title: "Upskill for Your Dream Job",
        subtitle: "Courses built for real-world careers and success.",
        image: "https://cdn.pixabay.com/photo/2025/06/16/11/04/utah-9663013_1280.jpg",
    },
    {
        title: "Learn at Your Own Pace",
        subtitle: "Flexible learning designed just for you.",
        image: "https://cdn.pixabay.com/photo/2025/03/31/21/30/italy-9505449_1280.jpg",
    },
];

const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative overflow-hidden h-[70vh] md:h-[95vh]">
            {/* Background Image */}
            <img
                src={slides[current].image}
                alt={slides[current].title}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Animated Slide Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-32 md:pt-44  mt-24"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow mb-4">
                        {slides[current].title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 mb-8">
                        {slides[current].subtitle}
                    </p>
                    <Link
                        to="/courses"
                        className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-100 transition"
                    >
                        Explore Courses
                    </Link>
                </motion.div>
            </AnimatePresence>

            {/* Slide Indicator Dots */}
            <div className="absolute bottom-5 flex gap-2 justify-center w-full z-10">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === current ? "bg-white" : "bg-white/50"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroCarousel;
