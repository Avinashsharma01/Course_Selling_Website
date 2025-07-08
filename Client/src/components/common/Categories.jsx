import { useNavigate } from "react-router-dom";
import ProfileCard from "../animations/ProfileCard";
import RotatingText from "../animations/RotatingText"; // 👈 NEW

const categories = [
  {
    id: 1,
    name: "Web Development",
    handle: "web-dev",
    desc: "Build responsive websites using React, HTML, CSS.",
    avatar: "/images/web-dev.jpg",
  },
  {
    id: 2,
    name: "Cyber Security",
    handle: "cyber-sec",
    desc: "Learn ethical hacking, pen testing, and security.",
    avatar: "/images/cyber.jpg",
  },
  {
    id: 3,
    name: "Data Science",
    handle: "data-science",
    desc: "Master Python, visualization & machine learning.",
    avatar: "/images/data.jpg",
  },
  {
    id: 4,
    name: "AI & ML",
    handle: "ai-ml",
    desc: "Explore deep learning and real-world AI projects.",
    avatar: "/images/ai.jpg",
  },
  {
    id: 5,
    name: "Mobile App Dev",
    handle: "mobile-dev",
    desc: "Create apps with Flutter & React Native.",
    avatar: "/images/mobile.jpg",
  },
  {
    id: 6,
    name: "Ethical Hacking",
    handle: "hacking",
    desc: "Simulate attack vectors & secure systems.",
    avatar: "/images/hacking.jpg",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen py-24 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* 👇 Replaced Heading */}
        <h2 className="text-4xl font-bold text-blue-900 mb-8 flex items-center justify-center gap-2 flex-wrap">
  Top Learning Categories in{" "}
  <RotatingText
    texts={["Creative", "Design", "Development", "Marketing"]}
    mainClassName="inline-block text-pink-600"
    staggerFrom="last"
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    exit={{ y: "-120%" }}
    staggerDuration={0.02}
    splitLevelClassName="overflow-hidden"
    transition={{ type: "spring", damping: 30, stiffness: 400 }}
    rotationInterval={2000}
  />
</h2>

        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-14">
          Explore fields you’re passionate about and start learning.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {categories.map((cat) => (
            <ProfileCard
              key={cat.id}
              name={cat.name}
              title={cat.desc}
              avatarUrl={cat.avatar}
              miniAvatarUrl={cat.avatar}
              handle={cat.handle}
              contactText="Explore"
              status="Click to View"
              enableTilt={true}
              onContactClick={() =>
                navigate(`/courses?category=${encodeURIComponent(cat.name)}`)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
