import { useState } from "react";
import axios from "../../api/axios"; // Adjust path if needed

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        try {
            await axios.post("/contact", form); // Assuming your endpoint is `/api/contact`
            setSuccess("Message sent successfully!");
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            setError("Failed to send message. Try again later.", err);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">📩 Contact Us</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border p-2 rounded"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Send Message
                </button>

                {success && <p className="text-green-600">{success}</p>}
                {error && <p className="text-red-600">{error}</p>}
            </form>
        </div>
    );
};

export default Contact;
