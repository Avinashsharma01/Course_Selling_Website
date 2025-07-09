/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
    FiSend,
    FiMail,
    FiUser,
    FiMessageSquare,
    FiPhone,
    FiMapPin,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import contactService from "../../api/services/contactService";
import { useToast } from "../../hooks/useToast";
import useAuth from "../../hooks/useAuth";

// Modern hero image for contact page
const heroImageURL =
    "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80";

const Contact = () => {
    const { showToast } = useToast();
    const { user, isAuthenticated } = useAuth();
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Pre-fill form with user data when available
    useEffect(() => {
        if (user) {
            setForm((prev) => ({
                ...prev,
                name: user.name || "",
                email: user.email || "",
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        // Only allow changes to the message field if user is authenticated
        if (!isAuthenticated || e.target.name === "message") {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            showToast("Please fill in all fields", "error");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            showToast("Please enter a valid email address", "error");
            return;
        }

        setIsSubmitting(true);

        try {
            await contactService.submitContactForm(form);
            setIsSuccess(true);
            showToast(
                "Message sent successfully! We'll get back to you soon.",
                "success"
            );

            // Only clear the message field, keep the name and email if user is authenticated
            setForm((prev) => ({ ...prev, message: "" }));

            // Reset success state after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err) {
            showToast(
                typeof err === "string"
                    ? err
                    : "Failed to send message. Please try again later.",
                "error"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Hero section */}
            <div
                className="relative h-64 md:h-80 bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImageURL})`,
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center text-white p-4"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Contact Us
                    </h1>
                    <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                        Have questions? We're here to help and would love to
                        hear from you!
                    </p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                    >
                        <motion.div variants={itemVariants} className="mb-8">
                            <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                                <FiSend className="text-blue-500" />
                                Send Us a Message
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Fill out the form below and we'll get back to
                                you as soon as possible.
                            </p>
                        </motion.div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <motion.div
                                variants={itemVariants}
                                className="relative"
                            >
                                <div className="flex items-center absolute left-3 top-3 text-gray-500">
                                    <FiUser />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={
                                        isAuthenticated ? "" : "Your Name"
                                    }
                                    value={form.name}
                                    onChange={handleChange}
                                    className={`w-full p-3 pl-10 border ${
                                        isAuthenticated
                                            ? "bg-gray-50 text-gray-700"
                                            : "bg-white"
                                    } border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                                    required
                                    readOnly={isAuthenticated}
                                />
                                {isAuthenticated && (
                                    <span className="text-xs text-blue-600 absolute right-3 top-3">
                                        Using your account information
                                    </span>
                                )}
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="relative"
                            >
                                <div className="flex items-center absolute left-3 top-3 text-gray-500">
                                    <FiMail />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={
                                        isAuthenticated ? "" : "Your Email"
                                    }
                                    value={form.email}
                                    onChange={handleChange}
                                    className={`w-full p-3 pl-10 border ${
                                        isAuthenticated
                                            ? "bg-gray-50 text-gray-700"
                                            : "bg-white"
                                    } border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                                    required
                                    readOnly={isAuthenticated}
                                />
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="relative"
                            >
                                <div className="flex items-center absolute left-3 top-3 text-gray-500">
                                    <FiMessageSquare />
                                </div>
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={form.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </motion.div>

                            <motion.button
                                variants={itemVariants}
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold
                                    transition-all duration-200 flex items-center justify-center gap-2
                                    ${
                                        isSubmitting
                                            ? "opacity-70 cursor-not-allowed"
                                            : "hover:from-blue-600 hover:to-blue-800 hover:shadow-lg"
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center">
                                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                                        Sending...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <FiSend />
                                        Send Message
                                    </div>
                                )}
                            </motion.button>

                            <AnimatePresence>
                                {isSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-green-100 text-green-700 p-3 rounded-lg text-center"
                                    >
                                        Your message has been sent successfully!
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>
                    {/* Contact Information */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-blue-700 text-white rounded-2xl shadow-xl p-8 flex flex-col justify-between"
                    >
                        <div>
                            <motion.h2
                                variants={itemVariants}
                                className="text-2xl font-bold mb-6"
                            >
                                Get in Touch
                            </motion.h2>

                            <motion.div
                                variants={itemVariants}
                                className="mb-8"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-blue-600 p-3 rounded-full">
                                        <FiMail className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            Email Us
                                        </h3>
                                        <p className="text-blue-100">
                                            support@learnonline.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-blue-600 p-3 rounded-full">
                                        <FiPhone className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            Call Us
                                        </h3>
                                        <p className="text-blue-100">
                                            +1 (555) 123-4567
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-600 p-3 rounded-full">
                                        <FiMapPin className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            Visit Us
                                        </h3>
                                        <p className="text-blue-100">
                                            123 Education Ave, Learning City
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            variants={itemVariants}
                            className="bg-blue-800 p-6 rounded-xl mt-4"
                        >
                            <h3 className="text-xl font-bold mb-2">
                                Our Office Hours
                            </h3>
                            <p className="mb-1">
                                Monday - Friday: 9:00 AM - 6:00 PM
                            </p>
                            <p>Saturday: 10:00 AM - 2:00 PM</p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-16"
                >
                    <h2 className="text-2xl font-bold text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="font-bold text-lg text-blue-700 mb-2">
                                How quickly will you respond to my inquiry?
                            </h3>
                            <p className="text-gray-600">
                                We aim to respond to all inquiries within 24-48
                                hours during business days.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="font-bold text-lg text-blue-700 mb-2">
                                Do you offer refunds for courses?
                            </h3>
                            <p className="text-gray-600">
                                Yes, we offer a 30-day money-back guarantee if
                                you're not satisfied with your course purchase.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="font-bold text-lg text-blue-700 mb-2">
                                Can I upgrade my course package?
                            </h3>
                            <p className="text-gray-600">
                                Absolutely! You can upgrade your course package
                                at any time by contacting our support team.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="font-bold text-lg text-blue-700 mb-2">
                                How do I become an instructor?
                            </h3>
                            <p className="text-gray-600">
                                Please use this contact form with the subject
                                "Becoming an Instructor" and we'll send you all
                                the details.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
