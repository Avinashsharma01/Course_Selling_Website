/**
 * Centralized error handling middleware
 */
const errorHandler = (err, req, res, next) => {
    // Default error status and message
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        statusCode = 400;
        const errors = Object.values(err.errors).map(error => error.message);
        message = errors.join(', ');
    }

    // Handle Mongoose duplicate key errors
    if (err.code === 11000) {
        statusCode = 400;
        message = `Duplicate value entered for ${Object.keys(err.keyValue)} field`;
    }

    // Handle Mongoose CastError (invalid ObjectId)
    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token. Please log in again.';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Your token has expired. Please log in again.';
    }

    // Standardized error response format
    res.status(statusCode).json({
        success: false,
        error: {
            message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }
    });
};

export default errorHandler;
