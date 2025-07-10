/* eslint-disable no-unused-vars */
// File: Client/src/pages/privacyPolicy/privacy-Policy.jsx
import React from "react";
import { motion } from "framer-motion";
import introImg from "../../assets/s12.jpg";
import contactImg from "../../assets/s22.jpg";
import "./privacy-Policy.css";

const sections = [
    {
        title: "1. Introduction",
        desc: "Welcome to CourseSelling! Your privacy matters to us. This page explains how we collect, use, and protect your personal data when using our platform.",
    },
    {
        title: "2. Information We Collect",
        list: [
            "Name, email, phone number",
            "Payment details (secured via third-party)",
            "Course progress and activity logs",
            "Device/browser information",
        ],
    },
    {
        title: "3. How We Use Data",
        list: [
            "Deliver and improve our course experience",
            "Send important updates & offers",
            "Ensure security and fraud prevention",
            "Comply with legal obligations",
        ],
    },
    {
        title: "4. Your Rights",
        list: [
            "Access or update your account details",
            "Request deletion of your account",
            "Control marketing communication preferences",
        ],
    },
];

const PrivacyPolicy = () => {
    return (
        <div className="privacy-wrapper">
            {/* Hero Section */}
            <div className="privacy-hero">
                <img src={introImg} alt="privacy" className="hero-img" />
                <div className="overlay">
                    <motion.h1
                        className="heading"
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        🔐 Privacy Policy
                    </motion.h1>
                    <p className="subtext">Effective Date: July 8, 2025</p>
                </div>
            </div>

            {/* Sections */}
            {sections.map((sec, idx) => (
                <motion.section
                    key={idx}
                    className={`privacy-section ${
                        idx % 2 !== 0 ? "colored" : ""
                    }`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                    <h2>{sec.title}</h2>
                    {sec.desc && <p>{sec.desc}</p>}
                    {sec.list && (
                        <ul>
                            {sec.list.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    )}
                </motion.section>
            ))}

            {/* Footer */}
            {/* <footer className="privacy-footer">
        <p>© {new Date().getFullYear()} CourseSelling. All rights reserved.</p>
      </footer> */}
        </div>
    );
};

export default PrivacyPolicy;
