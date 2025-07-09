
import { useState } from 'react';
import axios from '../../api/axios';
import { FiSend } from 'react-icons/fi';

const imageURL = 'https://cdn.pixabay.com/photo/2025/06/11/22/12/kackar-mountains-9655201_1280.jpg';

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
      await axios.post('/contact', form);
      setSuccess('✅ Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError('❌ Failed to send message. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-10"
      style={{
        backgroundImage: `url(${imageURL})`,
      }}
    >
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12 max-w-2xl w-full border border-gray-200">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-blue-700 flex items-center justify-center gap-2">
            <FiSend className="text-blue-500 text-4xl" />
            Contact Us
          </h2>
          <p className="text-gray-600 mt-2">We’d love to hear from you. Drop us a message!</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-800 transition-all duration-200"
          >
            Send Message
          </button>

          {success && <p className="text-green-600 font-medium text-center">{success}</p>}
          {error && <p className="text-red-600 font-medium text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
export default Contact;
