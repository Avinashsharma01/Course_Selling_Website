import { check, validationResult } from 'express-validator';

// Middleware to validate the input and return errors if any
export const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// User registration validation rules
export const registerValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    validateInput
];

// User login validation rules
export const loginValidation = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    validateInput
];

// Course validation rules
export const courseValidation = [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price must be a number').isNumeric(),
    check('instructor', 'Instructor name is required').not().isEmpty(),
    check('duration', 'Duration must be a number').optional().isNumeric(),
    check('level', 'Level must be beginner, intermediate, or advanced').optional().isIn(['beginner', 'intermediate', 'advanced']),
    check('category', 'Category is required').not().isEmpty(),
    validateInput
];

// Contact form validation rules
export const contactValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('message', 'Message is required').not().isEmpty(),
    validateInput
];

// Enrollment validation rules
export const enrollmentValidation = [
    check('courseId', 'Course ID is required').isMongoId(),
    validateInput
];