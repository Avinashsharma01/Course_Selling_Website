import { motion } from 'framer-motion';
import {
  Globe,
  ShieldCheck,
  BarChart4,
  Bot,
  Smartphone,
  Laptop2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Web Development',
    icon: <Globe size={38} />,
    desc: 'Build responsive websites and web apps using HTML, CSS, JS, React & more.',
    color: 'from-blue-100 to-blue-200 text-blue-800',
  },
  {
    id: 2,
    name: 'Cyber Security',
    icon: <ShieldCheck size={38} />,
    desc: 'Learn ethical hacking, penetration testing, and secure app development.',
    color: 'from-green-100 to-green-200 text-green-800',
  },
  {
    id: 3,
    name: 'Data Science',
    icon: <BarChart4 size={38} />,
    desc: 'Master Python, data analysis, visualization & machine learning tools.',
    color: 'from-yellow-100 to-yellow-200 text-yellow-800',
  },
  {
    id: 4,
    name: 'AI & ML',
    icon: <Bot size={38} />,
    desc: 'Dive into deep learning, neural networks, and real-world AI projects.',
    color: 'from-purple-100 to-purple-200 text-purple-800',
  },
  {
    id: 5,
    name: 'Mobile App Dev',
    icon: <Smartphone size={38} />,
    desc: 'Create iOS/Android apps with Flutter, React Native, and Kotlin.',
    color: 'from-pink-100 to-pink-200 text-pink-800',
  },
  {
    id: 6,
    name: 'Ethical Hacking',
    icon: <Laptop2 size={38} />,
    desc: 'Explore penetration testing, red teaming, and real-time exploit scenarios.',
    color: 'from-red-100 to-red-200 text-red-800',
  },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen py-24 bg-gradient-to-b from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-blue-800 mb-6">
          📚 Explore Our Top Categories
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-14">
          Whether you're starting your journey or upskilling, choose a path that suits your goals.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() =>
                navigate(`/courses?category=${encodeURIComponent(cat.name)}`)
              }
              className={`bg-gradient-to-br ${cat.color} p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl hover:scale-[1.03] transition-transform group`}
            >
              <div className="flex justify-center mb-3">{cat.icon}</div>
              <h3 className="text-xl font-semibold group-hover:underline mb-2">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-700 group-hover:text-black transition">
                {cat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
