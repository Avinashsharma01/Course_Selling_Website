import { Link } from "react-router-dom";
import {
    Mail,
    Phone,
    Facebook,
    Instagram,
    Twitter,
    MapPin,
    Heart,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            </div>

            <div className="relative py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {/* Branding */}
                        <div className="md:col-span-2">
                            <div className="group cursor-pointer mb-6">
                                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-cyan-300 transition-all duration-300">
                                    🎓 Learnify
                                </h3>
                                <p className="text-slate-300 leading-relaxed max-w-md group-hover:text-white transition-colors duration-300">
                                    Empower your career with high-quality,
                                    affordable courses. Join thousands of
                                    learners who have transformed their lives
                                    through our platform.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-8">
                                <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                                    <div className="text-2xl font-bold text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                                        50K+
                                    </div>
                                    <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                                        Students
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                                    <div className="text-2xl font-bold text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                                        200+
                                    </div>
                                    <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                                        Courses
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                                    <div className="text-2xl font-bold text-purple-400 group-hover:scale-110 transition-transform duration-300">
                                        95%
                                    </div>
                                    <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                                        Success Rate
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-xl font-semibold mb-6 text-emerald-400 relative">
                                Quick Links
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></div>
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    { to: "/", label: "Home" },
                                    { to: "/courses", label: "Courses" },
                                    { to: "/about", label: "About Us" },
                                    { to: "/contact", label: "Contact" },
                                    { to: "/login", label: "Login" },
                                    { to: "/register", label: "Register" },
                                    {
                                        to: "/privacy-policy",
                                        label: "Privacy Policy",
                                    },
                                ].map((link, index) => (
                                    <li
                                        key={index}
                                        className="transform transition-all duration-300 hover:translate-x-2"
                                    >
                                        <Link
                                            to={link.to}
                                            className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group"
                                        >
                                            <span className="w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-4"></span>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-xl font-semibold mb-6 text-cyan-400">
                                Contact Us
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300 group">
                                    <div className="p-2 bg-white/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors duration-300">
                                        <Mail
                                            size={18}
                                            className="group-hover:text-emerald-400 transition-colors duration-300"
                                        />
                                    </div>
                                    <span className="text-sm">
                                        support@Learnify.com
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300 group">
                                    <div className="p-2 bg-white/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors duration-300">
                                        <Phone
                                            size={18}
                                            className="group-hover:text-cyan-400 transition-colors duration-300"
                                        />
                                    </div>
                                    <span className="text-sm">
                                        +91 1234567890
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300 group">
                                    <div className="p-2 bg-white/10 rounded-lg group-hover:bg-purple-500/20 transition-colors duration-300">
                                        <MapPin
                                            size={18}
                                            className="group-hover:text-purple-400 transition-colors duration-300"
                                        />
                                    </div>
                                    <span className="text-sm">
                                        Uttar Pradesh, India
                                    </span>
                                </li>
                            </ul>

                            {/* Social Media */}
                            <div className="mt-8">
                                <h5 className="text-lg font-medium mb-4 text-slate-300">
                                    Follow Us
                                </h5>
                                <div className="flex gap-4">
                                    {[
                                        {
                                            Icon: Facebook,
                                            color: "hover:bg-blue-600",
                                            hoverColor: "hover:text-blue-400",
                                        },
                                        {
                                            Icon: Instagram,
                                            color: "hover:bg-pink-600",
                                            hoverColor: "hover:text-pink-400",
                                        },
                                        {
                                            Icon: Twitter,
                                            color: "hover:bg-sky-600",
                                            hoverColor: "hover:text-sky-400",
                                        },
                                    ].map(
                                        (
                                            { Icon, color, hoverColor },
                                            index
                                        ) => {
                                            // Icon is used as a React component in the JSX below
                                            const IconComponent = Icon;
                                            return (
                                                <div
                                                    key={index}
                                                    className={`p-3 bg-white/10 rounded-lg cursor-pointer transition-all duration-300 ${color} ${hoverColor} hover:scale-110 hover:shadow-lg group`}
                                                >
                                                    <IconComponent
                                                        size={20}
                                                        className="transition-transform duration-300 group-hover:rotate-12"
                                                    />
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-slate-400 text-sm flex items-center gap-2">
                            © {new Date().getFullYear()} Learnify. Made with
                            <Heart
                                size={16}
                                className="text-red-500 animate-pulse"
                            />
                            in India. All rights reserved.
                        </div>
                        <div className="flex gap-6 text-sm">
                            <Link
                                to="/terms"
                                className="text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                to="/privacy"
                                className="text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/support"
                                className="text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                            >
                                Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
