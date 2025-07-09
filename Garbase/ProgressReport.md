# Course Selling Platform

A full-stack web application for selling and managing online courses. This project is developed by Team A as part of the Ideovent Technology Assignment.

## Team Members

1. Avinash Sharma
2. Sachin Prajapati
3. Ishika Saha
4. Gauri Jakhmola

## Tech Stack

-   **Frontend**: React 19 (Vite), React Router v7, Tailwind CSS
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB
-   **Authentication**: JWT, bcrypt
-   **Other**: Axios, Framer Motion, Swiper

## Project Structure

The project is organized into two main directories:

### Client (Frontend)

```
Client/
├── public/              # Static assets
├── src/
│   ├── api/             # API connection and mock data
│   ├── assets/          # Frontend assets
│   ├── components/
│   │   ├── common/      # Reusable UI components
│   │   ├── course/      # Course-specific components
│   │   └── layout/      # Layout components (navbar, footer)
│   ├── context/         # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Page layout templates
│   ├── pages/           # Page components
│   │   ├── auth/        # Login and registration
│   │   ├── contact/     # Contact page
│   │   ├── courses/     # Course listing and details
│   │   ├── dashboard/   # User dashboard
│   │   ├── home/        # Homepage
│   │   └── notfound/    # 404 page
│   ├── routes/          # Routing configuration
│   └── styles/          # Global styles
```

### Server (Backend)

```
Server/
├── config/              # Configuration files
├── controllers/         # Route controllers
├── database/            # Database connection
├── middleware/          # Express middleware
├── models/              # Mongoose models
├── routes/              # API routes
└── utils/               # Utility functions
```

## Features Implementation Status

| Required Feature         | Status         | Notes                                                     |
| ------------------------ | -------------- | --------------------------------------------------------- |
| View Available Courses   | ✅ Complete    | Implemented in Courses.jsx with FeaturedCourses component |
| See Detailed Course Info | ✅ Complete    | CourseDetail.jsx with dynamic routing                     |
| Register Account         | ⚠️ In Progress | UI complete, needs backend integration                    |
| Login/Logout             | ⚠️ In Progress | UI complete, needs backend integration                    |
| Enroll in Courses        | ⚠️ In Progress | Backend API ready, frontend integration needed            |
| Submit Contact Forms     | ⚠️ In Progress | UI and API ready, needs integration                       |
| Responsive Design        | ✅ Complete    | Using Tailwind CSS                                        |
| Form Validation          | ⚠️ In Progress | Basic structure in place, needs completion                |

## Backend API Endpoints

### User Routes

-   `POST /api/user/register` - Register new user
-   `POST /api/user/login` - User login

### Course Routes

-   `GET /api/courses` - Get all courses
-   `GET /api/courses/:id` - Get course details
-   `POST /api/courses` - Add new course (admin only)
-   `PUT /api/courses/:id` - Update course (admin only)

### Enrollment Routes

-   `POST /api/enrollments` - Enroll in a course
-   `GET /api/enrollments/user` - Get user enrollments

### Contact Routes

-   `POST /api/contact` - Submit contact form

## Security Features

-   Password hashing with bcrypt
-   JWT authentication
-   API rate limiting
-   Input validation
-   CORS configuration

## Current Progress and Next Steps

### Completed

-   Project structure and architecture
-   Backend API development
-   Database models and connections
-   Basic UI components and pages
-   Routing structure
-   Security implementation

### In Progress

-   Connecting frontend with backend APIs
-   Authentication flow integration
-   User enrollment functionality
-   Form validations

### Future Enhancements (Optional Features)

-   Cart system implementation
-   Payment integration (dummy Razorpay/Stripe)
-   Admin panel for course management
-   Course search and filtering

## Getting Started

### Prerequisites

-   Node.js (v16+)
-   MongoDB (local or Atlas connection)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd course-selling
```

2. Install backend dependencies

```bash
cd Server
npm install
```

3. Install frontend dependencies

```bash
cd ../Client
npm install
```

4. Create a .env file in the Server directory with:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

5. Start the backend server

```bash
cd ../Server
npm start
```

6. Start the frontend development server

```bash
cd ../Client
npm run dev
```

## Project Goals and Requirements

-   Build a fully functional course selling website
-   Implement user authentication and authorization
-   Create responsive and user-friendly UI
-   Ensure security best practices
-   Develop clean, maintainable code

## License

This project is part of an educational assignment.
