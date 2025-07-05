# Course Selling Website

## Contact Form & Database Integration

### Overview

This documentation details the implementation of the contact form functionality and its MongoDB database integration. This feature allows users to submit contact inquiries which are stored in a MongoDB database.

### Files Structure

-   `controllers/contact.controller.js` - Handles contact form submission logic
-   `models/contant.model.js` - Defines the schema for contact data
-   `routes/contact.route.js` - Defines API endpoints for contact functionality
-   `database/db.js` - Manages MongoDB connection
-   `middleware/validateInput.js` - (Future implementation) Will validate form inputs

### MongoDB Database Connection

The database connection is configured in `database/db.js`:

```javascript
// Database connection using Mongoose
import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error(error);
    }
};

export default connectToDb;
```

Key features:

-   Uses environment variables for secure storage of connection strings
-   Implements try-catch for error handling
-   Connection status logging for debugging

### Contact Form Model

The contact data structure is defined in `models/contant.model.js`:

```javascript
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        message: String,
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
```

The schema includes:

-   User's name
-   Email address
-   Message content
-   Automatic timestamps (createdAt, updatedAt)

### Contact Form Controller

The business logic for handling contact submissions is in `controllers/contact.controller.js`:

```javascript
import Contact from "../models/contant.model.js";

const handleContact = async (req, res) => {
    const { name, email, message } = req.body;
    try {
        await Contact.create({ name, email, message });
        res.json({ message: "Message sent" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default handleContact;
```

This controller:

-   Extracts form data from request body
-   Creates a new document in the Contact collection
-   Returns a success message or error response

### API Routes

The API endpoint is defined in `routes/contact.route.js`:

```javascript
import express from "express";
import handleContact from "../controllers/contact.controller.js";
const router = express.Router();

router.post("/contact", handleContact);

export default router;
```

Available endpoints:

-   `POST /api/contact` - Accepts and processes contact form submissions

### Integration with Server

The contact routes are integrated in `server.js`:

```javascript
// Routes
app.use("/api", contactRoute);
```

The server:

-   Mounts contact routes under the `/api` prefix
-   Sets up necessary middleware (CORS, JSON parsing)
-   Initializes database connection on startup

### Testing the API

To test the contact form API using Postman:

1. Send a POST request to `http://localhost:3000/api/contact`
2. Set the Content-Type header to `application/json`
3. Include a request body in JSON format:
    ```json
    {
        "name": "Test User",
        "email": "user@example.com",
        "message": "Hello, this is a test message."
    }
    ```
4. Expected successful response:
    ```json
    {
        "message": "Message sent"
    }
    ```

### Future Enhancements

-   Implement input validation using `middleware/validateInput.js`
-   Add email notification functionality
-   Create admin dashboard for viewing contact submissions
-   Implement rate limiting to prevent form spam
