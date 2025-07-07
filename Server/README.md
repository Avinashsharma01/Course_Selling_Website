# Course Selling Website - Backend API Documentation

## Overview

This document provides comprehensive documentation for the backend API of the Course Selling Website. It details all available endpoints, request/response formats, authentication mechanisms, and data models that frontend developers need to integrate with the backend.

## Base URL

```
http://localhost:3000/api
```

## Authentication

### JWT-Based Authentication

The API uses JSON Web Tokens (JWT) for authentication. For protected routes, include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

-   Tokens are issued upon successful login or registration
-   Tokens expire after 7 days
-   Unauthorized requests will receive a 401 status code

## API Endpoints

### User Management

#### Register User

-   **URL**: `/user/register`
-   **Method**: `POST`
-   **Auth Required**: No
-   **Request Body**:
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123",
        "phoneNumber": "1234567890",
        "interests": ["Web Development", "Machine Learning"]
    }
    ```
-   **Success Response**: `201 Created`
    ```json
    {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "profilePicture": "https://via.placeholder.com/150",
        "token": "jwt_token"
    }
    ```
-   **Error Response**: `400 Bad Request` if user already exists
    ```json
    {
        "message": "User already exists"
    }
    ```

#### Login User

-   **URL**: `/user/login`
-   **Method**: `POST`
-   **Auth Required**: No
-   **Request Body**:
    ```json
    {
        "email": "john@example.com",
        "password": "password123"
    }
    ```
-   **Success Response**: `200 OK`
    ```json
    {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "token": "jwt_token"
    }
    ```
-   **Error Response**: `400 Bad Request` for invalid credentials
    ```json
    {
        "message": "Invalid credentials"
    }
    ```

#### Get User Profile

-   **URL**: `/user/profile`
-   **Method**: `GET`
-   **Auth Required**: Yes
-   **Success Response**: `200 OK`
    ```json
    {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "profilePicture": "https://via.placeholder.com/150",
        "phoneNumber": "1234567890",
        "interests": ["Web Development", "Machine Learning"],
        "enrolledCourseCount": 3,
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
    ```
-   **Error Response**: `401 Unauthorized` if no token provided

#### Update User Profile

-   **URL**: `/user/profile`
-   **Method**: `PUT`
-   **Auth Required**: Yes
-   **Request Body**:
    ```json
    {
        "name": "Updated Name",
        "email": "updated@example.com",
        "profilePicture": "https://example.com/new-pic.jpg",
        "phoneNumber": "9876543210",
        "interests": ["Data Science", "Mobile Development"],
        "password": "new_password123"
    }
    ```
-   **Success Response**: `200 OK`
    ```json
    {
        "_id": "user_id",
        "name": "Updated Name",
        "email": "updated@example.com",
        "profilePicture": "https://example.com/new-pic.jpg",
        "phoneNumber": "9876543210",
        "interests": ["Data Science", "Mobile Development"]
    }
    ```

### Admin Management

#### Register Admin

-   **URL**: `/admin/register`
-   **Method**: `POST`
-   **Auth Required**: No
-   **Request Body**:
    ```json
    {
        "name": "Admin User",
        "email": "admin@example.com",
        "password": "admin123",
        "position": "Senior Instructor",
        "contactNumber": "1234567890"
    }
    ```
-   **Success Response**: `201 Created`
    ```json
    {
        "_id": "admin_id",
        "name": "Admin User",
        "email": "admin@example.com",
        "position": "Senior Instructor",
        "token": "jwt_token"
    }
    ```
-   **Error Response**: `400 Bad Request` if admin already exists
    ```json
    {
        "message": "Admin with this email already exists"
    }
    ```

#### Login Admin

-   **URL**: `/admin/login`
-   **Method**: `POST`
-   **Auth Required**: No
-   **Request Body**:
    ```json
    {
        "email": "admin@example.com",
        "password": "admin123"
    }
    ```
-   **Success Response**: `200 OK`
    ```json
    {
        "_id": "admin_id",
        "name": "Admin User",
        "email": "admin@example.com",
        "position": "Senior Instructor",
        "isSuperAdmin": false,
        "token": "jwt_token"
    }
    ```
-   **Error Response**: `400 Bad Request` for invalid credentials
    ```json
    {
        "message": "Invalid credentials"
    }
    ```

#### Get Admin Profile

-   **URL**: `/admin/profile`
-   **Method**: `GET`
-   **Auth Required**: Yes (Admin only)
-   **Success Response**: `200 OK`
    ```json
    {
        "_id": "admin_id",
        "name": "Admin User",
        "email": "admin@example.com",
        "bio": "Experienced instructor with 10 years of teaching",
        "profileImage": "https://example.com/admin-pic.jpg",
        "contactNumber": "1234567890",
        "position": "Senior Instructor",
        "isSuperAdmin": false,
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
    ```
-   **Error Response**: `401 Unauthorized` if no token provided or `403 Forbidden` if not an admin

#### Update Admin Profile

-   **URL**: `/admin/profile`
-   **Method**: `PUT`
-   **Auth Required**: Yes (Admin only)
-   **Request Body**:
    ```json
    {
        "name": "Updated Admin",
        "email": "updated-admin@example.com",
        "bio": "New bio information",
        "profileImage": "https://example.com/updated-pic.jpg",
        "contactNumber": "9876543210",
        "position": "Lead Instructor",
        "password": "new_admin_password123"
    }
    ```
-   **Success Response**: `200 OK`
    ```json
    {
        "_id": "admin_id",
        "name": "Updated Admin",
        "email": "updated-admin@example.com",
        "bio": "New bio information",
        "profileImage": "https://example.com/updated-pic.jpg",
        "contactNumber": "9876543210",
        "position": "Lead Instructor",
        "isSuperAdmin": false
    }
    ```

#### Get All Admins (Super Admin Only)

-   **URL**: `/admin/all`
-   **Method**: `GET`
-   **Auth Required**: Yes (Super Admin only)
-   **Success Response**: `200 OK`
    ```json
    [
        {
            "_id": "admin_id_1",
            "name": "Admin User 1",
            "email": "admin1@example.com",
            "position": "Instructor",
            "isSuperAdmin": false,
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        },
        {
            "_id": "admin_id_2",
            "name": "Admin User 2",
            "email": "admin2@example.com",
            "position": "Content Manager",
            "isSuperAdmin": false,
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        }
    ]
    ```
-   **Error Response**: `403 Forbidden` if not a super admin
    ```json
    {
        "message": "Access denied. Super admin only."
    }
    ```

#### Create New Admin (Super Admin Only)

-   **URL**: `/admin/create`
-   **Method**: `POST`
-   **Auth Required**: Yes (Super Admin only)
-   **Request Body**:
    ```json
    {
        "name": "New Admin",
        "email": "newadmin@example.com",
        "password": "admin123",
        "position": "Junior Instructor",
        "isSuperAdmin": false
    }
    ```
-   **Success Response**: `201 Created`
    ```json
    {
        "_id": "new_admin_id",
        "name": "New Admin",
        "email": "newadmin@example.com",
        "position": "Junior Instructor",
        "isSuperAdmin": false
    }
    ```
-   **Error Response**:
    -   `400 Bad Request` if admin already exists
    -   `403 Forbidden` if not a super admin

#### Delete Admin (Super Admin Only)

-   **URL**: `/admin/:id`
-   **Method**: `DELETE`
-   **Auth Required**: Yes (Super Admin only)
-   **URL Parameters**: `id=[admin_id]`
-   **Success Response**: `200 OK`
    ```json
    {
        "message": "Admin deleted successfully"
    }
    ```
-   **Error Response**:
    -   `404 Not Found` if admin doesn't exist
    -   `403 Forbidden` if not a super admin or attempting to delete another super admin
    ```json
    {
        "message": "Cannot delete another super admin"
    }
    ```

### Course Management

#### Get All Courses

-   **URL**: `/courses`
-   **Method**: `GET`
-   **Auth Required**: No
-   **Query Parameters**:
    -   `page` (optional): Page number for pagination (default: 1)
    -   `limit` (optional): Number of results per page (default: 10)
    -   `sortBy` (optional): Field to sort by (default: 'createdAt')
    -   `order` (optional): Sort order ('asc' or 'desc', default: 'desc')
    -   `minPrice` (optional): Minimum price filter
    -   `maxPrice` (optional): Maximum price filter
    -   `category` (optional): Filter by course category
    -   `level` (optional): Filter by difficulty level ('beginner', 'intermediate', 'advanced')
    -   `search` (optional): Text search in title, description and category
    -   `createdBy` (optional): Filter by creator's ID
-   **Success Response**: `200 OK`
    ```json
    {
        "courses": [
            {
                "_id": "course_id",
                "title": "JavaScript Basics",
                "description": "Learn JavaScript fundamentals",
                "price": 29.99,
                "instructor": "Jane Smith",
                "duration": 10,
                "level": "beginner",
                "category": "Web Development",
                "thumbnail": "https://example.com/thumbnail.jpg",
                "topics": ["Variables", "Functions", "Objects"],
                "rating": 4.5,
                "enrollmentCount": 120,
                "createdBy": {
                    "_id": "admin_id",
                    "name": "Admin User",
                    "email": "admin@example.com"
                },
                "createdAt": "timestamp",
                "updatedAt": "timestamp"
            }
            // More courses...
        ],
        "totalPages": 5,
        "currentPage": 1,
        "totalCourses": 42
    }
    ```

#### Get Course by ID

-   **URL**: `/courses/:id`
-   **Method**: `GET`
-   **Auth Required**: No
-   **URL Parameters**: `id=[course_id]`
-   **Success Response**: `200 OK`
    ```json
    {
        "_id": "course_id",
        "title": "JavaScript Basics",
        "description": "Learn JavaScript fundamentals",
        "price": 29.99,
        "instructor": "Jane Smith",
        "duration": 10,
        "level": "beginner",
        "category": "Web Development",
        "thumbnail": "https://example.com/thumbnail.jpg",
        "topics": ["Variables", "Functions", "Objects"],
        "rating": 4.5,
        "enrollmentCount": 120,
        "createdBy": {
            "_id": "admin_id",
            "name": "Admin User",
            "email": "admin@example.com"
        },
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
    ```
-   **Error Response**: `404 Not Found` if course doesn't exist
    ```json
    {
        "message": "Course not found"
    }
    ```

#### Search Courses

-   **URL**: `/courses/search`
-   **Method**: `GET`
-   **Auth Required**: No
-   **Query Parameters**:
    -   `query` (required): Search term to look for in course titles, descriptions, and categories
-   **Success Response**: `200 OK`
    ```json
    [
        {
            "_id": "course_id",
            "title": "JavaScript Basics",
            "description": "Learn JavaScript fundamentals",
            "price": 29.99,
            "instructor": "Jane Smith"
            // ...other course fields
        }
        // More matching courses...
    ]
    ```
-   **Error Response**: `400 Bad Request` if no query parameter provided
    ```json
    {
        "message": "Search query is required"
    }
    ```

#### Get Courses by Category

-   **URL**: `/courses/category/:category`
-   **Method**: `GET`
-   **Auth Required**: No
-   **URL Parameters**: `category=[category_name]`
-   **Success Response**: `200 OK`
    ```json
    [
        {
            "_id": "course_id",
            "title": "JavaScript Basics",
            "category": "Web Development"
            // ...other course fields
        }
        // More courses in this category...
    ]
    ```

#### Get Admin Courses

-   **URL**: `/courses/admin/my-courses`
-   **Method**: `GET`
-   **Auth Required**: Yes (Admin)
-   **Query Parameters**:
    -   `page` (optional): Page number for pagination (default: 1)
    -   `limit` (optional): Number of results per page (default: 10)
    -   `sortBy` (optional): Field to sort by (default: 'createdAt')
    -   `order` (optional): Sort order ('asc' or 'desc', default: 'desc')
-   **Success Response**: `200 OK`
    ```json
    {
        "courses": [
            {
                "_id": "course_id",
                "title": "Advanced React"
                // ...other course fields
            }
        ],
        "totalPages": 2,
        "currentPage": 1,
        "totalCourses": 15,
        "stats": {
            "totalEnrollments": 350,
            "averageEnrollmentsPerCourse": 23.33
        }
    }
    ```
-   **Error Response**: `403 Forbidden` for non-admin users

#### Add Course (Admin Only)

-   **URL**: `/courses/admin`
-   **Method**: `POST`
-   **Auth Required**: Yes (Admin)
-   **Request Body**:
    ```json
    {
        "title": "Advanced React",
        "description": "Deep dive into React concepts",
        "price": 49.99,
        "instructor": "John Smith",
        "duration": 15,
        "level": "intermediate",
        "category": "Web Development",
        "thumbnail": "https://example.com/thumbnail.jpg",
        "topics": ["React Hooks", "Context API", "Redux"]
    }
    ```
-   **Success Response**: `201 Created`
    ```json
    {
        "_id": "new_course_id",
        "title": "Advanced React",
        "description": "Deep dive into React concepts",
        "price": 49.99,
        "instructor": "John Smith",
        "duration": 15,
        "level": "intermediate",
        "category": "Web Development",
        "thumbnail": "https://example.com/thumbnail.jpg",
        "topics": ["React Hooks", "Context API", "Redux"],
        "rating": 0,
        "enrollmentCount": 0,
        "createdBy": "admin_user_id",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
    ```
-   **Error Response**: `403 Forbidden` for non-admin users

#### Update Course (Admin Only)

-   **URL**: `/courses/admin/:id`
-   **Method**: `PUT`
-   **Auth Required**: Yes (Admin)
-   **URL Parameters**: `id=[course_id]`
-   **Request Body**:
    ```json
    {
        "title": "Updated Course Title",
        "price": 39.99,
        "level": "advanced",
        "topics": ["Updated Topic 1", "Updated Topic 2"]
    }
    ```
-   **Success Response**: `200 OK`
    ```json
    {
        "_id": "course_id",
        "title": "Updated Course Title",
        "description": "Original description",
        "price": 39.99,
        "instructor": "Original instructor",
        "level": "advanced",
        "topics": ["Updated Topic 1", "Updated Topic 2"],
        // ...other unchanged fields
        "createdAt": "timestamp",
        "updatedAt": "updated_timestamp"
    }
    ```
-   **Error Response**:
    -   `404 Not Found` if course doesn't exist
    -   `403 Forbidden` if the admin is not the creator of the course
    ```json
    {
        "message": "Access denied. You can only update courses you created."
    }
    ```

#### Delete Course (Admin Only)

-   **URL**: `/courses/admin/:id`
-   **Method**: `DELETE`
-   **Auth Required**: Yes (Admin)
-   **URL Parameters**: `id=[course_id]`
-   **Success Response**: `200 OK`
    ```json
    {
        "message": "Course deleted successfully"
    }
    ```
-   **Error Response**:
    -   `404 Not Found` if course doesn't exist
    -   `403 Forbidden` if the admin is not the creator of the course
    ```json
    {
        "message": "Access denied. You can only delete courses you created."
    }
    ```

### Course Enrollment

#### Enroll in Course

-   **URL**: `/enrollments`
-   **Method**: `POST`
-   **Auth Required**: Yes
-   **Request Body**:
    ```json
    {
        "courseId": "course_id"
    }
    ```
-   **Success Response**: `201 Created`
    ```json
    {
        "message": "Enrolled successfully",
        "enrollment": {
            "_id": "enrollment_id",
            "userId": "user_id",
            "courseId": "course_id",
            "enrolledAt": "timestamp"
        }
    }
    ```
-   **Error Response**:
    -   `400 Bad Request` if already enrolled
    ```json
    {
        "message": "Already enrolled in this course"
    }
    ```
    -   `404 Not Found` if course doesn't exist
    ```json
    {
        "message": "Course not found"
    }
    ```

#### Get User's Enrolled Courses

-   **URL**: `/enrollments/my-courses`
-   **Method**: `GET`
-   **Auth Required**: Yes
-   **Success Response**: `200 OK`
    ```json
    [
        {
            "_id": "enrollment_id",
            "enrolledAt": "timestamp",
            "course": {
                "_id": "course_id",
                "title": "JavaScript Basics",
                "description": "Learn JavaScript fundamentals",
                "price": 29.99,
                "instructor": "Jane Smith"
                // ... other course fields
            }
        }
        // More enrolled courses...
    ]
    ```

### Contact Form

#### Submit Contact Form

-   **URL**: `/contact`
-   **Method**: `POST`
-   **Auth Required**: No
-   **Request Body**:
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "message": "I have a question about your courses."
    }
    ```
-   **Success Response**: `200 OK`
    ```json
    {
        "message": "Message sent"
    }
    ```

## Error Handling

The API implements a centralized error handling system that provides consistent error responses across all endpoints. The API uses the following HTTP status codes:

-   `200 OK`: Request successful
-   `201 Created`: Resource successfully created
-   `400 Bad Request`: Invalid request data or validation error
-   `401 Unauthorized`: Authentication failed, token missing or expired
-   `403 Forbidden`: Permission denied (e.g., non-admin trying to access admin routes)
-   `404 Not Found`: Resource not found
-   `429 Too Many Requests`: Rate limit exceeded
-   `500 Internal Server Error`: Server-side error

Standard error response format:

```json
{
    "success": false,
    "error": {
        "message": "Detailed error message",
        "stack": "Stack trace (only in development mode)"
    }
}
```

Special handling is implemented for:

-   Mongoose validation errors
-   Duplicate key errors
-   Cast errors (invalid MongoDB ObjectIds)
-   JWT authentication errors
-   Rate limiting

## Data Models

### User Model

```javascript
{
  name: String,                 // Required, trimmed
  email: String,                // Required, unique, lowercase, trimmed
  password: String,             // Required, min length: 6 (stored as bcrypt hash)
  profilePicture: String,       // URL to profile picture
  phoneNumber: String,          // User's contact number
  interests: [String],          // Array of interests/categories
  enrolledCourseCount: Number,  // Number of courses enrolled
  createdAt: Date,              // Automatically added
  updatedAt: Date               // Automatically added
}
```

### Admin Model

```javascript
{
  name: String,                 // Required, trimmed
  email: String,                // Required, unique, lowercase, trimmed
  password: String,             // Required, min length: 6 (stored as bcrypt hash)
  isSuperAdmin: Boolean,        // Default: false (can manage all courses and admins)
  bio: String,                  // Admin/instructor bio
  profileImage: String,         // URL to profile image
  contactNumber: String,        // Admin's contact number
  position: String,             // e.g., "Instructor", "Content Manager"
  createdAt: Date,              // Automatically added
  updatedAt: Date               // Automatically added
}
```

### Course Model

```javascript
{
  title: String,          // Required, trimmed
  description: String,    // Required
  price: Number,          // Required, default: 0
  instructor: String,     // Required
  duration: Number,       // In hours, default: 0
  level: String,          // Enum: 'beginner', 'intermediate', 'advanced', default: 'beginner'
  category: String,       // Required
  thumbnail: String,      // Default placeholder image
  topics: [String],       // Array of strings
  rating: Number,         // Min: 0, Max: 5, default: 0
  enrollmentCount: Number, // Default: 0
  createdBy: ObjectId,    // Reference to User model (admin who created the course)
  createdAt: Date,        // Automatically added
  updatedAt: Date         // Automatically added
}
```

### Enrollment Model

```javascript
{
  userId: ObjectId,     // Reference to User model
  courseId: ObjectId,   // Reference to Course model
  enrolledAt: Date      // Default: current date
}
```

### Contact Model

```javascript
{
  name: String,
  email: String,
  message: String,
  createdAt: Date,      // Automatically added
  updatedAt: Date       // Automatically added
}
```

## Development Setup

1. Install dependencies:

    ```bash
    cd Server
    npm install
    ```

2. Create a `.env` file in the `Server` directory with the following variables:

    ```
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    ```

3. Start the development server:

    ```bash
    npm start
    ```

4. Optional: Install additional packages for security and validation:
    ```bash
    npm install express-validator express-rate-limit helmet morgan
    ```

## Testing

You can test all API endpoints using Postman or any other API testing tool by importing the provided Postman collection (if available).

## Additional Notes for Frontend Developers

1. **Authentication Flow**:

    - Store the JWT token in localStorage or sessionStorage after login/register
    - Include the token in the Authorization header for all protected requests
    - Implement a mechanism to handle token expiration and error responses
    - Be aware of rate limiting on authentication endpoints
    - Note the separation between user and admin authentication systems
    - Direct users to `/user/login` and administrators to `/admin/login`

2. **Course Listing and Features**:

    - Use the `/courses` endpoint with query parameters for filtering, sorting and pagination
    - Implement search functionality using the `/courses/search` endpoint
    - Display category-specific courses using the `/courses/category/:category` endpoint
    - Utilize the enhanced course model fields (thumbnail, level, duration, etc.) for richer UI

3. **User Dashboard**:

    - After login, use the token to fetch user profile data
    - Use the `/enrollments/my-courses` endpoint to display enrolled courses
    - Show enrollment dates and course details on the user dashboard

4. **Admin Features**:

    - Use the separate admin login system (`/admin/login`) for admin access
    - Use `/courses/admin/my-courses` to display courses created by the admin
    - Present admin statistics (total enrollments, average enrollments per course)
    - Implement course creation form with all available fields
    - Show clear feedback when admin tries to edit/delete courses they don't own
    - Super admins (with `isSuperAdmin: true`) can manage all courses and other admins
    - Use the admin-specific endpoints for admin management

5. **Error Handling**:
    - Implement proper error handling using the standardized API error responses
    - Show validation errors from the backend to the user
    - Handle rate limiting with appropriate UI feedback

## Security Features

-   Password hashing (bcrypt)
-   JWT authentication with proper error handling
-   Separate authentication systems for users and administrators
-   Helmet for security headers
-   CORS configuration
-   Comprehensive input validation using express-validator
-   Rate limiting to prevent brute-force attacks
-   Centralized error handling
-   Role-based access control (user, admin, super admin)
-   Course ownership verification
-   Middleware separation for admin and super-admin permissions
