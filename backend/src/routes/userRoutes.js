const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// POST /user/register
router.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            const error = new Error('Email and password are required');
            error.statusCode = 400;
            throw error;
        }

        // Validate email format
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            const error = new Error('Please provide a valid email address');
            error.statusCode = 400;
            throw error;
        }

        // Validate password length
        if (password.length < 6) {
            const error = new Error('Password must be at least 6 characters');
            error.statusCode = 400;
            throw error;
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            where: { email: email.toLowerCase().trim() }
        });

        if (existingUser) {
            const error = new Error('Email already registered');
            error.statusCode = 409;
            throw error;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            email: email.toLowerCase().trim(),
            password: hashedPassword
        });

        // Return success response (without password)
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        // Handle Sequelize validation errors
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            error.message = messages.join(', ');
            error.statusCode = 400;
        }

        // Handle unique constraint errors
        if (error.name === 'SequelizeUniqueConstraintError') {
            error.message = 'Email already registered';
            error.statusCode = 409;
        }

        // Pass error to error handler middleware
        next(error);
    }
});

module.exports = router;