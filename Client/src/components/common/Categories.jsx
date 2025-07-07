import { motion } from 'framer-motion';
import { Globe, ShieldCheck, BarChart4, Bot, Smartphone, Laptop2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Web Development',
    icon: <Globe size={40} />,
    color: 'from-blue-100 to-blue-200 text-blue-800',
  },
  {
    id: 2,
    name: 'Cyber Security',
    icon: <ShieldCheck size={40} />,
    color: 'from-green-100 to-green-200 text-green-800',
  },
  {
    id: 3,
    name: 'Data Science',
    icon: <BarChart4 size={40} />,
    color: 'from-yellow-100 to-yellow-200 text-yellow-800',
  },
  {
    id: 4,
    name: 'AI & ML',
    icon: <Bot size={40} />,
    color: 'from-purple-100 to-purple-200 text-purple-800',
  },
  {
    id: 5,
    name: 'Mobile App Dev',
    icon: <Smartphone size={40} />,
    color: 'from-pink-100 to-pink-200 text-pink-800',
  },
  {
    id: 6,
    name: 'Ethical Hacking',
    icon: <Laptop2 size={40} />,
    color: 'from-red-100 to-red-200 text-red-800',
  },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-green-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-12">
          📚 Course Categories
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => navigate(`/courses?category=${encodeURIComponent(cat.name)}`)}
              className={`bg-gradient-to-br ${cat.color} p-8 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.03] transition-all cursor-pointer`}
            >
              <div className="mb-4 flex justify-center">{cat.icon}</div>
              <h3 className="text-xl font-semibold">{cat.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
