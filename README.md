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
        "password": "password123"
    }
    ```
-   **Success Response**: `201 Created`
    ```json
    {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
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
        "isAdmin": false,
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
    ```
-   **Error Response**: `401 Unauthorized` if no token provided

### Course Management

#### Get All Courses

-   **URL**: `/courses`
-   **Method**: `GET`
-   **Auth Required**: No
-   **Success Response**: `200 OK`
    ```json
    [
        {
            "_id": "course_id",
            "title": "JavaScript Basics",
            "description": "Learn JavaScript fundamentals",
            "price": 29.99,
            "instructor": "Jane Smith",
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        }
        // More courses...
    ]
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
        "instructor": "John Smith"
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
        "price": 39.99
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
        "createdAt": "timestamp",
        "updatedAt": "updated_timestamp"
    }
    ```
-   **Error Response**: `404 Not Found` if course doesn't exist

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
-   **Error Response**: `404 Not Found` if course doesn't exist

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
-   **Error Response**: `400 Bad Request` if already enrolled
    ```json
    {
        "message": "Already enrolled in this course"
    }
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

The API uses the following HTTP status codes:

-   `200 OK`: Request successful
-   `201 Created`: Resource successfully created
-   `400 Bad Request`: Invalid request data
-   `401 Unauthorized`: Authentication failed or token missing
-   `403 Forbidden`: Permission denied (e.g., non-admin trying to access admin routes)
-   `404 Not Found`: Resource not found
-   `500 Internal Server Error`: Server-side error

## Data Models

### User Model

```javascript
{
  name: String,         // Required
  email: String,        // Required, unique
  password: String,     // Required, min length: 6 (stored as bcrypt hash)
  isAdmin: Boolean,     // Default: false
  createdAt: Date,      // Automatically added
  updatedAt: Date       // Automatically added
}
```

### Course Model

```javascript
{
  title: String,        // Required
  description: String,
  price: Number,
  instructor: String,
  createdAt: Date,      // Automatically added
  updatedAt: Date       // Automatically added
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
    ```

3. Start the development server:
    ```bash
    npm start
    ```

## Testing

You can test all API endpoints using Postman or any other API testing tool by importing the provided Postman collection (if available).

## Additional Notes for Frontend Developers

1. **Authentication Flow**:

    - Store the JWT token in localStorage or sessionStorage after login/register
    - Include the token in the Authorization header for all protected requests
    - Implement a mechanism to handle token expiration

2. **Course Listing and Details**:

    - Use the `/courses` endpoint to populate the course listing page
    - Use the `/courses/:id` endpoint for the course detail page

3. **User Dashboard**:

    - After login, use the token to fetch user profile data
    - For enrolled courses, implement logic to show only courses the user is enrolled in

4. **Admin Features**:
    - Check the `isAdmin` property in the user object to show/hide admin features
    - Use admin endpoints for course management (add/edit/delete)
