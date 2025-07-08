const features = [
  {
    title: 'Certified Instructors',
    icon: '🎓',
    desc: 'Learn from industry experts and professors who bring real-world experience into every lesson.',
  },
  {
    title: 'Flexible Learning',
    icon: '🕒',
    desc: 'Access high-quality course content anytime, anywhere — learn at your pace.',
  },
  {
    title: 'Affordable Pricing',
    icon: '💰',
    desc: 'Professional-level education that fits within your budget. No hidden fees.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-green-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-12">💡 Why Choose Us?</h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition border-t-4 border-green-400 hover:border-blue-600 group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-green-500 text-white flex items-center justify-center text-3xl shadow-md transform group-hover:scale-110 transition">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-blue-700 group-hover:text-green-600 transition mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
