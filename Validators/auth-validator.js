const { z } = require('zod');

// Regular expression for password validation
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

// Login Schema
const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password should be at least 8 characters long" })
        .max(15, { message: "Password should be at most 15 characters long" })
        .regex(passwordRegex, { message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character" })
});

// Signup Schema
const signupSchema = loginSchema.extend({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name should be at least 3 characters long" })
        .max(255, { message: "Name should be at most 255 characters long" }),
    phone: z
        .string({ required_error: "Phone number is required" })
        .trim()
        .regex(/^\d{10}$/, { message: "Phone number should be exactly 10 digits" })
});

module.exports = { loginSchema, signupSchema };