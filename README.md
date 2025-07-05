✅ Functionality Covered
View all available courses

View course details by ID

Add, Update, Delete courses (Admin only)

Enroll in a course (Authenticated users only)

📂 Files You Worked On

models/course.model.js	Defines course schema/model
controllers/course.controller.js	Handles course logic (get/add/update/delete)
routes/course.route.js	Course-related routes for users & admins
models/enrollment.model.js	Defines enrollment schema
controllers/enrollment.controller.js	Handles user enrollment logic
routes/enrollment.route.js	Route for enrolling in a course

🔗 API Endpoints

GET	/api/courses	Public	View all published courses
GET	/api/courses/:id	Public	View specific course by ID
POST	/api/courses/admin	Admin Only	Add a new course
PUT	/api/courses/admin/:id	Admin Only	Update a course
DELETE	/api/courses/admin/:id	Admin Only	Delete a course

🎓 Enrollment

POST	/api/enrollments	User Only	Enroll in a course (JWT required)

🛡 Requires Bearer Token in Authorization Header after login

✅ Tested With Postman
All endpoints verified with MongoDB Atlas

Secure access tested using JWT-based auth
