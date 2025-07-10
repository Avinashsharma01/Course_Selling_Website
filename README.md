# 🎓 Course Selling Platform

A full-stack modern course marketplace built with React.js, Node.js, Express.js, and MongoDB. This platform allows users to browse, enroll in courses, and provides comprehensive admin functionality for course management.

## 📋 Table of Contents

-   [🌟 Features](#-features)
-   [🛠️ Tech Stack](#️-tech-stack)
-   [🚀 Quick Start](#-quick-start)
-   [📁 Project Structure](#-project-structure)
-   [🔧 Installation & Setup](#-installation--setup)
-   [🌐 API Documentation](#-api-documentation)
-   [🎨 Frontend Documentation](#-frontend-documentation)
-   [🔐 Authentication & Authorization](#-authentication--authorization)
-   [📱 Screenshots](#-screenshots)
-   [🤝 Contributing](#-contributing)
-   [📄 License](#-license)

## 🌟 Features

### 🎯 User Features

-   **User Registration & Authentication** - Secure JWT-based authentication
-   **Course Browsing** - Browse courses with filtering and search functionality
-   **Course Enrollment** - Easy one-click enrollment in courses
-   **User Dashboard** - Personal dashboard to manage enrolled courses
-   **User Profile Management** - Update profile information and preferences
-   **Responsive Design** - Mobile-first responsive design with modern UI

### 👨‍💼 Admin Features

-   **Admin Dashboard** - Comprehensive admin panel with analytics
-   **Course Management** - Create, update, and delete courses
-   **User Management** - View and manage all users
-   **Course Analytics** - Track enrollment statistics and performance
-   **Admin Profile Management** - Manage admin profiles and permissions
-   **Super Admin Controls** - Super admin can manage other admins

### 🔧 Technical Features

-   **RESTful API** - Well-structured REST API with proper HTTP methods
-   **JWT Authentication** - Secure token-based authentication
-   **Input Validation** - Comprehensive validation on both frontend and backend
-   **Error Handling** - Centralized error handling with user-friendly messages
-   **Rate Limiting** - Protection against brute force attacks
-   **Security Headers** - Helmet.js for security headers
-   **CORS Configuration** - Proper cross-origin resource sharing setup

## 🌐 Live Demo

### 🚀 Production Deployment

-   **Backend API**: [https://course-selling-server-36u8.onrender.com/api](https://course-selling-server-36u8.onrender.com/api)
-   **Frontend**: _Coming soon - Deploy your frontend and add the link here_

### 🔗 API Endpoints

You can test the live API endpoints using tools like Postman or curl:

```bash
# Get all courses
curl https://course-selling-server-36u8.onrender.com/api/courses

# Get featured courses
curl https://course-selling-server-36u8.onrender.com/api/courses/featured

# Get course categories
curl https://course-selling-server-36u8.onrender.com/api/courses/categories
```

_Note: The backend is deployed on Render's free tier, so the first request might take a moment to wake up the server._

## 🛠️ Tech Stack

### Frontend

-   **React.js** - Modern JavaScript library for building user interfaces
-   **Vite** - Fast build tool and development server
-   **React Router DOM** - Client-side routing
-   **Tailwind CSS** - Utility-first CSS framework
-   **Axios** - HTTP client for API requests
-   **Context API** - State management for authentication and courses

### Backend

-   **Node.js** - JavaScript runtime for server-side development
-   **Express.js** - Web application framework
-   **MongoDB** - NoSQL database for data storage
-   **Mongoose** - MongoDB object modeling library
-   **JWT** - JSON Web Tokens for authentication
-   **bcrypt** - Password hashing library
-   **express-validator** - Input validation middleware

### DevOps & Tools

-   **ESLint** - Code linting and formatting
-   **Nodemon** - Development server auto-restart
-   **CORS** - Cross-origin resource sharing
-   **Helmet** - Security middleware
-   **Morgan** - HTTP request logger

## 🚀 Quick Start

### Prerequisites

-   Node.js (v18 or higher)
-   MongoDB (local or cloud instance)
-   npm or yarn package manager

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/course-selling-platform.git
    cd course-selling-platform
    ```

2. **Install dependencies**

    ```bash
    # Install backend dependencies
    cd Server
    npm install

    # Install frontend dependencies
    cd ../Client
    npm install
    ```

3. **Environment Setup**

    Create `.env` file in the `Server` directory:

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/course-selling
    JWT_SECRET=your_jwt_secret_here
    NODE_ENV=development
    ```

    Create `.env` file in the `Client` directory:

    ```env
    # For production (using deployed backend)
    VITE_API_BASE_URL=https://course-selling-server-36u8.onrender.com/api
    ```

    Or create `.env.local` for local development:

    ```env
    # For local development
    VITE_API_BASE_URL=http://localhost:3000/api
    ```

    ```env
    VITE_API_BASE_URL=http://localhost:3000/api
    ```

4. **Start the application**

    ```bash
    # Start backend server (from Server directory)
    npm start

    # Start frontend development server (from Client directory)
    npm run dev
    ```

5. **Access the application**
    - Frontend: `http://localhost:5173`
    - Backend API: `http://localhost:3000/api`

## 📁 Project Structure

```
course-selling-platform/
├── Client/                          # Frontend React application
│   ├── public/                      # Public assets
│   ├── src/
│   │   ├── api/                     # API services and configuration
│   │   │   ├── axios.js            # Axios configuration
│   │   │   └── services/           # API service functions
│   │   ├── components/             # Reusable React components
│   │   │   ├── animations/         # Animation components
│   │   │   ├── auth/              # Authentication components
│   │   │   ├── common/            # Common UI components
│   │   │   ├── course/            # Course-related components
│   │   │   └── layout/            # Layout components
│   │   ├── context/               # React Context providers
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── pages/                 # Page components
│   │   ├── routes/                # Routing configuration
│   │   ├── styles/                # Global styles
│   │   └── utils/                 # Utility functions
│   ├── package.json
│   └── vite.config.js
├── Server/                         # Backend Node.js application
│   ├── config/                    # Configuration files
│   ├── controllers/               # Route controllers
│   ├── middleware/                # Custom middleware
│   ├── models/                    # Database models
│   ├── routes/                    # API routes
│   ├── utils/                     # Utility functions
│   ├── database/                  # Database configuration
│   ├── package.json
│   └── server.js                  # Main server file
├── README.md                      # This file
└── .gitignore
```

## 🔧 Installation & Setup

### Backend Setup

1. **Navigate to Server directory**

    ```bash
    cd Server
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Environment Variables**
   Create a `.env` file with the following variables:

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/course-selling
    JWT_SECRET=your_super_secret_jwt_key
    NODE_ENV=development
    ```

4. **Database Setup**

    - Install MongoDB locally or use MongoDB Atlas
    - The application will automatically connect to the database on startup

5. **Start the server**
    ```bash
    npm start
    ```

### Frontend Setup

1. **Navigate to Client directory**

    ```bash
    cd Client
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Environment Variables**
   Create a `.env` file with:

    ```env
    VITE_API_BASE_URL=http://localhost:3000/api
    ```

4. **Start the development server**
    ```bash
    npm run dev
    ```

## 🌐 API Documentation

### Base URL

**Production:**

```
https://course-selling-server-36u8.onrender.com/api
```

**Local Development:**

```
http://localhost:3000/api
```

### Authentication

The API uses JWT-based authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

### Core Endpoints

#### 👤 User Management

| Method | Endpoint         | Description                | Auth Required |
| ------ | ---------------- | -------------------------- | ------------- |
| POST   | `/user/register` | Register a new user        | No            |
| POST   | `/user/login`    | Login user                 | No            |
| GET    | `/user/profile`  | Get user profile           | Yes           |
| PUT    | `/user/profile`  | Update user profile        | Yes           |
| GET    | `/user/all`      | Get all users (Admin only) | Yes (Admin)   |
| DELETE | `/user/:id`      | Delete user (Admin only)   | Yes (Admin)   |

#### 👨‍💼 Admin Management

| Method | Endpoint          | Description          | Auth Required     |
| ------ | ----------------- | -------------------- | ----------------- |
| POST   | `/admin/register` | Register a new admin | No                |
| POST   | `/admin/login`    | Login admin          | No                |
| GET    | `/admin/profile`  | Get admin profile    | Yes (Admin)       |
| PUT    | `/admin/profile`  | Update admin profile | Yes (Admin)       |
| GET    | `/admin/all`      | Get all admins       | Yes (Super Admin) |
| POST   | `/admin/create`   | Create new admin     | Yes (Super Admin) |
| DELETE | `/admin/:id`      | Delete admin         | Yes (Super Admin) |

#### 📚 Course Management

| Method | Endpoint                      | Description                    | Auth Required |
| ------ | ----------------------------- | ------------------------------ | ------------- |
| GET    | `/courses`                    | Get all courses (with filters) | No            |
| GET    | `/courses/:id`                | Get course by ID               | No            |
| GET    | `/courses/featured`           | Get featured courses           | No            |
| GET    | `/courses/categories`         | Get all course categories      | No            |
| GET    | `/courses/search`             | Search courses                 | No            |
| GET    | `/courses/category/:category` | Get courses by category        | No            |
| POST   | `/courses/admin`              | Create course (Admin only)     | Yes (Admin)   |
| PUT    | `/courses/admin/:id`          | Update course (Admin only)     | Yes (Admin)   |
| DELETE | `/courses/admin/:id`          | Delete course (Admin only)     | Yes (Admin)   |
| GET    | `/courses/admin/my-courses`   | Get admin's courses            | Yes (Admin)   |

#### 📝 Enrollment Management

| Method | Endpoint                  | Description                 | Auth Required |
| ------ | ------------------------- | --------------------------- | ------------- |
| POST   | `/enrollments`            | Enroll in a course          | Yes           |
| GET    | `/enrollments/my-courses` | Get user's enrolled courses | Yes           |

#### 📞 Contact

| Method | Endpoint   | Description         | Auth Required |
| ------ | ---------- | ------------------- | ------------- |
| POST   | `/contact` | Submit contact form | No            |

### Example API Requests

#### Register a User

```bash
# Production
curl -X POST https://course-selling-server-36u8.onrender.com/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phoneNumber": "1234567890",
    "interests": ["Web Development", "Machine Learning"]
  }'
```

#### Create a Course (Admin)

```bash
# Production
curl -X POST https://course-selling-server-36u8.onrender.com/api/courses/admin \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Advanced React Development",
    "description": "Deep dive into React concepts",
    "price": 49.99,
    "instructor": "John Smith",
    "duration": 15,
    "level": "intermediate",
    "category": "Web Development",
    "thumbnail": "https://example.com/thumbnail.jpg",
    "topics": ["React Hooks", "Context API", "Redux"]
  }'
```

"duration": 15,
"level": "intermediate",
"category": "Web Development",
"thumbnail": "https://example.com/thumbnail.jpg",
"topics": ["React Hooks", "Context API", "Redux"]
}

````

### Error Handling

The API uses standard HTTP status codes and returns errors in the following format:

```json
{
    "success": false,
    "error": {
        "message": "Error description",
        "stack": "Stack trace (development only)"
    }
}
````

Validation errors return:

```json
{
    "errors": [
        {
            "type": "field",
            "msg": "Validation error message",
            "path": "fieldName",
            "location": "body"
        }
    ]
}
```

## 🎨 Frontend Documentation

### Component Architecture

The frontend follows a component-based architecture with the following key patterns:

#### 🎯 Context Providers

-   **AuthContext** - Manages user authentication state
-   **CourseContext** - Manages course data and operations
-   **ToastContext** - Manages notification messages

#### 🔒 Route Protection

-   **ProtectedRoute** - Protects routes that require authentication
-   **AdminRoute** - Protects admin-only routes

#### 🎨 UI Components

-   **Animations** - Custom animation components for enhanced UX
-   **Common** - Reusable UI components (Button, Input, Loader, etc.)
-   **Layout** - Header, Footer, and navigation components

### Key Features

#### 🚀 State Management

```javascript
// Using Context API for global state
const { user, login, logout, isAuthenticated } = useAuth();
const { courses, fetchCourses, createCourse } = useCourses();
```

#### 🎯 API Integration

```javascript
// Axios interceptors for automatic token handling
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
```

#### 🎨 Responsive Design

-   Mobile-first approach with Tailwind CSS
-   Responsive breakpoints for all screen sizes
-   Touch-friendly interfaces for mobile devices

### Page Structure

#### 🏠 Public Pages

-   **Home** - Landing page with featured courses
-   **Courses** - Course listing with filters and search
-   **Course Detail** - Individual course information
-   **About** - About the platform
-   **Contact** - Contact form

#### 🔐 Protected Pages

-   **Dashboard** - User dashboard with enrolled courses
-   **Profile** - User profile management
-   **Admin Dashboard** - Admin panel with analytics
-   **Course Management** - Admin course CRUD operations

### Styling Guide

#### 🎨 Design System

-   **Colors** - Custom color palette with CSS variables
-   **Typography** - Responsive typography with Tailwind classes
-   **Spacing** - Consistent spacing using Tailwind utilities
-   **Components** - Reusable styled components

#### 🎯 Best Practices

-   Component composition over inheritance
-   Custom hooks for business logic
-   Proper error boundaries
-   Loading states for better UX

## 🔐 Authentication & Authorization

### JWT Authentication Flow

1. **User Registration/Login**

    - User provides credentials
    - Server validates and returns JWT token
    - Token stored in localStorage

2. **Protected Route Access**

    - Token sent with each request
    - Server validates token
    - User gains access to protected resources

3. **Role-Based Access Control**
    - Users: Can browse courses, enroll, manage profile
    - Admins: Can create/manage courses, view users
    - Super Admins: Can manage other admins

### Security Features

-   **Password Hashing** - bcrypt with salt rounds
-   **JWT Expiration** - 7-day token expiration
-   **Input Validation** - Server-side validation using express-validator
-   **CORS Protection** - Configured for secure cross-origin requests
-   **Rate Limiting** - Protection against brute force attacks
-   **Security Headers** - Helmet.js for security headers

## 📱 Screenshots

### 🏠 Homepage

-   Modern hero section with featured courses
-   Course categories and search functionality
-   Responsive design for all devices

### 📚 Course Listing

-   Advanced filtering and search
-   Course cards with detailed information
-   Pagination for large course catalogs

### 👤 User Dashboard

-   Personal course enrollment history
-   Profile management interface
-   Progress tracking (future feature)

### 👨‍💼 Admin Dashboard

-   Course management interface
-   User analytics and statistics
-   Admin profile management

## 🚀 Deployment

### Backend Deployment

1. **Environment Variables**

    ```env
    NODE_ENV=production
    PORT=3000
    MONGO_URI=mongodb://your-production-db
    JWT_SECRET=your-production-secret
    ```

2. **Build Commands**
    ```bash
    npm install --production
    npm start
    ```

### Frontend Deployment

1. **Build for Production**

    ```bash
    npm run build
    ```

2. **Environment Variables**
    ```env
    VITE_API_BASE_URL=https://your-backend-url/api
    ```

### Recommended Platforms

-   **Backend**: Heroku, Railway, DigitalOcean
-   **Frontend**: Vercel, Netlify, GitHub Pages
-   **Database**: MongoDB Atlas, AWS DocumentDB

## 🤝 Contributing

We welcome contributions to the Course Selling Platform! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

-   Follow ESLint configuration
-   Use meaningful commit messages
-   Add comments for complex logic
-   Write tests for new features

### Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Add screenshots for UI changes
4. Request review from maintainers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

-   **React Team** - For the amazing React.js library
-   **MongoDB** - For the flexible NoSQL database
-   **Tailwind CSS** - For the utility-first CSS framework
-   **Express.js** - For the minimal web framework
-   **All Contributors** - For their valuable contributions

## 📞 Contact

For questions or support, please contact:

-   **Email**: support@courseplatform.com
-   **GitHub**: [Your GitHub Profile](https://github.com/yourusername)
-   **Issues**: [GitHub Issues](https://github.com/yourusername/course-selling-platform/issues)

---

Made with ❤️ by [Your Name](https://github.com/yourusername)

## 📊 Project Status

-   ✅ **Backend API** - Complete with full CRUD operations
-   ✅ **Frontend UI** - Modern responsive design
-   ✅ **Authentication** - JWT-based auth system
-   ✅ **Admin Panel** - Full admin functionality
-   ✅ **Course Management** - Complete course CRUD
-   ✅ **User Management** - User profiles and enrollment
-   🔄 **Payment Integration** - Coming soon
-   🔄 **Email Notifications** - Coming soon
-   🔄 **Progress Tracking** - Coming soon

### Recent Updates (July 2025)

-   Enhanced admin dashboard with analytics
-   Improved course filtering and search
-   Added featured courses endpoint
-   Enhanced security with rate limiting
-   Improved error handling and validation
-   Updated documentation with latest features

---

**Happy Learning! 🎓**
