/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import banner1 from "../../assets/banner/1.webp";
import banner2 from "../../assets/banner/2.webp";
import banner3 from "../../assets/banner/3.webp";

const slides = [
    {
        title: "🌞 Summer Skill Sale",
        subtitle:
            "Up to 50% off on trending courses. Enroll before the heat cools down!",
        image: banner1,
    },
    {
        title: "🚀 New Launch Alert",
        subtitle:
            "AI & Cyber Security learning tracks now live. Get certified today!",
        image: banner2,
    },
    {
        title: "💼 Pop-up Offer",
        subtitle: "Exclusive discounts & free resources | June 15–20 only!",
        image: banner3,
    },
];

const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 3000); // Change every 3 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative overflow-hidden h-[70vh] md:h-[95vh] rounded-md flex items-center justify-center">
            {/* Background Image */}
            <img
                src={slides[current].image}
                alt={slides[current].title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Animated Slide Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, x: -40, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 40, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="relative z-10 grid md:grid-cols-2 max-w-7xl mx-auto w-full px-6"
                >
                    {/* LEFT TEXT */}
                    <div className="text-left py-10 md:py-20 flex flex-col justify-center gap-6">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-xl">
                            <span className="bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent">
                                {slides[current].title}
                            </span>
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 font-medium drop-shadow-md max-w-md">
                            {slides[current].subtitle}
                        </p>
                        <Link
                            to="/courses"
                            className="inline-block bg-white text-blue-700 font-bold px-6 py-3 rounded-full shadow-md hover:shadow-xl hover:bg-blue-100 transition-all w-fit"
                        >
                            Explore Courses
                        </Link>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Slide Dots */}
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
