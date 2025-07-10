# Course Selling Platform - Frontend Documentation

## 🎓 Overview

A modern, responsive React-based frontend for the Course Selling platform that provides an intuitive user experience for both students and administrators. Built with cutting-edge technologies including React 18, Vite, Tailwind CSS, and React Router.

## 📋 Table of Contents

-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Project Structure](#project-structure)
-   [Installation & Setup](#installation--setup)
-   [Environment Variables](#environment-variables)
-   [Components Architecture](#components-architecture)
-   [Pages & Routes](#pages--routes)
-   [State Management](#state-management)
-   [API Integration](#api-integration)
-   [Styling & UI](#styling--ui)
-   [Authentication](#authentication)
-   [Admin Features](#admin-features)
-   [Development Guidelines](#development-guidelines)
-   [Build & Deployment](#build--deployment)
-   [Performance Optimization](#performance-optimization)
-   [Troubleshooting](#troubleshooting)

## ✨ Features

### 🎯 Core Features

-   **Responsive Design**: Mobile-first approach with seamless experience across all devices
-   **Modern UI/UX**: Clean, intuitive interface with smooth animations and transitions
-   **Authentication System**: Secure login/register with JWT tokens
-   **Course Management**: Browse, search, filter, and enroll in courses
-   **Admin Dashboard**: Comprehensive admin panel for course and user management
-   **Profile Management**: User profiles with avatar upload and password change
-   **Contact System**: Integrated contact form with auto-filled user details
-   **Dark Mode Ready**: Prepared for dark theme implementation

### 🚀 Advanced Features

-   **Real-time Updates**: Live course enrollment counts and notifications
-   **Search & Filter**: Advanced course filtering by category, price, and instructor
-   **Pagination**: Efficient data loading with pagination controls
-   **Error Handling**: Comprehensive error boundaries and user-friendly error messages
-   **Loading States**: Smooth loading indicators throughout the application
-   **Toast Notifications**: Real-time feedback for user actions
-   **Protected Routes**: Role-based access control for admin and user areas

## 🛠 Tech Stack

### Core Technologies

-   **React 18.2.0**: Modern React with hooks and concurrent features
-   **Vite**: Lightning-fast build tool and development server
-   **React Router DOM**: Client-side routing with v6 features
-   **Tailwind CSS**: Utility-first CSS framework for rapid styling
-   **Axios**: HTTP client for API requests with interceptors

### UI Libraries & Icons

-   **React Icons**: Comprehensive icon library (Font Awesome, Lucide, etc.)
-   **Lucide React**: Beautiful, customizable SVG icons
-   **Framer Motion**: Animation library for smooth interactions

### Development Tools

-   **ESLint**: Code linting with React-specific rules
-   **PostCSS**: CSS processing with Tailwind CSS
-   **Autoprefixer**: Automatic CSS vendor prefixing

## 📁 Project Structure

```
Client/
├── public/
│   ├── vite.svg                 # Vite logo
│   └── index.html               # HTML template
├── src/
│   ├── api/                     # API configuration and services
│   │   ├── axios.js             # Axios configuration with interceptors
│   │   ├── dummyCategories.js   # Mock category data
│   │   ├── dummyCourses.js      # Mock course data
│   │   ├── dummyUser.js         # Mock user data
│   │   ├── dummyUsers.js        # Mock users data
│   │   └── services/            # API service modules
│   │       ├── authService.js   # Authentication API calls
│   │       ├── contactService.js # Contact form API calls
│   │       ├── courseService.js # Course management API calls
│   │       └── enrollmentService.js # Enrollment API calls
│   ├── assets/                  # Static assets
│   │   ├── react.svg           # React logo
│   │   └── images/             # Course and feature images
│   ├── components/             # Reusable UI components
│   │   ├── animations/         # Animation components
│   │   │   ├── BlurText.jsx    # Text blur animation
│   │   │   ├── CardStack.jsx   # Stacked card animation
│   │   │   ├── CardSwap.jsx    # Card swap animation
│   │   │   ├── GradientText.jsx # Gradient text effects
│   │   │   ├── ProfileCard.jsx # Animated profile cards
│   │   │   ├── RotatingText.jsx # Rotating text animation
│   │   │   ├── SpotlightCard.jsx # Spotlight hover effect
│   │   │   ├── Stack.jsx       # Stack animation
│   │   │   └── TrueFocus.jsx   # Focus animation
│   │   ├── auth/               # Authentication components
│   │   │   ├── AdminRoute.jsx  # Admin-only route protection
│   │   │   └── ProtectedRoute.jsx # User route protection
│   │   ├── common/             # Common UI components
│   │   │   ├── Button.jsx      # Reusable button component
│   │   │   ├── Categories.jsx  # Category display component
│   │   │   ├── FeaturedCourses.jsx # Featured courses section
│   │   │   ├── HeroCarousel.jsx # Hero section carousel
│   │   │   ├── Input.jsx       # Form input component
│   │   │   ├── Loader.jsx      # Loading spinner
│   │   │   ├── Toast.jsx       # Notification toasts
│   │   │   └── WhyChooseUs.jsx # Features section
│   │   ├── course/             # Course-specific components
│   │   │   ├── CategoryFilter.jsx # Course category filter
│   │   │   ├── CourseCard.jsx  # Individual course card
│   │   │   ├── CourseInfoBox.jsx # Course information display
│   │   │   └── EnrollButton.jsx # Course enrollment button
│   │   ├── effects/            # Special effects
│   │   │   └── TrueFocus.jsx   # Focus effects
│   │   └── layout/             # Layout components
│   │       ├── Footer.jsx      # Site footer with animations
│   │       ├── Header.jsx      # Site header
│   │       └── Navbar.jsx      # Navigation bar
│   ├── context/                # React Context providers
│   │   ├── AuthContext.jsx     # Authentication context
│   │   ├── AuthContextCreator.jsx # Auth context creator
│   │   ├── CourseContext.jsx   # Course data context
│   │   ├── CourseContextCreator.jsx # Course context creator
│   │   └── ToastContext.jsx    # Toast notification context
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.js          # Authentication hook
│   │   ├── useCourses.js       # Course data hook
│   │   └── useToast.js         # Toast notification hook
│   ├── layouts/                # Page layouts
│   │   └── MainLayout.jsx      # Main application layout
│   ├── pages/                  # Application pages
│   │   ├── about/              # About page
│   │   ├── auth/               # Authentication pages
│   │   ├── contact/            # Contact page
│   │   ├── courses/            # Course-related pages
│   │   ├── dashboard/          # Admin and user dashboards
│   │   ├── home/               # Home page
│   │   ├── notfound/           # 404 error page
│   │   ├── privacyPolicy/      # Privacy policy page
│   │   └── profile/            # User profile pages
│   ├── routes/                 # Routing configuration
│   │   └── AppRoutes.jsx       # Main routing component
│   ├── styles/                 # Global styles
│   │   └── globals.css         # Global CSS with Tailwind
│   ├── App.jsx                 # Main App component
│   └── main.jsx                # Application entry point
├── .eslintrc.cjs               # ESLint configuration
├── index.html                  # HTML template
├── package.json                # Project dependencies
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.js              # Vite configuration
└── README.md                   # This documentation
```

## 🚀 Installation & Setup

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn package manager
-   Git for version control

### Step-by-Step Setup

1. **Clone the Repository**

```bash
git clone <repository-url>
cd Course-Selling/Client
```

2. **Install Dependencies**

```bash
npm install
# or
yarn install
```

3. **Environment Configuration**
   Create a `.env` file in the Client directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Learnify
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

4. **Start Development Server**

```bash
npm run dev
# or
yarn dev
```

5. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

## 🔧 Environment Variables

### Required Variables

-   `VITE_API_BASE_URL`: Backend API base URL
-   `VITE_APP_NAME`: Application name for branding
-   `VITE_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name for image uploads
-   `VITE_CLOUDINARY_UPLOAD_PRESET`: Cloudinary upload preset

### Optional Variables

-   `VITE_DEBUG`: Enable debug mode
-   `VITE_ANALYTICS_ID`: Google Analytics tracking ID
-   `VITE_ENVIRONMENT`: Environment (development/staging/production)

## 🏗 Components Architecture

### Component Categories

#### 1. **Layout Components**

-   **Navbar**: Responsive navigation with user authentication state
-   **Footer**: Modern footer with hover effects and social links
-   **MainLayout**: Wrapper layout for consistent page structure

#### 2. **Authentication Components**

-   **ProtectedRoute**: Guards routes requiring authentication
-   **AdminRoute**: Guards admin-only routes
-   **AuthContext**: Manages authentication state globally

#### 3. **Common Components**

-   **Button**: Reusable button with multiple variants
-   **Input**: Form input component with validation
-   **Loader**: Loading spinner with customizable sizes
-   **Toast**: Notification system with different types

#### 4. **Course Components**

-   **CourseCard**: Individual course display card
-   **CategoryFilter**: Course filtering by category
-   **EnrollButton**: Course enrollment with state management
-   **CourseInfoBox**: Detailed course information display

#### 5. **Animation Components**

-   **BlurText**: Animated text with blur effects
-   **CardStack**: Stacked card animations
-   **SpotlightCard**: Hover spotlight effects
-   **ProfileCard**: Animated profile cards

### Component Design Principles

1. **Reusability**: Components are designed to be reused across the application
2. **Prop Validation**: All components use proper prop types
3. **Accessibility**: ARIA labels and keyboard navigation support
4. **Responsive Design**: Mobile-first approach with breakpoint considerations
5. **Performance**: Memoization and lazy loading where appropriate

## 🗺 Pages & Routes

### Route Structure

```jsx
/                           # Home page
/about                      # About us page
/contact                    # Contact page
/courses                    # Course listing page
/courses/:id                # Individual course page
/auth/login                 # Login page
/auth/register              # Registration page
/profile                    # User profile (protected)
/dashboard                  # User dashboard (protected)
/dashboard/admin            # Admin dashboard (admin only)
/dashboard/admin/courses    # Admin course management
/dashboard/admin/users      # Admin user management
/privacy-policy             # Privacy policy page
/404                        # Not found page
```

### Page Components

#### 1. **Home Page**

-   Hero section with carousel
-   Featured courses
-   Categories overview
-   Why choose us section
-   Call-to-action sections

#### 2. **Course Pages**

-   Course listing with search and filters
-   Individual course detail pages
-   Enrollment functionality
-   Course reviews and ratings

#### 3. **Authentication Pages**

-   Login with form validation
-   Registration with terms acceptance
-   Password reset functionality

#### 4. **Profile Pages**

-   User profile editing
-   Password change
-   Avatar upload
-   Course history

#### 5. **Admin Pages**

-   Admin dashboard with statistics
-   Course management (CRUD operations)
-   User management
-   Analytics and reporting

## 🎛 State Management

### Context API Structure

The application uses React Context API for global state management:

#### 1. **AuthContext**

```javascript
const AuthContext = {
    user: null, // Current user object
    isAuthenticated: false, // Authentication status
    isLoading: false, // Loading state
    login: (credentials) => {}, // Login function
    logout: () => {}, // Logout function
    register: (userData) => {}, // Register function
    updateProfile: (data) => {}, // Update profile function
};
```

#### 2. **CourseContext**

```javascript
const CourseContext = {
    courses: [], // All courses
    categories: [], // Course categories
    featuredCourses: [], // Featured courses
    adminCourses: [], // Admin's courses
    loading: false, // Loading state
    error: null, // Error state
    fetchCourses: () => {}, // Fetch courses function
    createCourse: (data) => {}, // Create course function
    updateCourse: (id, data) => {}, // Update course function
    deleteCourse: (id) => {}, // Delete course function
};
```

#### 3. **ToastContext**

```javascript
const ToastContext = {
    showToast: (message, type) => {}, // Show toast notification
    hideToast: () => {}, // Hide toast notification
};
```

### Custom Hooks

#### 1. **useAuth Hook**

```javascript
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
```

#### 2. **useCourses Hook**

```javascript
const useCourses = () => {
    const context = useContext(CourseContext);
    if (!context) {
        throw new Error("useCourses must be used within CourseProvider");
    }
    return context;
};
```

#### 3. **useToast Hook**

```javascript
const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within ToastProvider");
    }
    return context;
};
```

## 🌐 API Integration

### Axios Configuration

```javascript
// api/axios.js
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
);

export default api;
```

### API Services

#### 1. **Authentication Service**

```javascript
// api/services/authService.js
import api from "../axios";

export const authService = {
    login: (credentials) => api.post("/auth/login", credentials),
    register: (userData) => api.post("/auth/register", userData),
    logout: () => api.post("/auth/logout"),
    refreshToken: () => api.post("/auth/refresh"),
    getProfile: () => api.get("/auth/profile"),
    updateProfile: (data) => api.put("/auth/profile", data),
    changePassword: (data) => api.put("/auth/change-password", data),
};
```

#### 2. **Course Service**

```javascript
// api/services/courseService.js
import api from "../axios";

export const courseService = {
    getAllCourses: () => api.get("/courses"),
    getCourseById: (id) => api.get(`/courses/${id}`),
    createCourse: (data) => api.post("/courses", data),
    updateCourse: (id, data) => api.put(`/courses/${id}`, data),
    deleteCourse: (id) => api.delete(`/courses/${id}`),
    enrollInCourse: (courseId) => api.post(`/courses/${courseId}/enroll`),
    getEnrolledCourses: () => api.get("/courses/enrolled"),
};
```

## 🎨 Styling & UI

### Tailwind CSS Setup

The application uses Tailwind CSS for styling with a custom configuration:

```javascript
// tailwind.config.js
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#eff6ff",
                    500: "#3b82f6",
                    600: "#2563eb",
                    700: "#1d4ed8",
                    800: "#1e40af",
                    900: "#1e3a8a",
                },
                secondary: {
                    50: "#f0fdf4",
                    500: "#22c55e",
                    600: "#16a34a",
                    700: "#15803d",
                    800: "#166534",
                    900: "#14532d",
                },
            },
            fontFamily: {
                sans: ["Inter", "ui-sans-serif", "system-ui"],
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-in-out",
                "slide-up": "slideUp 0.3s ease-out",
                pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
        },
    },
    plugins: [],
};
```

### Design System

#### 1. **Color Palette**

-   **Primary**: Blue shades for main actions and links
-   **Secondary**: Green shades for success states and highlights
-   **Neutral**: Gray shades for text and backgrounds
-   **Semantic**: Red for errors, yellow for warnings, green for success

#### 2. **Typography**

-   **Font Family**: Inter for clean, modern text
-   **Font Sizes**: Responsive scale from text-xs to text-6xl
-   **Font Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

#### 3. **Spacing**

-   **Consistent Scale**: 4px base unit (1, 2, 4, 6, 8, 12, 16, 24, 32...)
-   **Responsive Spacing**: Different spacing for different breakpoints
-   **Component Spacing**: Consistent internal and external spacing

#### 4. **Components**

-   **Buttons**: Multiple variants (primary, secondary, outline, ghost)
-   **Cards**: Elevated cards with hover effects
-   **Forms**: Consistent form styling with validation states
-   **Navigation**: Responsive navigation with mobile menu

## 🔐 Authentication

### Authentication Flow

1. **User Registration**

    - Form validation
    - Email verification
    - Account creation
    - Auto-login after registration

2. **User Login**

    - Credential validation
    - JWT token generation
    - Local storage management
    - Redirect to dashboard

3. **Protected Routes**
    - Token verification
    - Role-based access control
    - Automatic logout on token expiry
    - Redirect to login page

### JWT Token Management

```javascript
// Token storage and retrieval
const tokenManager = {
    setToken: (token) => {
        localStorage.setItem("token", token);
    },

    getToken: () => {
        return localStorage.getItem("token");
    },

    removeToken: () => {
        localStorage.removeItem("token");
    },

    isTokenValid: () => {
        const token = tokenManager.getToken();
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.exp > Date.now() / 1000;
        } catch {
            return false;
        }
    },
};
```

### Route Protection

```javascript
// components/auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <Loader />;
    }

    return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
```

## 🛠 Admin Features

### Admin Dashboard

The admin dashboard provides comprehensive management capabilities:

#### 1. **Course Management**

-   Create new courses with rich content
-   Edit existing courses
-   Delete courses with confirmation
-   View course statistics and enrollment data
-   Bulk operations on courses

#### 2. **User Management**

-   View all registered users
-   Search and filter users
-   User role management
-   User statistics and analytics

#### 3. **Analytics Dashboard**

-   Course performance metrics
-   User engagement statistics
-   Revenue tracking
-   Popular course analysis

#### 4. **Content Management**

-   Category management
-   Course content upload
-   Image and video management
-   SEO optimization tools

### Admin Components

#### 1. **AdminDashboard.jsx**

```javascript
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("courses");
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({});

    // Dashboard logic

    return (
        <div className="admin-dashboard">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <MainContent
                activeTab={activeTab}
                courses={courses}
                users={users}
                stats={stats}
            />
        </div>
    );
};
```

#### 2. **Course Management**

-   **AdminCreateCourse.jsx**: Course creation form
-   **AdminEditCourse.jsx**: Course editing interface
-   **AdminCourseList.jsx**: Course listing with actions
-   **CourseStats.jsx**: Course analytics and statistics

## 📖 Development Guidelines

### Code Standards

#### 1. **File Naming**

-   Components: PascalCase (e.g., `UserProfile.jsx`)
-   Hooks: camelCase with 'use' prefix (e.g., `useAuth.js`)
-   Utilities: camelCase (e.g., `apiHelpers.js`)
-   Constants: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.js`)

#### 2. **Component Structure**

```javascript
// Standard component structure
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ComponentName = ({ prop1, prop2 }) => {
    // State declarations
    const [state, setState] = useState(initialValue);

    // Effect hooks
    useEffect(() => {
        // Effect logic
    }, [dependencies]);

    // Event handlers
    const handleEvent = () => {
        // Handler logic
    };

    // Render
    return <div className="component-wrapper">{/* Component JSX */}</div>;
};

// PropTypes
ComponentName.propTypes = {
    prop1: PropTypes.string.isRequired,
    prop2: PropTypes.number,
};

// Default props
ComponentName.defaultProps = {
    prop2: 0,
};

export default ComponentName;
```

#### 3. **State Management Guidelines**

-   Use Context API for global state
-   Keep component state local when possible
-   Use useReducer for complex state logic
-   Implement proper error boundaries

#### 4. **API Integration Best Practices**

-   Use try-catch blocks for error handling
-   Implement loading states
-   Show user-friendly error messages
-   Handle network failures gracefully

### Performance Optimization

#### 1. **Code Splitting**

```javascript
// Lazy loading components
const LazyComponent = React.lazy(() => import("./LazyComponent"));

// Usage with Suspense
<Suspense fallback={<Loader />}>
    <LazyComponent />
</Suspense>;
```

#### 2. **Memoization**

```javascript
// Memoizing expensive calculations
const ExpensiveComponent = React.memo(({ data }) => {
    const expensiveValue = useMemo(() => {
        return expensiveCalculation(data);
    }, [data]);

    return <div>{expensiveValue}</div>;
});
```

#### 3. **Image Optimization**

-   Use appropriate image formats (WebP, AVIF)
-   Implement lazy loading for images
-   Use responsive images with srcSet
-   Optimize image sizes for different devices

## 🚀 Build & Deployment

### Build Process

#### 1. **Development Build**

```bash
npm run dev
# Starts development server with hot reloading
```

#### 2. **Production Build**

```bash
npm run build
# Creates optimized production build in dist/
```

#### 3. **Preview Build**

```bash
npm run preview
# Previews production build locally
```

### Deployment Options

#### 1. **Vercel Deployment**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### 2. **Netlify Deployment**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### 3. **Manual Deployment**

```bash
# Build the project
npm run build

# Upload dist/ folder to your hosting provider
```

### Environment-Specific Builds

#### 1. **Development**

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ENVIRONMENT=development
VITE_DEBUG=true
```

#### 2. **Staging**

```env
VITE_API_BASE_URL=https://staging-api.yourdomain.com/api
VITE_ENVIRONMENT=staging
VITE_DEBUG=false
```

#### 3. **Production**

```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_ENVIRONMENT=production
VITE_DEBUG=false
```

## ⚡ Performance Optimization

### Optimization Techniques

#### 1. **Bundle Optimization**

-   Code splitting with dynamic imports
-   Tree shaking for unused code removal
-   Bundle analysis with rollup-plugin-analyzer
-   Compression with gzip/brotli

#### 2. **Runtime Optimization**

-   Component memoization with React.memo
-   Callback memoization with useCallback
-   Value memoization with useMemo
-   Virtual scrolling for large lists

#### 3. **Asset Optimization**

-   Image compression and lazy loading
-   Font optimization and preloading
-   Critical CSS extraction
-   Resource hints (preload, prefetch)

### Performance Monitoring

#### 1. **Core Web Vitals**

-   Largest Contentful Paint (LCP)
-   First Input Delay (FID)
-   Cumulative Layout Shift (CLS)

#### 2. **Monitoring Tools**

-   React DevTools Profiler
-   Chrome DevTools Performance
-   Lighthouse audits
-   Web Vitals extension

## 🐛 Troubleshooting

### Common Issues

#### 1. **Build Errors**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npm run dev -- --force
```

#### 2. **Environment Variables Not Working**

-   Ensure variables start with `VITE_`
-   Restart development server after changes
-   Check .env file is in correct location

#### 3. **API Connection Issues**

-   Verify API base URL in environment variables
-   Check CORS settings on backend
-   Ensure proper authentication headers

#### 4. **Routing Issues**

-   Check React Router configuration
-   Verify route paths and components
-   Ensure proper route protection

### Debug Tools

#### 1. **React DevTools**

-   Component tree inspection
-   Props and state debugging
-   Performance profiling

#### 2. **Redux DevTools** (if using Redux)

-   Action monitoring
-   State time travel
-   Performance tracking

#### 3. **Network Debugging**

-   Browser DevTools Network tab
-   API request/response inspection
-   Error logging and monitoring

## 📞 Support & Contributing

### Getting Help

-   **Documentation**: Check this README for detailed information
-   **Issues**: Report bugs and feature requests via GitHub Issues
-   **Discussions**: Join community discussions for help and ideas

### Contributing Guidelines

1. Fork the repository
2. Create a feature branch
3. Follow coding standards
4. Write tests for new features
5. Submit a pull request

### Code Review Process

-   All code changes require peer review
-   Automated tests must pass
-   Code must follow style guidelines
-   Documentation must be updated

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

-   React team for the amazing framework
-   Vite team for the fast build tool
-   Tailwind CSS team for the utility-first CSS framework
-   All contributors and community members

---

_Last updated: July 2025_

_For the most current information, please refer to the project repository._
