// src/api/dummyCourses.js

const imageURL = 'https://cdn.pixabay.com/photo/2025/06/11/22/12/kackar-mountains-9655201_1280.jpg';

export const dummyCourses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    description: "Learn to build modern web applications using React, Node.js, and MongoDB.",
    price: 1499,
    image: imageURL,
    category: "Web Development",
    instructor: "John Smith",
    duration: 12,
    level: "Intermediate",
    topics: ["HTML & CSS", "JavaScript", "React", "Node.js", "MongoDB", "Deployment"]
  },
  {
    id: 2,
    title: "Data Science with Python",
    description: "Master data analysis, visualization, and machine learning using Python.",
    price: 1299,
    image: imageURL,
    category: "Data Science",
    instructor: "Jane Doe",
    duration: 10,
    level: "Advanced",
    topics: ["Python Basics", "Data Analysis", "Machine Learning", "Visualization", "Pandas", "NumPy"]
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    description: "Understand the basics of user interface and user experience design.",
    price: 999,
    image: imageURL,
    category: "Design",
    instructor: "Emily Clark",
    duration: 8,
    level: "Beginner",
    topics: ["UI Principles", "UX Research", "Wireframing", "Prototyping", "Figma", "User Testing"]
  },
  {
    id: 4,
    title: "Android App Development",
    description: "Build native Android apps using Kotlin and Android Studio.",
    price: 1199,
    image: imageURL,
    category: "Mobile Development",
    instructor: "Michael Lee",
    duration: 9,
    level: "Intermediate",
    topics: ["Kotlin Basics", "Android Studio", "UI Components", "APIs", "Firebase", "Publishing"]
  },
  {
    id: 5,
    title: "Digital Marketing Essentials",
    description: "Learn SEO, SEM, social media, and email marketing strategies.",
    price: 899,
    image: imageURL,
    category: "Marketing",
    instructor: "Sara Patel",
    duration: 7,
    level: "Beginner",
    topics: ["SEO", "SEM", "Social Media", "Email Marketing", "Analytics", "Content Strategy"]
  },
  {
    id: 6,
    title: "Cloud Computing with AWS",
    description: "Get hands-on with AWS services and cloud architecture.",
    price: 1399,
    image: imageURL,
    category: "Cloud Computing",
    instructor: "David Kim",
    duration: 11,
    level: "Advanced",
    topics: ["AWS Basics", "EC2", "S3", "Lambda", "IAM", "Cloud Architecture"]
  },
  {
    id: 7,
    title: "Cybersecurity Fundamentals",
    description: "Protect systems and data with essential cybersecurity skills.",
    price: 1099,
    image: imageURL,
    category: "Security",
    instructor: "Olivia Brown",
    duration: 8,
    level: "Intermediate",
    topics: ["Network Security", "Encryption", "Threat Analysis", "Firewalls", "Ethical Hacking", "Best Practices"]
  },
  {
    id: 8,
    title: "Machine Learning Crash Course",
    description: "A fast-paced introduction to machine learning concepts and tools.",
    price: 1599,
    image: imageURL,
    category: "Artificial Intelligence",
    instructor: "Alex Turner",
    duration: 10,
    level: "Advanced",
    topics: ["Supervised Learning", "Unsupervised Learning", "Scikit-learn", "Model Evaluation", "Neural Networks", "Projects"]
  }
];
